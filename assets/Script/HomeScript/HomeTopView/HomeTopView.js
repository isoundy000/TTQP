cc.Class({
    extends: cc.Component,

    properties: {
        // 头像
        headIcon: cc.Node,
        // 名字
        nameLabel: cc.Label,
        // 金币
        goldLabel: cc.Label,
        // 钻石
        zuanLabel: cc.Label,
    },

    onLoad () {
    },
    /**
     * 配置本类UI数据
     */
    onConfigUI(homeData) {
        this.nameLabel.string = homeData ? homeData.nickname : "";

        this.goldLabel.string = homeData ? homeData.gold : "";

        this.zuanLabel.string = homeData ? homeData.diamond : "";

        console.log("头像的加载出问题，后期再解决");
        // let self = this;
        // if (homeData && homeData.headimgurl.length) {
        //     cc.loader.load(homeData.headimgurl, function (err, texture) {
        //         self.headIcon.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        //     });
        // }
    },
});
