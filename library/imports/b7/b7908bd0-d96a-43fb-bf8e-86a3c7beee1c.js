"use strict";
cc._RF.push(module, 'b7908vQ2WpD+7+OhqPHvu4c', 'HomeBottomView');
// Script/HomeScript/HomeBottomView/HomeBottomView.js

"use strict";

var socket = require("websocketScript");

cc.Class({
    extends: cc.Component,

    properties: {

        menusBtnArray: [cc.Node],

        // 红点，顺序分别是  签到、邮件、活动
        emailRedPointIcon: [cc.Node],
        // 更多
        moreView: cc.Node
    },

    onLoad: function onLoad() {
        // 红点主推接口
        onfire.on("HomeGetRedPointHandle", this.onRedPointHandle.bind(this));

        var windowSize = cc.view.getVisibleSize();
        var intervalX = 4;
        var menusW = (windowSize.width - intervalX * (this.menusBtnArray.length - 1)) / this.menusBtnArray.length;
        for (var j = 0; j < this.menusBtnArray.length; j++) {
            var menusBtn = this.menusBtnArray[j];
            if (j == 5) {
                menusBtn.width = menusW + 10;
                menusBtn.setPosition(cc.p((intervalX + menusW) * j - 5, 0));
            } else {
                menusBtn.width = menusW;
                menusBtn.setPosition(cc.p((intervalX + menusW) * j, 0));
            }
        }

        // 调整moreView的位置
        this.moreView.setPosition(cc.p((windowSize.width - this.moreView.width) / 2 - menusW / 4 * 5.3, -310));
    },


    /**
     * 配置邮件按钮右上角的红点图标
     */
    onRedPointHandle: function onRedPointHandle(data) {
        //
    }
});

cc._RF.pop();