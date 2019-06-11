(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomePackView/HomePackShopItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd509cqUnPJJ2pPIG2Ims2A5', 'HomePackShopItem', __filename);
// Script/HomeScript/HomePackView/HomePackShopItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 商品图标
        shop_icon: cc.Node
    },

    onLoad: function onLoad() {},
    init: function init(itemData, iconConfigData) {
        this.itemData = itemData;
        this.iconConfigData = iconConfigData;

        if (iconConfigData) {
            var file = "resources/icon/goods/" + iconConfigData.icon;
            // var file = "resources/icon/goods/goods_10.png";

            this.shop_icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(file));
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
        //# sourceMappingURL=HomePackShopItem.js.map
        