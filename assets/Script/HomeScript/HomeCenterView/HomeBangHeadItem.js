cc.Class({
    extends: cc.Component,

    properties: {
        // 头像
        headIcon: cc.Node,
    },

    onLoad () {
    },

    init(itemData, callback) {
        this.itemData = itemData;
        this.callback = callback;

        if (parseInt(itemData.type) == 2) {
            this.headIcon.color = new cc.Color(92, 74, 124);
        } else {
            this.headIcon.color = new cc.Color(255, 255, 255);
        }

        console.log("头像的加载出问题，后期再解决");
        // let headImgurl = itemData.headImgurl ? itemData.headImgurl.toString() : "";
        // if (headImgurl.length) {
        //     let self = this;
        //     cc.loader.load(headImgurl, function (err, texture) {
        //         self.headIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        //     });
        // }
    },

    onHeadBtnClick(event) {
        if (this.callback) {
            this.callback(this.itemData);
        }
    },
});
