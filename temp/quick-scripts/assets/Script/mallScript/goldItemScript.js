(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/mallScript/goldItemScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8649cPc0tRAdoIhk+jqjfXZ', 'goldItemScript', __filename);
// Script/mallScript/goldItemScript.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 图标
        item_speaker: cc.Sprite,
        // 说明
        item_detail_text: cc.Label,
        // 赠送
        item_give_text: cc.Label,
        // 价格
        item_price: cc.Label,
        // 购买类型 是钻石还是人民币
        item_buy_type: cc.Sprite
    },

    init: function init(dict, tag) {
        // 动态加载 spriteFrame 需要将资源放在 resources 目录下
        // var iUrl = tag == "1001" ? "resources/textures/Global_imgs/RMB_icon.png" : "resources/textures/Global_imgs/Diamond_icon.png";
        // this.item_buy_type.spriteFrame = new cc.SpriteFrame(cc.url.raw(iUrl));

        // 动态加载图集
        var self = this;
        var file = tag == "1001" ? "textures/mall/mall-zuanshi-icon" : tag == "1002" ? "textures/Global_imgs/global_imgs" : "textures/mall/mall-icon";
        cc.loader.loadRes(file, cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame(dict["icon"]);
            self.item_speaker.spriteFrame = frame;
        });

        this.item_detail_text.string = dict["detail"];

        this.item_give_text.string = dict["give"];

        this.item_price.string = dict["price"];

        this.items = dict;
        this.items["tag"] = tag;
    },

    onBuyAction: function onBuyAction() {
        // 冒泡会从事件发起节点不断向上传递给他的父级节点，知道根节点或者在某个节点的响应函数中做了中断处理 event.stopPropagation()
        var ev = new cc.Event.EventCustom("onBuyAction", true);
        // 设置用户数据
        ev.setUserData([this.items]);

        this.node.dispatchEvent(ev);
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
        //# sourceMappingURL=goldItemScript.js.map
        