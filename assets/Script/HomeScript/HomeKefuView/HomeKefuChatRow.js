cc.Class({
    extends: cc.Component,

    properties: {
        leftBgView: cc.Node,
        leftContentBgView: cc.Node,
        leftContentLabel: cc.Label,
        leftTimeLabel: cc.Label,

        rightBgView: cc.Node,
        rightContentBgView: cc.Node,
        rightContentLabel: cc.Label,
        rightTimeLabel: cc.Label,

        calculateSizeLabel: cc.Node,
    },

    onLoad () {
        //
    },

    init(data) {

        this.rightBgView.active = data.isMe == "1";
        this.leftBgView.active = !this.rightBgView.active;
        if (data.isMe == "1") {
            this.rightContentLabel.string = data.content.toString();
            this.rightTimeLabel.string = data.time.toString();

            this.calculateSizeLabel.getComponent(cc.Label).string = this.rightContentLabel.string;
            let size = this.calculateSizeLabel.getContentSize();
            this.rightContentBgView.width = (size.width + 50) > 750 ? 750 : (size.width + 50);
        } else {
            this.leftContentLabel.string = data.content.toString();
            this.leftTimeLabel.string = data.time.toString();

            this.calculateSizeLabel.getComponent(cc.Label).string = this.leftContentLabel.string;
            let size = this.calculateSizeLabel.getContentSize();
            this.leftContentBgView.width = (size.width + 50) > 750 ? 750 : (size.width + 50);
        }

        
    },
    
});
