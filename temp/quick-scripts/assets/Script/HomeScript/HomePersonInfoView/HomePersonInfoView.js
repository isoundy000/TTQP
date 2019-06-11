(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomePersonInfoView/HomePersonInfoView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ca45avPA+tMJZHQq/7d0c3w', 'HomePersonInfoView', __filename);
// Script/HomeScript/HomePersonInfoView/HomePersonInfoView.js

"use strict";

var socket = require("websocketScript");

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,

        headIcon: cc.Node,
        nameLabel: cc.Label,
        idLabel: cc.Label,
        goldLabel: cc.Label,
        zuanLabel: cc.Label,
        sexBtn: cc.Node,

        phoneLabel: cc.Node,
        bindBtn: cc.Node,

        // 总局数
        allCountLabel: cc.Label,
        // 周盈利
        weekYingliLabel: cc.Label,
        // 单局最高
        sigleMaxMoneyLabel: cc.Label,
        // 最高资产
        allMaxMoneyLabel: cc.Label,

        // 绑定手机弹窗
        bindPhoneView: cc.Node,
        // 牌局记录弹窗
        gameLogView: cc.Node
    },

    onLoad: function onLoad() {
        onfire.on("HomeGetUserInfoHandle", this.onGetPersonDetailInfoHandle.bind(this));
    },
    onConfigUI: function onConfigUI() {
        //
        this.idLabel.string = "ID:" + this.personInfo.ID.toString();
        this.goldLabel.string = this.personInfo.gold.toString();
        this.zuanLabel.string = this.personInfo.diamond.toString();
        this.nameLabel.string = this.personInfo.nickname.toString();
        this.allCountLabel.string = this.personInfo.totalNum.toString();
        this.weekYingliLabel.string = this.personInfo.weekProfit.toString();
        this.sigleMaxMoneyLabel.string = this.personInfo.onePlayMax.toString();
        this.allMaxMoneyLabel.string = this.personInfo.hisMaxGold.toString();
        var phone = this.personInfo.phone ? this.personInfo.phone.toString() : "";
        this.phoneLabel.getComponent(cc.Label).string = "电话:" + phone;
        this.phoneLabel.active = phone.length == 0 ? false : true;
        this.bindBtn.active = !this.phoneLabel.active;

        this.sexBtn.getComponent('HomeSelectBtn').onStatus(parseInt(this.personInfo.sex) == 2);

        console.log("头像的加载出问题，后期再解决");
        // let self = this;
        // if (this.personInfo.headImgurl.length) {
        //     cc.loader.load(this.personInfo.headImgurl, function (err, texture) {
        //         self.headIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        //     });
        // }
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow           
     */
    onShowView: function onShowView(isShow) {

        this.node.active = isShow;
        if (isShow) {
            var moveAction = cc.moveTo(0.2, cc.p(0, 0));
            this.contentView.runAction(moveAction);

            this.onGetPersonDetailInfoRequest();
        } else {
            this.contentView.setPositionY(-1300);
        }
    },


    /****************************  本类接口相关  *************************/
    onGetPersonDetailInfoRequest: function onGetPersonDetailInfoRequest() {

        cc.scn.socket.send(10401, {
            type: 1,
            roleId: ttqp_global.currentUserInfo ? ttqp_global.currentUserInfo.roleId : ""
        });
    },


    /*********************** 本类接口回调相关  **********************/
    onGetPersonDetailInfoHandle: function onGetPersonDetailInfoHandle(data) {
        if (!data || this.node.active == false) return;

        this.personInfo = data;
        this.onConfigUI();
    },
    onMenusBtnClick: function onMenusBtnClick(event, customData) {
        var idx = parseInt(customData);
        if (idx == 0) {
            var self = this;
            this.bindPhoneView.getComponent('HomeAddPhoneView').onShowView(true, function (phone) {
                self.phoneLabel.getComponent(cc.Label).string = phone;
                self.phoneLabel.active = true;
                self.bindBtn.active = !self.phoneLabel.active;
            });
        } else {
            this.gameLogView.getComponent('HomeGameLogView').onShowView(true);
        }
    },
    onCloseBtnClick: function onCloseBtnClick(event) {
        this.onShowView(false);
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
        //# sourceMappingURL=HomePersonInfoView.js.map
        