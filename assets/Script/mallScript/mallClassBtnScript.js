

cc.Class({
    extends: cc.Component,

    properties: {

        // 选中图片
        selectSpriteFrame: cc.SpriteFrame,
        // 默认图片
        normalSpriteFrame: cc.SpriteFrame,
        // 是否选中
        isSelect: true,
        // 选中标题图片
        titleSelectSpriteFrame: cc.SpriteFrame,
        // 默认标题图片
        titleNormalSpriteFrame: cc.SpriteFrame,
        // 标题节点
        titleNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.setBtnStatus(this.isSelect,1);
    },

    setBtnStatus: function(status, tag) {
        this.button = this.getComponent(cc.Button);

        if (this.selectSpriteFrame == null) {
            return;
        }
        if (status) {
            
            this.isSelect = status;
            this.button.normalSprite = this.selectSpriteFrame;
            this.titleNode.getComponent(cc.Sprite).spriteFrame = this.titleSelectSpriteFrame;
        }else {
            
            this.isSelect = false;
            if (this.normalSpriteFrame) {
                this.button.normalSprite = this.normalSpriteFrame;
                this.titleNode.getComponent(cc.Sprite).spriteFrame = this.titleNormalSpriteFrame;
            }
        }
    }
});
