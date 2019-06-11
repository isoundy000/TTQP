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
        maxLabel: cc.Label,
        
    },

    onLoad () {

    },

    // 给UI赋值
    init(data) {
        this.countLabel.string = data.ranking.toString();
        this.nameLabel.string = data.nickname.toString();
        this.idLabel.string = data.ID.toString();
        this.goldLabel.string = data.gold.toString();
        this.maxLabel.string = data.hisMaxGold.toString();
    },
});
