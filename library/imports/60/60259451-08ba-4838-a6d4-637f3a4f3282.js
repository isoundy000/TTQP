"use strict";
cc._RF.push(module, '60259RRCLpIOKbUY386TzKC', 'HomeSetYaoqingrenIDView');
// Script/HomeScript/HomeSettingView/HomeSetYaoqingrenIDView.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,

        /// ID输入框
        idEditBox: cc.EditBox
    },

    onLoad: function onLoad() {
        onfire.on("HomeInputInviterHandle", this.onInputInviterHandle.bind(this));
    },
    onConfigUI: function onConfigUI() {
        this.idEditBox.string = "";
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow       
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView: function onShowView(isShow, callback) {
        this.callback = callback;
        this.contentView.setScale(0.8, 0.8);
        this.node.active = isShow;

        if (isShow) {
            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.contentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));

            this.onConfigUI();
        } else {
            var scaleAmin = cc.scaleTo(0, 0.8, 0.8);
            this.contentView.runAction(scaleAmin);
        }
    },


    /*********************** 发送接口 ***********************/
    onSetInviterID: function onSetInviterID() {
        var idString = this.idEditBox.string ? this.idEditBox.string : "";
        if (idString.length == 0) {
            console.log("邀请人的游戏账号ID错误");
        } else {
            var params = {
                "inviterRoleId": idString
            };
            cc.scn.socket.send(10906, params);
        }
    },


    /*********************** 接口回调 ***********************/
    onInputInviterHandle: function onInputInviterHandle(data) {
        this.onShowView(false, this.callback);
    },


    /**
     * 功能按钮的点击
     */
    onMenusBtnClick: function onMenusBtnClick(event, customData) {
        var itemIdx = parseInt(customData);
        switch (itemIdx) {
            case 0:
                {
                    // 确定
                    this.onSetInviterID();
                }
                break;
            case 1:
                {
                    // 取消
                    this.onShowView(false, this.callback);
                }
                break;

            default:
                break;
        }
    },


    /**
     * 点击关闭按钮
     */
    onCloseBtnClick: function onCloseBtnClick(event) {
        this.onShowView(false, this.callback);
    }
});

cc._RF.pop();