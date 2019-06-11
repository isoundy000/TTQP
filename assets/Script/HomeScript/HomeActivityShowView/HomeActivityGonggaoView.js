cc.Class({
    extends: cc.Component,

    properties: {
        titleScrollView: cc.ScrollView,
        titleSrollContent: cc.Node,
        titlePrefab: cc.Prefab,

        imageNode: cc.Node,
        detailNode: cc.Node,
    },

    onLoad() {

        // 获取公告列表
        onfire.on("HomeNoticeListHandle",this.onGetNoticeData.bind(this));
    },

    init() {

        this.titleSrollContent.removeAllChildren();
        for (let i = 0; i < this.noticeList.length; i++) {
            const notice = this.noticeList[i];
            let item = cc.instantiate(this.titlePrefab);
            item.tag = i;
            this.titleSrollContent.addChild(item);
            item.getComponent('HomeActivityGonggaoTitleBtn').init(notice);
            item.on('click', this.onClickTitleItem, this);
        }
        if (this.noticeList && this.noticeList.length > 0) {
            this.onClickTitleItem(null);
        }
    },

    onShowView(isShow) {
        this.node.active = isShow;
        if (isShow) {
            // 公告列表
            this.noticeList = [];
            
            this.onGetNoticeListRequest();
        }
    },

    /****************************************  本类接口相关  ****************************************/
    onGetNoticeListRequest() {
        cc.scn.socket.send(10805);
    },
    /****************************************  本类接口回调相关  ****************************************/
    onGetNoticeData(data) {
        //
        this.noticeList = data.noticeList;
        this.init();
    },

    onClickTitleItem(event) {

        let tag = event ? event.currentTarget.tag : 0;

        for (let i = 0; i < this.titleSrollContent.children.length; i++) {
            const item = this.titleSrollContent.children[i];
            item.getComponent('HomeSelectBtn').onStatus(i == tag);
        }

        let notice = this.noticeList[tag];

        let content = notice.content ? notice.content.toString() : "";
        this.detailNode.active = content.length > 0;
        this.detailNode.getComponent(cc.Label).string = content;

        let picture = notice.picture ? notice.picture.toString() : "";
        this.imageNode.active = picture.length > 0;
        if (picture.length) {
            let self = this;
            cc.loader.load(picture, function (err, texture) {
                self.imageNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    },
});
