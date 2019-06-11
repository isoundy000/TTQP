
cc.Class({
    extends: cc.Component,

    properties: {
        idLab: cc.Label,
        nameLab: cc.Label,
        minGoldLab: cc.Label,
        currentNumLab: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    initPYTItem: function(data,btnFunc) {
        this.idLab.string = data.roomId;
        this.nameLab.string = data.nickname;
        this.minGoldLab.string = ttqp_global.unitConversion(data.minGold);
        this.currentNumLab.string = data.curOnline;

        this.callback = btnFunc;
        this.roomId = data.roomId;
    },

    onEnter: function() {
        if (this.callback) {
            this.callback(this.roomId);
        }
    }

});
