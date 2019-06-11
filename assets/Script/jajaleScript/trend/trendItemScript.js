
cc.Class({
    extends: cc.Component,

    properties: {
        // 
        itemS: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },
    createItemSpriteFrame: function(type) {
        console.log(type);
        if (type === 1) {
            
            this.itemS.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/textures/jajale/trend/landlordMao.png"));
        }else if (type === 2) {
            
            this.itemS.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/textures/jajale/trend/farmerMao.png"));
        }else {
            this.itemS.spriteFrame = new cc.SpriteFrame();
        }
    }
});
