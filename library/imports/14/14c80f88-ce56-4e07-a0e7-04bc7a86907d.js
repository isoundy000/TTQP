"use strict";
cc._RF.push(module, '14c80+IzlZOB6DnBLx6hpB9', 'HomeKefuChatRow');
// Script/HomeScript/HomeKefuView/HomeKefuChatRow.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        leftBgView: cc.Node,
        leftContentBgView: cc.Node,
        leftContentLabel: cc.Label,
        leftTimeLabel: cc.Label,

        rightBgView: cc.Node,
        rightContentBgView: cc.Node,
        rightContentLabel: cc.Label,
        rightTimeLabel: cc.Label,

        calculateSizeLabel: cc.Node
    },

    onLoad: function onLoad() {
        //
    },
    init: function init(data) {

        this.rightBgView.active = data.isMe == "1";
        this.leftBgView.active = !this.rightBgView.active;
        if (data.isMe == "1") {
            this.rightContentLabel.string = data.content.toString();
            this.rightTimeLabel.string = data.time.toString();

            this.calculateSizeLabel.getComponent(cc.Label).string = this.rightContentLabel.string;
            var size = this.calculateSizeLabel.getContentSize();
            this.rightContentBgView.width = size.width + 50 > 750 ? 750 : size.width + 50;
        } else {
            this.leftContentLabel.string = data.content.toString();
            this.leftTimeLabel.string = data.time.toString();

            this.calculateSizeLabel.getComponent(cc.Label).string = this.leftContentLabel.string;
            var _size = this.calculateSizeLabel.getContentSize();
            this.leftContentBgView.width = _size.width + 50 > 750 ? 750 : _size.width + 50;
        }
    }
});

cc._RF.pop();