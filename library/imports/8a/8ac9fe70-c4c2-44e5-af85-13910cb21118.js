"use strict";
cc._RF.push(module, '8ac9f5wxMJE5a+FE5EMshEY', 'HomeAlertUserView');
// Script/HomeScript/HomeAlertUserView/HomeAlertUserView.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,
        nicknameLabel: cc.Label,
        idLabel: cc.Label,
        goldLabel: cc.Label
    },

    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow         
     * @param {弹窗数据} alertData    
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView: function onShowView(isShow, alertData, callback) {
        console.log("如果角色不存在等出错情况，需要在工具类里面统一处理");

        this.alertData = alertData;
        this.callback = callback;

        this.node.active = isShow;

        if (isShow) {

            if (alertData) {
                var userID = alertData.id;
                for (var i = 0; i < 6 - alertData.id.length; i++) {
                    userID = "0" + userID;
                }
                this.nicknameLabel.string = alertData.nickname;
                this.idLabel.string = userID;
                this.goldLabel.string = alertData.gold;

                var self = this;
                if (alertData.headUrl.length) {
                    cc.loader.load(alertData.headUrl, function (err, texture) {
                        self.headIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                    });
                }
            } else {
                this.nicknameLabel.string = "";
                this.idLabel.string = "";
                this.goldLabel.string = "";
                this.headIcon.getComponent(cc.Sprite).spriteFrame = null;
            }

            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.contentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));
        } else {
            var scaleAmin = cc.scaleTo(0, 0.8, 0.8);
            this.contentView.runAction(scaleAmin);
        }
    },
    onMenusBtnClick: function onMenusBtnClick(event, customData) {
        if (parseInt(customData) == 0 && this.callback) {
            this.callback();
        }
        this.onShowView(false, null, null);
    },


    /**
     * 关闭按钮的点击
     */
    onCloseBtnClick: function onCloseBtnClick(event) {
        this.onShowView(false, null, null);
    }
});

cc._RF.pop();