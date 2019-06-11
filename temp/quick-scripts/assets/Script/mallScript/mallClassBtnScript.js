(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/mallScript/mallClassBtnScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5deacY4rsZJ1YzMLZGJxaBq', 'mallClassBtnScript', __filename);
// Script/mallScript/mallClassBtnScript.js

"use strict";

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

    onLoad: function onLoad() {

        this.setBtnStatus(this.isSelect, 1);
    },


    setBtnStatus: function setBtnStatus(status, tag) {
        this.button = this.getComponent(cc.Button);

        if (this.selectSpriteFrame == null) {
            return;
        }
        if (status) {

            this.isSelect = status;
            this.button.normalSprite = this.selectSpriteFrame;
            this.titleNode.getComponent(cc.Sprite).spriteFrame = this.titleSelectSpriteFrame;
        } else {

            this.isSelect = false;
            if (this.normalSpriteFrame) {
                this.button.normalSprite = this.normalSpriteFrame;
                this.titleNode.getComponent(cc.Sprite).spriteFrame = this.titleNormalSpriteFrame;
            }
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=mallClassBtnScript.js.map
        