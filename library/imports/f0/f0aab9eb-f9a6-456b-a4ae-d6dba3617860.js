"use strict";
cc._RF.push(module, 'f0aabnr+aZFa6Su1tujYXhg', 'HomeAwardGetView');
// Script/HomeScript/HomeAwardGetView/HomeAwardGetView.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件背景View
        contentView: cc.Node,
        // 物品图片框
        shop_icon: cc.Node
    },

    onLoad: function onLoad() {
        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(function () {
            self.onShowView(false, self.spFrame, self.callback);
        });
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow         
     * @param {需要弹出的弹窗中间的物品图标} spFrame    
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView: function onShowView(isShow, spFrame, callback) {
        this.spFrame = spFrame;
        this.callback = callback;
        this.node.active = isShow;

        if (isShow) {
            this.shop_icon.getComponent(cc.Sprite).spriteFrame = spFrame;

            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.contentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));
        } else {
            var scaleAmin = cc.scaleTo(0, 0.8, 0.8);
            this.contentView.runAction(scaleAmin);
        }
    },


    /****************************************  本类事件监听  ****************************************/
    /**
     * 领取奖励按钮点击
     */
    onGetBtnClick: function onGetBtnClick(event) {
        this.onShowView(false, this.spFrame, this.callback);
        if (this.callback) {
            this.callback();
        }
    }
});

cc._RF.pop();