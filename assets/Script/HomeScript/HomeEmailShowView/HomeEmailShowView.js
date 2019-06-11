// 发接口对象
var socket = require("websocketScript");

cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件的背景View
        contentView: cc.Node,
        // 滑动视图
        scrollView: cc.ScrollView,
        scrollContent: cc.Node,

        // 好友邮件 类型按钮
        friendEmailBtn: cc.Node,
        // 系统邮件 类型按钮
        systemEmailBtn: cc.Node,
        // 系统消息 类型按钮
        systemMsgBtn: cc.Node,

        // 空邮件提示
        emptyBgView: cc.Node,

        // 邮件Item的Prefab
        emailItemPrefab: cc.Prefab,
        // 系统消息Prefab
        systemMsgPrefab: cc.Prefab,

        // 邮件详情弹窗
        emailDetailView: cc.Node,

        // 发送邮件窗口
        emailSendView: cc.Node,
    },

    onLoad() {
        this.itemIdx = -1;

        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(() => {
            self.onShowView(false);
        });

        // 给邮件的滑动视图view 添加上拉加载功能操作
        var scrollViewEventHandler = new cc.Component.EventHandler();
        scrollViewEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        scrollViewEventHandler.component = "HomeEmailShowView";//这个是代码文件名
        scrollViewEventHandler.handler = "onEmailLoadMoreHandle";// 触发上拉加载回调
        var scroll = this.scrollView.getComponent(cc.ScrollView);
        scroll.scrollEvents.push(scrollViewEventHandler);

        // 接收消息列表的接口回调
        onfire.on("EmailDataHandle", this.emailDataBlock.bind(this));
        // 读文件接口回调
        onfire.on("EmailReadHandle", this.emailReadBlock.bind(this));
        // 删除邮件接口回调
        onfire.on("EmailDelHandle", this.emailDelBlock.bind(this));
    },

    /**
     * 创建Item
     */
    onCreateItem() {
        if (!this.emailData) return;

        this.scrollContent.removeAllChildren();

        if (this.emailData.length == 0) {
            this.scrollView.active = false;
            this.emptyBgView.active = true;
        } else {
            this.scrollView.active = true;
            this.emptyBgView.active = false;

            var self = this;
            for (var i = 0; i < this.emailData.length; i++) {
                var item;
                var itemDic = this.emailData[i];
                if (this.itemIdx != 2) {
                    item = cc.instantiate(this.emailItemPrefab);
                    item.getComponent('HomeEmailItem').init(
                        itemDic, i, (itemData, clickIdx) => {
                            self.onClickGoDetailBtnConfig(itemData, clickIdx);
                        });
                } else {
                    item = cc.instantiate(this.systemMsgPrefab);
                    item.getComponent('HomeEmailSystemMsgItem').init(itemDic);
                }
                this.scrollContent.addChild(item);
            }
        }
    },

    // 初始化数据配置数组
    onInitReqParamsConfigs() {
        this.reqParamsConfigs = [
            { "page": 0, list: [] },
            { "page": 0, list: [] },
            { "page": 0, list: [] },
        ];
    },

    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow
     */
    onShowView(isShow, callback) {
        this.callback = callback;

        this.node.active = isShow;
        if (isShow) {
            var moveAction = cc.moveTo(0.2, cc.p(0, 0));
            this.contentView.runAction(moveAction);

            // 获取本类数据
            this.onInitReqParamsConfigs();
            this.onEmailTypeBtnClick(null, (this.itemIdx == -1 ? 0 : this.itemIdx));
        } else {
            this.contentView.setPositionY(-1300);
        }
    },

    /****************************************  本类接口相关  ****************************************/
    // 获取 邮件列表 数据
    onGetEmailData(typeIdx) {
        var idx = 2;
        // 决定邮件类型
        if (typeIdx == 0) idx = 2;
        if (typeIdx == 1) idx = 1;
        if (typeIdx == 2) idx = 0;

        // 页数配置
        var page = this.reqParamsConfigs[typeIdx].page;

        let params = {
            "mailType": idx,
            "page": page
        };
        cc.scn.socket.send(10301, params);
    },
    // 发送 阅读邮件 接口
    onReadEmailRequest(emailID) {
        let params = {
            "mailId": emailID
        };
        cc.scn.socket.send(10303, params);
    },
    // 发送 删除邮件 接口
    onDelEmailRequest(emailID) {
        let params = {
            "mailId": emailID
        };
        cc.scn.socket.send(10304, params);
    },

    /****************************************  本类接口回调相关  ****************************************/
    // 获取服务器返回的 邮件列表 信息
    emailDataBlock(data) {
        if (!data) return;
        this.emailData = this.reqParamsConfigs[this.itemIdx].list.concat(data);
        if (data.length > 0) {
            this.reqParamsConfigs[this.itemIdx].page += 1;
        }
        this.reqParamsConfigs[this.itemIdx].list = this.emailData;

        this.onCreateItem();
    },
    // 阅读邮件接口 回调
    emailReadBlock(data) {
        this.emailData[this.clickIdx].isRead = '1';
        this.reqParamsConfigs[this.itemIdx].list = this.emailData;

        // 重新配置item
        this.onCreateItem();
    },
    // 删除邮件回调
    emailDelBlock(data) {
        this.clickIdx = this.clickIdx >= 0 ? this.clickIdx : 0;
        this.emailData.splice(this.clickIdx, 1);
        this.reqParamsConfigs[this.itemIdx].list = this.emailData;
        this.onCreateItem();
    },


    // 配置邮件类型按钮
    onConfigEmailTypeBtn(isFriend, isSystemEmail, isSystemMsg) {
        this.friendEmailBtn.getComponent('HomeSelectImgTitleBtn').onStatus(isFriend);
        this.systemEmailBtn.getComponent('HomeSelectImgTitleBtn').onStatus(isSystemEmail);
        this.systemMsgBtn.getComponent('HomeSelectImgTitleBtn').onStatus(isSystemMsg);
    },

    /**
     * 处理点击查看邮件详情后的处理
     */
    onClickGoDetailBtnConfig(itemData, clickIdx) {
        this.clickIdx = clickIdx;
        if (itemData.isRead.toString() == '0') {

            if (parseFloat(itemData.gold) > 0 && parseInt(itemData.isRec) == 0) { }
            else {
                // 发送 邮件阅读 接口
                this.onReadEmailRequest(itemData.mailId);
            }
        }

        var self = this;
        // 弹出详情弹窗
        this.emailDetailView.getComponent('HomeEmailDetailView').onShowView(true, this.itemIdx == 0, itemData, (menusIdx, currentItemData) => {
            /** menusIdx：详情里面所有功能的按钮点击
             *  0：回复     1：删除     2：领取     3：是否同意好友请求
             */
            switch (menusIdx) {
                case 0: {
                    self.emailSendView.getComponent('HomeEmailSendView').onShowView(true, currentItemData.fromId.toString());
                }
                    break;
                case 1:
                    self.onDelEmailRequest(currentItemData.mailId);
                    break;
                case 2: {
                    // 发送 邮件阅读 接口
                    self.onReadEmailRequest(itemData.mailId);
                }
                    break;
                case 3: {
                    self.emailData[self.clickIdx] = currentItemData;
                    self.reqParamsConfigs[self.itemIdx].list = self.emailData;
                }
                    break;
            }
        });
    },

    /****************************************  本类事件监听  ****************************************/

    /**
     * 滑动视图 ScrollView 的上拉加载
     */
    onEmailLoadMoreHandle(scrollview, eventType) {
        if (eventType === cc.ScrollView.EventType.BOUNCE_BOTTOM) {
            this.onGetEmailData(this.itemIdx);
        } else if (eventType === cc.ScrollView.EventType.BOUNCE_TOP) {
            console.log("下拉刷新1111111111111·········");
        }
    },

    /**
     * 关闭按钮的点击
     */
    onCloseBtnClick(event) {
        this.onShowView(false);
    },

    onSendBtnClick(event) {
        this.emailSendView.getComponent('HomeEmailSendView').onShowView(true, "");
    },

    /**
     * 邮件类型按钮切换
     * @param {按钮事件} event 
     * @param {属性编辑器中传递过来的数据} customData 
     */
    onEmailTypeBtnClick(event, customData) {
        var typeIdx = parseInt(customData);

        this.itemIdx = typeIdx;

        switch (typeIdx) {
            case 0:
                this.onConfigEmailTypeBtn(true, false, false);
                break;
            case 1:
                this.onConfigEmailTypeBtn(false, true, false);
                break;
            case 2:
                this.onConfigEmailTypeBtn(false, false, true);
                break;

            default:
                break;
        }
        this.onGetEmailData(this.itemIdx);
    }
});
