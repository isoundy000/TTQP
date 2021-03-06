cc.Class({
    extends: cc.Component,

    properties: {
        // 左边邮件是否打开的图标
        emailIconBtn: cc.Node,
        // 是否有附件的图标
        giftBoxIcon: cc.Node,
        // 昵称标签
        nameLabel: cc.Label,
        // 内容标签
        contentLabel: cc.Label,
        // 右边是否已经查看邮件的按钮
        goDetailBtn: cc.Node,
        // 右边是否查看过邮件的按钮内的文字按钮
        // statusTitleBtn: cc.Node,

        // 红点
        redPointIcon: cc.Node,
    },

    onLoad() {

    },

    /**
     * 配置本类UI
     */
    init(itemData, forIdx, onGoDetailHandle) {
        if (!itemData) return;
        this.itemData = itemData;
        this.onGoDetailHandle = onGoDetailHandle;

        this.nameLabel.string = itemData.nickname;
        
        this.contentLabel.string = this.onSubString(itemData.content);

        this.emailIconBtn.getComponent('HomeSelectBtn').onStatus(itemData.isRead == "1");
        this.redPointIcon.active = itemData.isRead == "0";

        this.giftBoxIcon.active = itemData.gold.toString().length > 0;

        this.goDetailBtn.getComponent('HomeSelectImgTitleBtn').onStatus(itemData.isRead == "1");
        this.goDetailBtn.tag = forIdx;

        // this.statusTitleBtn.getComponent('HomeSelectBtn').onStatus(itemData.isRead == "1");
    },

    // 判断字符串是否超过20，超过后打点
    onSubString(string, fontSize, maxWidth) {

        let newString = "";
        for (let i = 0; i < string.length; i++) {
            if (i < 20) {
                newString += string[i];
            } else {
                newString += "...";
                break;
            }
        }
        return newString;
    },

    /**
     * 设置点击查看按钮的tag值
     */

    /********************************  监听本类事件 ********************************/
    onGoDetailBtnClick: function (event) {
        var tag = event.currentTarget.tag;

        if (this.onGoDetailHandle) {
            this.itemData.isOpen = "1";
            this.redPointIcon.active = false;
            this.onGoDetailHandle(this.itemData, tag);
        }
    },
});
