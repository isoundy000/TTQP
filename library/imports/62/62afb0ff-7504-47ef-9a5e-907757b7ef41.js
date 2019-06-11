"use strict";
cc._RF.push(module, '62afbD/dQRH75pekHdXt+9B', 'HomeRankingListView');
// Script/HomeScript/HomeRankingListView/HomeRankingListView.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,

        friendBtn: cc.Node,
        friendRankingView: cc.Node,

        allMoneyBtn: cc.Node,
        allRankingView: cc.Node
    },

    onLoad: function onLoad() {

        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(function () {
            self.onShowView(false);
        });
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow          
     */
    onShowView: function onShowView(isShow) {
        this.node.active = isShow;
        if (isShow) {
            var windowSize = cc.view.getVisibleSize();

            var moveAction = cc.moveTo(0.2, cc.p(-(windowSize.width / 2 - this.contentView.width / 2), 0));
            this.contentView.runAction(moveAction);

            this.onMenusBtnClick(null, "0");
        } else {
            this.contentView.setPositionX(-1800);
        }
    },


    /*************************  监听本类事件  ****************************/
    /**
     * 榜单切换按钮的点击
     */
    onMenusBtnClick: function onMenusBtnClick(event, customData) {
        var self = this;
        var itemIdx = parseInt(customData);
        this.friendBtn.getComponent('HomeSelectImgTitleBtn').onStatus(itemIdx == 0);
        this.friendRankingView.getComponent('HomeRankingFriendView').onShowView(itemIdx == 0, function (data) {});
        this.allMoneyBtn.getComponent('HomeSelectImgTitleBtn').onStatus(itemIdx == 1);
        this.allRankingView.getComponent('HomeRankingAllView').onShowView(itemIdx == 1, function (data) {});
    }
});

cc._RF.pop();