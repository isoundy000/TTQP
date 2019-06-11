cc.Class({
    extends: cc.Component,

    properties: {
        // 商品图标
        shop_icon: cc.Node,
    },

    onLoad () {},

    init(itemData, iconConfigData) {
        this.itemData = itemData;
        this.iconConfigData = iconConfigData;

        if (iconConfigData) {
            var file = "resources/icon/goods/" + iconConfigData.icon;
            // var file = "resources/icon/goods/goods_10.png";
            
            this.shop_icon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(file));
        }
    }
});
