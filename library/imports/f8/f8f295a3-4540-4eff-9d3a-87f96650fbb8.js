"use strict";
cc._RF.push(module, 'f8f29WjRUBO/506h/lmUPu4', 'HomeEmailSystemMsgItem');
// Script/HomeScript/HomeEmailShowView/HomeEmailSystemMsgItem.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        contentLabel: cc.Label,
        timeLabel: cc.Label
    },

    /**
     * 配置本类UI
     */
    init: function init(itemData) {
        if (!itemData) return;
        this.itemData = itemData;

        var date = new Date(itemData.time * 1000);
        this.timeLabel.string = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString() + '月' + date.getDate().toString() + '日';

        this.contentLabel.string = itemData.content;
    }
});

cc._RF.pop();