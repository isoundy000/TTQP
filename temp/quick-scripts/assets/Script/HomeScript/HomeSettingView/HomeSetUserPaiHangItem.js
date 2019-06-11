(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeSettingView/HomeSetUserPaiHangItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9b0ecSMPFhDF5LDzKACWbrL', 'HomeSetUserPaiHangItem', __filename);
// Script/HomeScript/HomeSettingView/HomeSetUserPaiHangItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 名次
        countLabel: cc.Label,
        // 昵称
        nameLabel: cc.Label,
        // ID
        idLabel: cc.Label,
        // 当前金币
        goldLabel: cc.Label,
        // 拥有最高
        maxLabel: cc.Label

    },

    onLoad: function onLoad() {},


    // 给UI赋值
    init: function init(data) {
        this.countLabel.string = data.ranking.toString();
        this.nameLabel.string = data.nickname.toString();
        this.idLabel.string = data.ID.toString();
        this.goldLabel.string = data.gold.toString();
        this.maxLabel.string = data.hisMaxGold.toString();
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
        //# sourceMappingURL=HomeSetUserPaiHangItem.js.map
        