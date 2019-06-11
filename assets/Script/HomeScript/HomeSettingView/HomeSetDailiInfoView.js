// 发接口对象
var socket = require("websocketScript");

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,
        // ID标签
        idLabel: cc.Label,
        // 邀请人 标签
        yqUserNumLabel: cc.Label,
        // 在线人数 标签
        inLineUserNumLabel: cc.Label,
        // 游戏局数 标签
        gameCountLabel: cc.Label,
        // 红包 标签
        redBagLabel: cc.Label,
        // 金牌玩家 标签
        goldUserLabel: cc.Label,
        // 银牌玩家 标签
        yinUserLabel: cc.Label,


        // 子级弹窗
        // 用户排行
        userPaiHangView: cc.Node,
        // 提现排行
        tixianView: cc.Node,


    },

    onLoad() {
        onfire.on("HomeDailiInfoHandle", this.onGetDailiInfo.bind(this));
    },

    configUI() {
        // ID标签
        this.idLabel.string = this.dailiInfo.ID.toString();
        // 邀请人 标签
        this.yqUserNumLabel.string = this.dailiInfo.inviteNum.toString();
        // 在线人数 标签
        this.inLineUserNumLabel.string = this.dailiInfo.onlineNum.toString();
        // 游戏局数 标签
        this.gameCountLabel.string = this.dailiInfo.totalTax.toString();
        // 红包 标签
        this.redBagLabel.string = this.dailiInfo.redPacket.toString();
        // 金牌玩家 标签
        this.goldUserLabel.string = this.dailiInfo.goldMedal.toString();
        // 银牌玩家 标签
        this.yinUserLabel.string = this.dailiInfo.silverMedal.toString();
    },

    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow       
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView(isShow, callback) {
        this.callback = callback;
        this.contentView.setScale(0.8, 0.8);

        if (isShow) {
            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.contentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));

            this.onGetDailiInfoRequest();
        } else {
            var scaleAmin = cc.scaleTo(0, 0.8, 0.8);
            this.contentView.runAction(scaleAmin);
        }
        this.node.active = isShow;
    },

    /*********************** 发送接口 ***********************/
    onGetDailiInfoRequest() {
        cc.scn.socket.send(10901);
    },

    /*********************** 接口回调 ***********************/
    onGetDailiInfo(data) {
        //
        console.log(data);
        if (data) {
            this.dailiInfo = data;
            this.configUI();
        }
    },

    onMenusBtnClick(event, customData) {
        let itemIdx = parseInt(customData);
        switch (itemIdx) {
            case 0: {   // 玩家排行
                this.userPaiHangView.getComponent('HomeSetUserPaiHangView').onShowView(true, () => {
                    //
                });
            }
                break;
            case 1: {   // 提现
                this.tixianView.getComponent('HomeSetTixianView').onShowView(true, () => {
                    //
                });

            }
                break;

            default:
                break;
        }
    },

    /**
     * 点击关闭按钮
     * 或者判断是否是点击了灰色背景View，如果是点击灰色背景View，让弹窗消失
     */
    onCloseBtnClick(event) {
        this.onShowView(false, this.callback);
    },
});
