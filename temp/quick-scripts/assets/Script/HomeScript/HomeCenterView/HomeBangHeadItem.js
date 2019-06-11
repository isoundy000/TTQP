(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeCenterView/HomeBangHeadItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e1c1bZuJuNBC6JdZieWv337', 'HomeBangHeadItem', __filename);
// Script/HomeScript/HomeCenterView/HomeBangHeadItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 头像
        headIcon: cc.Node
    },

    onLoad: function onLoad() {},
    init: function init(itemData, callback) {
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
    onHeadBtnClick: function onHeadBtnClick(event) {
        if (this.callback) {
            this.callback(this.itemData);
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
        //# sourceMappingURL=HomeBangHeadItem.js.map
        