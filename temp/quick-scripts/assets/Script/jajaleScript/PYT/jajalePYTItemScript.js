(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/jajaleScript/PYT/jajalePYTItemScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '89de8DJaCBPPYBKgM76e+U/', 'jajalePYTItemScript', __filename);
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
        //# sourceMappingURL=jajalePYTItemScript.js.map
        