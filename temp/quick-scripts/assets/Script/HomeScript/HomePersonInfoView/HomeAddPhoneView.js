(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomePersonInfoView/HomeAddPhoneView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd7e1dLxeplJOqmQ3ycDKJJa', 'HomeAddPhoneView', __filename);
// Script/HomeScript/HomePersonInfoView/HomeAddPhoneView.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,
        phoneEditBox: cc.EditBox
    },

    onLoad: function onLoad() {
        onfire.on("HomeBindPhoneHandle", this.onAddPhoneHandle.bind(this));
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow      
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView: function onShowView(isShow, callback) {
        this.callback = callback;
        this.node.active = isShow;

        if (isShow) {
            this.phoneEditBox.string = "";

            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.contentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));
        } else {
            var scaleAmin = cc.scaleTo(0.000001, 0.8, 0.8);
            this.contentView.runAction(scaleAmin);
        }
    },


    /****************************  本类接口相关  *************************/
    addPhoneRequest: function addPhoneRequest(phone) {
        cc.scn.socket.send(10402, {
            "phone": phone
        });
    },


    /*********************** 本类接口回调相关  **********************/
    onAddPhoneHandle: function onAddPhoneHandle(data) {
        if (this.callback) {
            this.callback(this.phoneEditBox.string);
            this.onShowView(false);
        }
    },
    onBindBtnClick: function onBindBtnClick(event) {
        var phone = this.phoneEditBox.string ? this.phoneEditBox.string : "";
        if (phone.length != 11) {
            console.log("请输入正确的手机号");
        } else {
            this.addPhoneRequest(phone);
        }
    },
    onCloseBtnClick: function onCloseBtnClick(event) {
        this.onShowView(false, this.callback);
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
        //# sourceMappingURL=HomeAddPhoneView.js.map
        