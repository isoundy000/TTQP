"use strict";
cc._RF.push(module, '8d9a35qKktP5Zn55QOgu3Jd', 'HomeActivityGonggaoTitleBtn');
// Script/HomeScript/HomeActivityShowView/HomeActivityGonggaoTitleBtn.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: cc.Label
    },

    onLoad: function onLoad() {},
    init: function init(data) {
        this.titleLabel.string = data.title.toString();
    }
});

cc._RF.pop();