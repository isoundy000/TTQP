cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: cc.Label,
    },

    onLoad () {},

    init(data) {
        this.titleLabel.string = data.title.toString();
    },
});
