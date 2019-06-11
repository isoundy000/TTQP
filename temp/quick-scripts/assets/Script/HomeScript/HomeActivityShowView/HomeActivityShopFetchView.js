(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeActivityShowView/HomeActivityShopFetchView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'daf5aZmyYRO/rdGMmSUvcpQ', 'HomeActivityShopFetchView', __filename);
// Script/HomeScript/HomeActivityShowView/HomeActivityShopFetchView.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件背景View
        contentView: cc.Node,

        shopItemPrefab: cc.Prefab,

        shopItemBgView: cc.Node
    },

    onLoad: function onLoad() {},


    /**
     * 创建物品Item
     */
    onCreateItem: function onCreateItem() {

        this.shopItemBgView.removeAllChildren();

        if (!this.shopList) return;

        var contentSize = this.contentView.getContentSize();
        var itemWH = 154;
        for (var i = 0; i < this.shopList.length; i++) {
            var shopData = this.shopList[i];

            var item = cc.instantiate(this.shopItemPrefab);
            item.setPosition(cc.p(itemWH * i, 0));
            this.shopItemBgView.addChild(item);

            item.getComponent('HomeActivityGetShopItem').init(shopData);
        }

        var shopItemBgViewW = 154 * this.shopList.length;
        this.shopItemBgView.width = shopItemBgViewW;
        this.shopItemBgView.setPosition(cc.p((contentSize.width - shopItemBgViewW) / 2 + 100, -325));
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow         
     * @param {抽到的商品列表} shopList    
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView: function onShowView(isShow, shopList, callback) {
        this.shopList = shopList;
        this.callback = callback;

        this.node.active = isShow;

        if (isShow) {
            this.onCreateItem();
        }
    },


    /****************************************  本类事件监听  ****************************************/
    /**
     * 点击 我知道了 按钮
     */
    onMenusBtnClick: function onMenusBtnClick(event) {
        this.onShowView(false, this.shopList, this.callback);
        if (this.callback) {
            this.callback();
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
        //# sourceMappingURL=HomeActivityShopFetchView.js.map
        