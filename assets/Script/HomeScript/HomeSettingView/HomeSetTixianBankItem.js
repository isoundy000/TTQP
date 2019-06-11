cc.Class({
    extends: cc.Component,

    properties: {
        bankTitleLabel: cc.Label,
    },

    onLoad () {
        //init
    },

    init(itemData, callback) {
        this.callback = callback;
        this.itemData = itemData;

        this.bankTitleLabel.string = itemData.title.toString();
    },

    onCheckBoxBtnClick(event) {
        //
        if (parseInt(this.itemData.isSelect) == 1) return;
        
        this.init(this.itemData, this.callback);
        setTimeout(() => {
            if (this.callback) {
                this.callback(this.itemData, this.callback);
            }
        }, 0.25);
    },
});
