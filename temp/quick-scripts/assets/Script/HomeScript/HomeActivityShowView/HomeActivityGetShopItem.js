(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeActivityShowView/HomeActivityGetShopItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bf6e0FNdU5LhLKnSBvBYZ6J', 'HomeActivityGetShopItem', __filename);
// Script/HomeScript/HomeActivityShowView/HomeActivityGetShopItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        shopIcon: cc.Node,
        contentLabel: cc.Label
    },

    onLoad: function onLoad() {},
    init: function init(itemData) {

        this.contentLabel.string = "";
        if (parseInt(itemData.shop.id) == 100) {
            this.contentLabel.string = itemData.count.toString();
        } else {
            this.contentLabel.string = itemData.shop.name.toString();
        }
        this.contentLabel.string = parseInt(itemData.getCount) > 1 ? itemData.getCount.toString() + ' X ' + this.contentLabel.string : this.contentLabel.string;

        var file = "resources/icon/goods/" + itemData.shop.icon;
        this.shopIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(file));
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
        //# sourceMappingURL=HomeActivityGetShopItem.js.map
        