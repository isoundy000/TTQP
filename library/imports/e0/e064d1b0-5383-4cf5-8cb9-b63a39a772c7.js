"use strict";
cc._RF.push(module, 'e064dGwU4NM9Yy5tjo5p3LH', 'HomeSetTixianBankItem');
// Script/HomeScript/HomeSettingView/HomeSetTixianBankItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        bankTitleLabel: cc.Label
    },

    onLoad: function onLoad() {
        //init
    },
    init: function init(itemData, callback) {
        this.callback = callback;
        this.itemData = itemData;

        this.bankTitleLabel.string = itemData.title.toString();
    },
    onCheckBoxBtnClick: function onCheckBoxBtnClick(event) {
        var _this = this;

        //
        if (parseInt(this.itemData.isSelect) == 1) return;

        this.init(this.itemData, this.callback);
        setTimeout(function () {
            if (_this.callback) {
                _this.callback(_this.itemData, _this.callback);
            }
        }, 0.25);
    }
});

cc._RF.pop();