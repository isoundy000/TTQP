"use strict";
cc._RF.push(module, '1bedbrlGuhOKK9tgzWQm9uT', 'HomeSignInItem');
// Script/HomeScript/HomeSignInShowView/HomeSignInItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        /// 未签到标记图标
        noSignInIcon: cc.Node,
        /// 已签到标记图标
        signInIcon: cc.Node
    },

    onLoad: function onLoad() {},
    init: function init(signInData) {

        var signInStatus = parseInt(signInData.status);
        this.signInIcon.active = signInStatus == 2;
        this.noSignInIcon.active = !this.signInIcon.active;
    }
});

cc._RF.pop();