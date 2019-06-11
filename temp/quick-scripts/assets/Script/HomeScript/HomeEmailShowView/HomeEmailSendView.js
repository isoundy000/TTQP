(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeEmailShowView/HomeEmailSendView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fda32TPWbBHsaAIq21rNNuO', 'HomeEmailSendView', __filename);
// Script/HomeScript/HomeEmailShowView/HomeEmailSendView.js

'use strict';

var socket = require("websocketScript");

cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件的背景View
        contentView: cc.Node,
        nameEditBox: cc.EditBox,
        contentEditBox: cc.EditBox,
        goldEditBox: cc.EditBox,

        typeIdx: 0,
        typeNode: cc.Node,
        typeAlertBgView: cc.Node,
        typeSpFrames: [cc.SpriteFrame],

        alertViewPrefab: cc.Prefab,
        // 带有金币邮件的发送确认窗口
        alertUserViewPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(function () {
            self.onShowView(false);
        });

        // 创建 带有金币邮件的发送确认窗口
        this.alertUserView = cc.instantiate(this.alertUserViewPrefab);
        this.node.addChild(this.alertUserView);
        this.alertUserView.getComponent('HomeAlertUserView').node.active = false;

        // 创建警告框
        var alertViewItem = cc.instantiate(this.alertViewPrefab);
        this.alertView = alertViewItem.getComponent('HomeAlertView');
        this.node.addChild(alertViewItem);
        this.alertView.onShowView(false, false, "", null);

        // 获取接收用户信息接口
        onfire.on("EmailUserDataHandle", this.onGetUserData.bind(this));
        // 定义发送邮件回调函数
        onfire.on("EmailSendHandle", this.sendEmailBlock.bind(this));
    },
    onConfigUI: function onConfigUI(roleId) {
        this.nameEditBox.string = "";
        if (roleId.length > 0) {
            // 格式化收件人ID
            var fromID = roleId.toString();
            var count = 6 - fromID.length;
            for (var i = 0; i < count; i++) {
                fromID = "0" + fromID;
            }
            this.nameEditBox.string = fromID;
        }

        this.contentEditBox.string = "";
        this.goldEditBox.string = "";
        this.typeIdx = 0;
        this.typeAlertBgView.active = false;
        this.typeNode.getComponent(cc.Sprite).spriteFrame = this.typeSpFrames[this.typeIdx];
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow
     */
    onShowView: function onShowView(isShow, roleId, callback) {
        this.roleId = roleId ? roleId.toString() : "";
        this.callback = callback;

        this.node.active = isShow;
        if (isShow) {
            var moveAction = cc.moveTo(0.2, cc.p(0, 0));
            this.contentView.runAction(moveAction);

            this.onConfigUI(roleId);
        } else {
            this.contentView.setPositionY(-1300);
        }
    },


    /****************************************  本类接口回调相关  ****************************************/
    // 发送邮件，因为写这里，不是写在邮件的js中，是因为外边也有直接发邮件的操作，比如点击好友后发邮件
    onSendEmailRequest: function onSendEmailRequest(params) {
        cc.scn.socket.send(10302, params);
    },


    /*********************** 本类接口回调相关  **********************/
    // 发送邮件接口回调函数
    sendEmailBlock: function sendEmailBlock(data) {
        console.log("邮件发送成功！" + data);
    },
    onGetUserData: function onGetUserData(data) {
        var _this = this;

        if (!data || data.length == 0) {
            console.log("用户不存在");
            return;
        }
        console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[data == " + JSON.stringify(data));

        if (this.paramsData) {
            var gold = this.goldEditBox.string;
            var typeName = this.typeIdx == 0 ? "万" : "亿";
            data.id = this.paramsData.toRoleId;
            data.gold = gold + typeName;
            var self = this;
            this.alertUserView.getComponent('HomeAlertUserView').onShowView(true, data, function () {
                self.onSendEmailRequest(self.paramsData);
                self.onShowView(false, _this.roleId, _this.callback);
            });
        }
    },


    /****************************************  本类事件监听  ****************************************/
    /**
     * 弹出 亿、万 类型按钮
     */
    onShowTypeBgBtnClick: function onShowTypeBgBtnClick(event) {
        this.typeAlertBgView.active = !this.typeAlertBgView.active;
    },

    /**
     * 类型按钮的点击
     */
    onTypeBtnClick: function onTypeBtnClick(event, customData) {
        this.typeIdx = parseInt(customData);
        this.typeNode.getComponent(cc.Sprite).spriteFrame = this.typeSpFrames[this.typeIdx];
        this.typeAlertBgView.active = false;
    },


    /** 
     * 发送按钮
     */
    onSendBtnClick: function onSendBtnClick(event) {
        var name = this.nameEditBox.string ? this.nameEditBox.string : "";
        var content = this.contentEditBox.string ? this.contentEditBox.string : "";
        var gold = this.goldEditBox.string ? this.goldEditBox.string : "";

        var self = this;
        if (name.length == 0) {
            this.alertView.onShowView(true, false, '请输入收件人的ID或昵称', null);
        } else if (content.length == 0) {
            this.alertView.onShowView(true, false, '请输入发送内容', null);
        } else {
            if (gold.length > 0 && parseFloat(gold) > 0) {
                if (this.typeIdx == 0) {
                    if (parseFloat(gold) < 100) {
                        this.alertView.onShowView(true, false, '一次最少100万才能发送', null);
                    } else if (parseFloat(gold) > 10000000) {
                        this.alertView.onShowView(true, false, '一次最多发送100亿', null);
                    } else {
                        this.paramsData = {
                            "gold": parseInt(parseFloat(gold) * 10000),
                            "toRoleId": name,
                            "content": content,
                            "ID": ttqp_global.currentUserInfo.roleId.toString()
                            // 带有金币的时候，需要获取用户信息
                        };cc.scn.socket.send(10307, { "roleId": parseInt(name) });
                    }
                } else {
                    if (parseFloat(gold) < 0.0001) {
                        this.alertView.onShowView(true, false, '一次最少100万才能发送', null);
                    } else if (parseFloat(gold) > 100) {
                        this.alertView.onShowView(true, false, '一次最多发送100亿', null);
                    } else {

                        this.paramsData = {
                            "gold": parseInt(parseFloat(gold) * 100000000),
                            "toRoleId": name,
                            "content": content,
                            "ID": ttqp_global.currentUserInfo.roleId.toString()
                        };
                        cc.scn.socket.send(10307, { "roleId": parseInt(name) });
                    }
                }
            } else {
                this.onSendEmailRequest({
                    "gold": 0,
                    "toRoleId": name,
                    "content": content,
                    "ID": ttqp_global.currentUserInfo.roleId.toString()
                });
                this.onShowView(false, this.roleId, this.callback);
            }
        }
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
        //# sourceMappingURL=HomeEmailSendView.js.map
        