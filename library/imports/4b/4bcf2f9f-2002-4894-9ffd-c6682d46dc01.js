"use strict";
cc._RF.push(module, '4bcf2+fIAJIlJ/9xmgtRtwB', 'HomeSyncClickBgNode');
// Script/HomeScript/HomeToolJS/HomeSyncClickBgNode.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        var self = this;
        this.node.on("touchstart", function (event) {
            event.stopPropagation();
            if (self.callback) {
                self.callback();
            }
        });
    },
    onClickLightGrayBg: function onClickLightGrayBg(callback) {
        this.callback = callback;
    }
});

cc._RF.pop();