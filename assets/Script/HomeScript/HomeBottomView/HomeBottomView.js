var socket = require("websocketScript");

cc.Class({
    extends: cc.Component,

    properties: {

        menusBtnArray: [cc.Node],

        // 红点，顺序分别是  签到、邮件、活动
        emailRedPointIcon: [cc.Node],
        // 更多
        moreView: cc.Node,
    },

    onLoad () {
        // 红点主推接口
        onfire.on("HomeGetRedPointHandle", this.onRedPointHandle.bind(this));

        let windowSize = cc.view.getVisibleSize();
        let intervalX = 4;
        let menusW = (windowSize.width - intervalX * (this.menusBtnArray.length - 1)) / this.menusBtnArray.length;
        for (let j = 0; j < this.menusBtnArray.length; j++) {
            let menusBtn = this.menusBtnArray[j];
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
    onRedPointHandle(data) {
        //
    },
});
