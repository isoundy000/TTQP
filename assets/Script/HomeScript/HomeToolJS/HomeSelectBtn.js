cc.Class({
    extends: cc.Component,

    properties: {
        // 普通情况下的图片
        normalIcon: cc.SpriteFrame,
        // 选中的图片
        selectIcon: cc.SpriteFrame,
        // 是否选中按钮
        isSelect: false,
        // 是否反弹按钮，也就是，在按钮点击的时候，决定按钮弹起来，还是处于选中状态
        isTouchUp: false,
        // 按钮的标题标签  如果存在选中和不选中两种状态下都有不一样的标题的情况下，就将按钮的标签连接到此
        titleLabel: cc.Label,
        // 默认状态下的按钮标题
        normalTitle: cc.String,
        // 选中状态下的按钮标题
        selectTitle: cc.String,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.button = this.getComponent(cc.Button);

        // 初始化按钮图片
        this.onStatus(this.isSelect);

        // 初始化按钮标题
        this.setBtnTitle(this.isSelect);
    },

    // 按钮图片的配置
    onStatus: function (isSelect) {
        if (this.isTouchUp) return;
        if (this.selectIcon == null) return;

        this.button = this.getComponent(cc.Button);

        if (isSelect) {
            this.isSelect = isSelect;
            this.button.normalSprite = this.selectIcon;
        } else {
            this.isSelect = false;
            if (this.normalIcon) {
                this.button.normalSprite = this.normalIcon;
            }
        }

        // 初始化按钮标题
        this.setBtnTitle(isSelect);
    },

    // 按钮标题的配置
    setBtnTitle: function(isSelect) {
        if (this.titleLabel == null) return;
        this.titleLabel.string = isSelect ? this.selectTitle : this.normalTitle;
    }
});
