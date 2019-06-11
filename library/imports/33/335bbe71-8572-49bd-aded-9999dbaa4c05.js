"use strict";
cc._RF.push(module, '335bb5xhXJJva3tmZnbqkwF', 'HomeSetTixianBankView');
// Script/HomeScript/HomeSettingView/HomeSetTixianBankView.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {

        scrollView: cc.ScrollView,
        scrollContent: cc.Node,

        itemPrefab: cc.Prefab
    },

    onLoad: function onLoad() {},
    onCreateItem: function onCreateItem() {
        var _this = this;

        if (!this.bankDataList) return;

        this.scrollContent.removeAllChildren();

        var _loop = function _loop(i) {
            var itemDic = _this.bankDataList[i];

            var item = cc.instantiate(_this.itemPrefab);
            var self = _this;
            item.getComponent('HomeSetTixianBankItem').init(itemDic, function (itemData) {
                self.node.active = false;
                if (self.callback) {
                    self.callback(itemData);
                }
            });
            _this.scrollContent.addChild(item);
        };

        for (var i = 0; i < this.bankDataList.length; i++) {
            _loop(i);
        }
        this.scrollView.scrollToTop(0.000001);
    },
    init: function init(isShow, bankDataList, callback) {
        this.node.active = isShow;
        this.bankDataList = bankDataList;
        this.callback = callback;

        this.onCreateItem();
    },
    onCloseView: function onCloseView(event) {
        this.node.active = false;
    }
});

cc._RF.pop();