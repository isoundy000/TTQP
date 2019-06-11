"use strict";
cc._RF.push(module, '89de8DJaCBPPYBKgM76e+U/', 'jajalePYTItemScript');
// Script/jajaleScript/PYT/jajalePYTItemScript.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        idLab: cc.Label,
        nameLab: cc.Label,
        minGoldLab: cc.Label,
        currentNumLab: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    initPYTItem: function initPYTItem(data, btnFunc) {
        this.idLab.string = data.roomId;
        this.nameLab.string = data.nickname;
        this.minGoldLab.string = ttqp_global.unitConversion(data.minGold);
        this.currentNumLab.string = data.curOnline;

        this.callback = btnFunc;
        this.roomId = data.roomId;
    },

    onEnter: function onEnter() {
        if (this.callback) {
            this.callback(this.roomId);
        }
    }

});

cc._RF.pop();