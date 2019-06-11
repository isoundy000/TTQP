"use strict";
cc._RF.push(module, 'd509cqUnPJJ2pPIG2Ims2A5', 'HomePackShopItem');
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