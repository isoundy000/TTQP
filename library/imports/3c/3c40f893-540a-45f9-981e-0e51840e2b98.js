"use strict";
cc._RF.push(module, '3c40fiTVApF+ZgeDlGEDiuY', 'HomeSelectImgTitleBtn');
// Script/HomeScript/HomeToolJS/HomeSelectImgTitleBtn.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 普通情况下的图片
        bgNormalIcon: cc.SpriteFrame,
        // 选中的图片
        bgSelectIcon: cc.SpriteFrame,

        // 标题图标节点
        titleNode: cc.Node,
        // 标题默认图标
        titleNormalIcon: cc.SpriteFrame,
        // 标题选中图标
        titleSelectIcon: cc.SpriteFrame,

        // 是否选中按钮
        isSelect: false
    },

    onLoad: function onLoad() {

        // 初始化按钮图片
        this.onStatus(this.isSelect);
    },


    // 按钮图片的配置
    onStatus: function onStatus(isSelect) {
        if (this.bgSelectIcon == null) return;

        this.isSelect = isSelect;

        // 获取背景按钮
        if (!this.button) this.button = this.getComponent(cc.Button);

        if (isSelect) {
            // 更改 背景按钮 的 选中 图标
            if (this.bgSelectIcon) this.button.normalSprite = this.bgSelectIcon;
            // 更改 标题按钮 的 选中 图标
            if (this.titleSelectIcon) this.titleNode.getComponent(cc.Sprite).spriteFrame = this.titleSelectIcon;
        } else {
            // 更改 背景按钮 的 默认 图标
            if (this.bgNormalIcon) this.button.normalSprite = this.bgNormalIcon;
            // 更改 标题按钮 的 默认 图标
            if (this.titleNormalIcon) this.titleNode.getComponent(cc.Sprite).spriteFrame = this.titleNormalIcon;
        }
    }
});

cc._RF.pop();