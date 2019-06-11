"use strict";
cc._RF.push(module, '2eee88ZomRMT5xFCgtGC0nz', 'trendItemScript');
// Script/jajaleScript/trend/trendItemScript.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 
        itemS: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},

    createItemSpriteFrame: function createItemSpriteFrame(type) {
        console.log(type);
        if (type === 1) {

            this.itemS.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/textures/jajale/trend/landlordMao.png"));
        } else if (type === 2) {

            this.itemS.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/textures/jajale/trend/farmerMao.png"));
        } else {
            this.itemS.spriteFrame = new cc.SpriteFrame();
        }
    }
});

cc._RF.pop();