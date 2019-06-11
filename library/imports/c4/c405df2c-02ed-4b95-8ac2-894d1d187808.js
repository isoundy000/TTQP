"use strict";
cc._RF.push(module, 'c405d8sAu1LlYrCiU0dGHgI', 'HomeRankingListItem');
// Script/HomeScript/HomeRankingListView/HomeRankingListItem.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 
        headIcon: cc.Node,
        nameLabel: cc.Label,
        // levelLabel: cc.Label,   // 策划决定，等级暂时不要，在等级的位置，再显示一次昵称
        nameReLabel: cc.Label,
        goldLabel: cc.Label,
        levelRankingIcon: cc.Node,
        levelRankingLabel: cc.Node,

        levelRankingIconSpFrames: [cc.SpriteFrame]
    },

    init: function init(data, idx, callback) {
        this.data = data;
        this.idx = idx;
        this.callback = callback;

        this.levelRankingLabel.active = idx > 2;
        this.levelRankingLabel.getComponent(cc.Label).string = '第' + (idx + 1).toString() + '名';
        this.levelRankingIcon.active = !this.levelRankingLabel.active;
        if (idx < 3) {
            this.levelRankingIcon.getComponent(cc.Sprite).spriteFrame = this.levelRankingIconSpFrames[idx];
        }

        this.nameLabel.string = data.nickname.toString();
        this.nameReLabel.string = this.nameLabel.string;

        this.goldLabel.string = data.gold.toString();

        console.log("头像的加载出问题，后期再解决");
        // let self = this;
        // if (data.headImgurl.length) {
        //     cc.loader.load(data.headImgurl, function (err, texture) {
        //         self.headIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        //     });
        // }
    },


    /**
     * 头像点击
     */
    onHeadBtnClick: function onHeadBtnClick(event) {
        if (this.callback) {
            this.callback(this.data, this.idx);
        }
    }
});

cc._RF.pop();