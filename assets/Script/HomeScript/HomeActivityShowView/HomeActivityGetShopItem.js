cc.Class({
    extends: cc.Component,

    properties: {
        shopIcon: cc.Node,
        contentLabel: cc.Label,
    },

    onLoad() { },

    init(itemData) {

        this.contentLabel.string = "";
        if (parseInt(itemData.shop.id) == 100) {
            this.contentLabel.string = itemData.count.toString();
        } else {
            this.contentLabel.string = itemData.shop.name.toString();
        }
        this.contentLabel.string = parseInt(itemData.getCount) > 1 ? (itemData.getCount.toString() + ' X ' + this.contentLabel.string) : this.contentLabel.string;

        var file = "resources/icon/goods/" + itemData.shop.icon;
        this.shopIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(file));
    },
});
