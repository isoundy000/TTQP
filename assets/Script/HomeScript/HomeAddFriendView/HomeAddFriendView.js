cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件背景View
        contentView: cc.Node,

        // ID输入框
        idEditBox: cc.EditBox,
    },

    onLoad() {
        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(() => {
            self.onShowView(false, self.callback);
        });

        onfire.on("HomeAddFriendHandle",this.onAddFriendHandle.bind(this));
     },

    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow      
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView(isShow, roleId, callback) {
        this.callback = callback;
        this.roleId = roleId;
        this.node.active = isShow;

        var scaleAmin = cc.scaleTo(0.000001, 0.8, 0.8);
        this.contentView.runAction(scaleAmin);
        if (isShow) {
            if (roleId && roleId.length > 0) {
                this.idEditBox.string = this.onBackRoleId(roleId);
            } else {
                this.idEditBox.string = "";
            }
            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.contentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));
        } else {
            var scaleAmin = cc.scaleTo(0, 0.8, 0.8);
            this.contentView.runAction(scaleAmin);
        }
    },

    onBackRoleId(roleId) {
        let roleIdFormatter = roleId;
        let count = 6 - roleId.length;
        for (let i = 0; i < count; i++) {
            roleIdFormatter = "0" + roleIdFormatter;
        }
        return roleIdFormatter;
    },

    /****************************************  本类发送接口相关  ****************************************/
    // 发送添加好友的接口
    onAddFriendRequest() {
        var friendID = this.idEditBox.string ? this.idEditBox.string : "";
        if (friendID.length == 0) {
            console.log("在这里提示，好友ID不能为空");
            return;
        }

        let count = 6 - friendID.length;
        for (let i = 0; i < count; i++) {
            friendID = "0" + friendID;
        }
        var params = {
            "friendId": friendID
        };
        cc.scn.socket.send(10701, params);
    },
    /****************************************  本类接口响应回调  ****************************************/
    // 好友列表接口回调
    onAddFriendHandle(data) {
        this.onShowView(false, this.callback);
    },

    /****************************************  本类事件监听  ****************************************/
    /**
     * 点击发送邀请按钮
     */
    onMenusBtnClick(event) {
        // 正在发送添加好友的请求
        console.log('正在发送添加好友的请求');
        this.onAddFriendRequest();
    },
    /**
     * 关闭按钮
     */
    onCloseBtnClick(event) {
        this.onShowView(false, this.callback);
    },

});
