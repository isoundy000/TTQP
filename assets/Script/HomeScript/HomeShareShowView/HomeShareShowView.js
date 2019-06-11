cc.Class({
    extends: cc.Component,

    properties: {
        alertView: cc.Node,
        alertContentView: cc.Node,
        moneyLabel:cc.Label,
        yingliLabel: cc.Label,

    },

    onLoad() {
        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(() => {
            self.onShowView(false);
        });
    },

    onShowView(isShow) {
        //
        this.node.active = isShow;
    },
    
    onShowAlertView(isShow) {
        this.alertView.active = isShow;
        if (isShow) {
            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.alertContentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));
        } else {
            var scaleAmin = cc.scaleTo(0, 0.8, 0.8);
            this.alertContentView.runAction(scaleAmin);
        }
    },

    onMenusBtnClick(event, customData) {
        let idx = parseInt(customData);
        switch (idx) {
            case 0: {
                //
                console.log("分享好友");
            }
                break;
            case 1: {
                //
                console.log("分享朋友圈");
            }
                break;

            default:
                break;
        }
        this.onShowAlertView(true);
    },

    onCloseAlertView(event) {
        //
        this.onShowAlertView(false);
    },

});
