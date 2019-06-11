cc.Class({
    extends: cc.Component,

    properties: {
        // 标题
        titleLabel: cc.Label,
        // 奖励金币数量
        goldNumLabel: cc.Label,
        // 状态标签  未完成/完成
        statusLabel: cc.Label,
        // 进度标签
        progressLabel: cc.Label,
        // 领取按钮
        getBtn: cc.Node,
    },

    onLoad () {},

    init(data, idx, callback) {
        this.data = data;
        this.idx = idx;
        this.callback = callback;

        this.titleLabel.string = data.taskMsg.toString();
        this.goldNumLabel.string = "奖励：" + data.reward.toString() + "金币";

        const allProgress = data.target.toString();
        const currentProgress = data.process.toString();
        this.progressLabel.string = "进度：" + currentProgress + "/" + allProgress;

        this.getBtn.getComponent('HomeSelectBtn').onStatus((parseInt(allProgress) != parseInt(currentProgress) && parseInt(data.isRec) == 0));
    },

    onGetBtnClick(event) {
        const allProgress = this.data.target.toString();
        const currentProgress = this.data.process.toString();

        if (allProgress === currentProgress && parseInt(this.data.isRec) == 0) {
            if (this.callback) {
                this.callback(this.data, this.idx);
            }
        } else {
            console.log("任务还没有完成，不能领取");
        }
    },
});
