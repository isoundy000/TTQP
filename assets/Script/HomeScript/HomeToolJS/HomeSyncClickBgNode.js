cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        var self = this;
        this.node.on("touchstart", function(event) {
            event.stopPropagation();
            if (self.callback) {
                self.callback();
            }
        });
    },

    onClickLightGrayBg(callback) {
        this.callback = callback;
    },
});
