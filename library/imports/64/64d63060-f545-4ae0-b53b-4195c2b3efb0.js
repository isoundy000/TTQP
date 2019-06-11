"use strict";
cc._RF.push(module, '64d63Bg9UVK4LU7QZXCs++w', 'HomeSetDailiIntroView');
// Script/HomeScript/HomeSettingView/HomeSetDailiIntroView.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,
        // 内容标签
        contentLabel: cc.Label

    },

    onLoad: function onLoad() {
        // this.contentLabel.string = "只需要邀请好友来玩游戏，好友在进入游戏或在游戏设置里的邀请人ID窗口输入您的游戏账号ID，好友就成为您邀请的玩家。您邀请的玩家越多您的代理红包数额就越大，而且每月兑现，快来加入代理吧，您会发现原来发财不是梦!";
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
        } else {
            var scaleAmin = cc.scaleTo(0, 0.8, 0.8);
            this.contentView.runAction(scaleAmin);
        }
        this.node.active = isShow;
    },


    /**
     * 点击确定按钮
     */
    onMenusBtnClick: function onMenusBtnClick(event) {
        // 确定
        this.onShowView(false, this.callback);
    },


    /**
     * 点击关闭按钮
     */
    onCloseBtnClick: function onCloseBtnClick(event) {
        this.onShowView(false, this.callback);
    }
});

cc._RF.pop();