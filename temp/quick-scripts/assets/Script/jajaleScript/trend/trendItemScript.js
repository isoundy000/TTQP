(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/jajaleScript/trend/trendItemScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2eee88ZomRMT5xFCgtGC0nz', 'trendItemScript', __filename);
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
        //# sourceMappingURL=trendItemScript.js.map
        