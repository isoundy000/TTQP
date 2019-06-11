(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeSettingView/HomeSetTixianBankItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e064dGwU4NM9Yy5tjo5p3LH', 'HomeSetTixianBankItem', __filename);
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
        //# sourceMappingURL=HomeSetTixianBankItem.js.map
        