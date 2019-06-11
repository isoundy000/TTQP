(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeSettingView/HomeSetUserPaiHangView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e20b7OEyUxFWISz49Aif2PG', 'HomeSetUserPaiHangView', __filename);
// Script/HomeScript/HomeSettingView/HomeSetUserPaiHangView.js

"use strict";

// 发接口对象
var socket = require("websocketScript");

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,

        userScrollView: cc.ScrollView,
        scrollContent: cc.Node,
        userBangItem: cc.Prefab
    },

    onLoad: function onLoad() {

        onfire.on("HomeDailiUserBangHandle", this.onGetUserBangHandle.bind(this));
    },
    onCreateItem: function onCreateItem() {
        this.scrollContent.removeAllChildren();
        for (var i = 0; i < this.userList.length; i++) {
            var user = this.userList[i];
            var item = cc.instantiate(this.userBangItem);
            this.scrollContent.addChild(item);
            item.getComponent('HomeSetUserPaiHangItem').init(user);
        }
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow       
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView: function onShowView(isShow, callback) {
        this.callback = callback;
        this.contentView.setScale(0.8, 0.8);

        if (isShow) {
            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.contentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));

            // 拉取数据
            this.onGetUserBangRequest();
        } else {
            var scaleAmin = cc.scaleTo(0, 0.8, 0.8);
            this.contentView.runAction(scaleAmin);
        }
        this.node.active = isShow;
    },


    /*********************** 发送接口 ***********************/
    onGetUserBangRequest: function onGetUserBangRequest() {
        cc.scn.socket.send(10902);
    },


    /*********************** 接口回调 ***********************/
    onGetUserBangHandle: function onGetUserBangHandle(data) {
        if (data && data.rankList && data.rankList.length > 0) {
            this.userList = data.rankList;
            this.onCreateItem();
        }
    },


    /**
     * 点击关闭按钮
     * 或者判断是否是点击了灰色背景View，如果是点击灰色背景View，让弹窗消失
     */
    onCloseBtnClick: function onCloseBtnClick(event) {
        this.onShowView(false, this.callback);
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
        //# sourceMappingURL=HomeSetUserPaiHangView.js.map
        