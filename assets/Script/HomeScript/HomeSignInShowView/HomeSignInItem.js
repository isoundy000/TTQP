cc.Class({
    extends: cc.Component,

    properties: {
        /// 未签到标记图标
        noSignInIcon: cc.Node,
        /// 已签到标记图标
        signInIcon: cc.Node,
    },

    onLoad() {

    },

    init(signInData) {

        var signInStatus = parseInt(signInData.status);
        this.signInIcon.active = signInStatus == 2;
        this.noSignInIcon.active = !this.signInIcon.active;
    },
});
