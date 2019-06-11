cc.Class({
    extends: cc.Component,

    properties: {
        isStart: false,
        xSpeed: 3,
        intervalX: 100,

        msgLabel: cc.Node,
    },

    // onLoad () {},

    init(data) {
        this.getComponent(cc.Label).string = data.sender + '：';
        this.msgLabel.getComponent(cc.Label).string = data.msg.toString();
        this.msgLabel.setPosition(cc.p(this.node.getContentSize().width, 0));

        this.onStart(true);
    },

    onStart(isStart) {
        this.isStart = isStart;
        this.startPosition = this.node.position;
    },

    update (dt) {
        if (this.isStart) {
            
            this.node.setPosition(cc.p(this.node.position.x - this.xSpeed, -20));

            let contentW = this.node.getContentSize().width + this.msgLabel.getContentSize().width;

            if (((this.startPosition.x - this.node.position.x - contentW) >= this.intervalX && ((this.startPosition.x - this.node.position.x - contentW) < this.intervalX + this.xSpeed))) {
                console.log("新广播可以出来了");
                this.node.parent.getComponent('HomeGuangBoView').onNextGuanggao();
            }
            if (this.node.position.x < -contentW) {
                console.log("可以回收回去了！");
                this.isStart = false;
                this.node.parent.getComponent('HomeGuangBoView').onRecyclingNode(this.node);
            }
        }
    },

});
