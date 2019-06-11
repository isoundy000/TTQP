(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeTopView/HomeTopView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bd30a0KaMtHJq+aiI4HsrZO', 'HomeTopView', __filename);
// Script/HomeScript/HomeTopView/HomeTopView.js

"use strict";

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
        zuanLabel: cc.Label
    },

    onLoad: function onLoad() {},

    /**
     * 配置本类UI数据
     */
    onConfigUI: function onConfigUI(homeData) {
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
        //# sourceMappingURL=HomeTopView.js.map
        