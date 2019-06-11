(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeEmailShowView/HomeEmailDetailView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ba65cL205FK3JDd+ONbV6OS', 'HomeEmailDetailView', __filename);
// Script/HomeScript/HomeEmailShowView/HomeEmailDetailView.js

'use strict';

// 发接口对象
var socket = require("websocketScript");

cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件的背景View
        contentView: cc.Node,

        nameLabel: cc.Label,
        contentLabel: cc.Label,

        goldBgNode: cc.Node,
        goldLabel: cc.Label,
        getBtn: cc.Node,

        // 领取金币成功后的弹窗提示 Prefab
        showGetViewPrefab: cc.Prefab,

        // 底下按钮的的背景View --------
        // 好友邮件的详情显示的按钮
        friendBtnBg: cc.Node,
        // 系统邮件之添加好友申请  的详情显示的按钮背景View
        addFriendBtnBg: cc.Node,
        // 系统邮件之普通显示  的详情显示的按钮背景View
        normalBtnBg: cc.Node,

        // 删除带有未领取的邮件的弹窗提示
        alertViewPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(function () {
            self.onShowView(false, self.emailData, self.callback);
        });

        // 初始化领取弹窗预制资源
        this.showGetView = cc.instantiate(this.showGetViewPrefab);
        this.showGetView.getComponent('HomeGiftFetchView').onShowView(false, "+0", null);
        this.node.addChild(this.showGetView);

        // 初始化警告框
        var alertViewItem = cc.instantiate(this.alertViewPrefab);
        this.alertView = alertViewItem.getComponent('HomeAlertView');
        this.node.addChild(alertViewItem);
        this.alertView.onShowView(false, false, "", null);

        // 领取附件
        onfire.on("EmailGetGiftHandle", this.emailGetGiftBlock.bind(this));
        onfire.on("EmailDealFriendHandle", this.dealFriendHandle.bind(this));
    },


    /**
     * 配置本类UI
     */
    onConfigUI: function onConfigUI() {

        this.nameLabel.string = this.emailData.nickname;
        this.contentLabel.string = this.emailData.content;

        var gold = this.emailData.gold.toString().length > 0 ? this.emailData.gold.toString() : "";
        this.goldBgNode.active = parseInt(gold) > 0;
        this.goldLabel.string = gold;

        this.getBtn.getComponent('HomeSelectBtn').onStatus(this.emailData.isRec.toString() != "0");

        // 控制回复按钮的显示与否  回复按钮，只是在好友邮件中才能看到
        if (this.isFriend) {
            this.friendBtnBg.active = true;
            this.addFriendBtnBg.active = false;
            this.normalBtnBg.active = false;
        } else {
            this.friendBtnBg.active = false;
            if (this.emailData.friendType.toString() == '1') {
                this.addFriendBtnBg.active = true;
                this.normalBtnBg.active = false;
            } else {
                this.addFriendBtnBg.active = false;
                this.normalBtnBg.active = true;
            }
        }
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow
     * @param {是否是 好友邮件 } isFriend
     * @param {邮件数据} emailData
     * @param {邮件回调} callback
     */
    onShowView: function onShowView(isShow, isFriend, emailData, callback) {
        this.isFriend = isFriend;
        this.emailData = emailData;
        this.callback = callback;

        this.node.active = isShow;
        if (isShow) {
            var moveAction = cc.moveTo(0.2, cc.p(0, 0));
            this.contentView.runAction(moveAction);

            this.onConfigUI();
        } else {
            this.contentView.setPositionY(-1300);
        }
    },

    /********************************  本类发送接口  ********************************/
    onGetEmailGiftRequest: function onGetEmailGiftRequest() {
        var params = {
            "mailId": this.emailData.mailId
        };
        cc.scn.socket.send(10305, params);
    },
    onAddFriendRequest: function onAddFriendRequest(isAgree) {
        // 发送操作好友申请邮件   isAgree：同意   !isAgree：拒绝
        this.isAgree = isAgree;
        var params = {
            "mailId": this.emailData.mailId,
            "handle": isAgree ? 1 : 2
        };
        cc.scn.socket.send(10306, params);
    },


    /********************************  本类发送接口 回调  ********************************/
    emailGetGiftBlock: function emailGetGiftBlock(data) {
        //
        this.emailData.isRec = 1;
        this.onConfigUI();
        this.callback(2, this.emailData);
        this.showGetView.getComponent('HomeGiftFetchView').onShowView(true, '+' + this.emailData.gold.toString(), null);
    },
    dealFriendHandle: function dealFriendHandle(data) {
        // 同意添加好友请求操作
        this.emailData.friendType = this.isAgree ? 3 : 2;
        if (this.callback) {
            this.callback(3, this.emailData);
        }
        this.onConfigUI();
    },


    /********************************  本类事件监听  ********************************/

    /**
     * 回复按钮的点击
     */
    onAnswerBtnClick: function onAnswerBtnClick(event) {
        if (this.callback) {
            this.callback(0, this.emailData);
        }
        this.onShowView(false, this.emailData, this.callback);
    },


    /**
     * 删除按钮的点击
     */
    onDelBtnClick: function onDelBtnClick(event) {
        var self = this;
        if (this.emailData.isRec.toString() == "0" && this.emailData.gold > 0) {

            this.alertView.onShowView(true, false, '邮件中有未领取的' + this.emailData.gold + '金币，删除邮件后金币会一起删除，您确定删除？', function () {
                if (self.callback) {
                    self.callback(1, self.emailData);
                }
                self.onShowView(false, self.emailData, self.callback);
            });
        } else {
            if (this.callback) {
                this.callback(1, this.emailData);
            }
            this.onShowView(false, this.emailData, this.callback);
        }
    },


    /**
     * 领取按钮的点击
     */
    onGetBtnClick: function onGetBtnClick(event) {
        this.onGetEmailGiftRequest();
    },


    /**
     * 好友申请 -> 同意
     */
    onAgreeBtnClick: function onAgreeBtnClick(event) {
        console.log('同意 好友申请');
        this.onAddFriendRequest(true);
    },


    /**
     * 好友申请 -> 拒绝
     */
    onRefusedBtnClick: function onRefusedBtnClick(event) {
        console.log('拒绝 好友申请');
        this.onAddFriendRequest(false);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=HomeEmailDetailView.js.map
        