cc.Class({
    extends: cc.Component,

    properties: {
        contentScrollView: cc.ScrollView,
        scrollContent: cc.Node,

        rankingItemPrefab: cc.Prefab,
    },

    onLoad() {
        onfire.on("HomeFriendListHandle", this.onGetRankingListHandle.bind(this));

        // 给滑动视图view 添加上拉加载功能操作
        var scrollViewEventHandler = new cc.Component.EventHandler();
        scrollViewEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        scrollViewEventHandler.component = "HomeRankingFriendView";//这个是代码文件名
        scrollViewEventHandler.handler = "onLoadMoreHandle";// 触发上拉加载回调
        var scroll = this.contentScrollView.getComponent(cc.ScrollView);
        scroll.scrollEvents.push(scrollViewEventHandler);
    },

    onCreateItem(rankingList) {

        this.scrollContent.removeAllChildren();
        for (let i = 0; i < rankingList.length; i++) {
            const itemData = rankingList[i];
            let item = cc.instantiate(this.rankingItemPrefab);
            this.scrollContent.addChild(item);

            let self = this;
            item.getComponent('HomeRankingListItem').init(itemData, i, (data, idx) => {
                self.callback(data);
            });
        }
    },

    /**
     * 
     * @param {*} isShow 是否显示好友榜单
     * @param {*} callback 是否显示好友榜单
     */
    onShowView(isShow, callback) {
        this.node.active = isShow;
        this.callback = callback;

        if (isShow) {
            this.page = 0;
            this.rankingList = [];
            this.onGetRankingListRequest()
        }
    },

    /************************  本类发送接口相关  ************************/
    onGetRankingListRequest() {
        var params = {
            "page": (this.page ? this.page : 0)
        };
        cc.scn.socket.send(10702, params);
    },

    /************************  本类接口回调相关  ************************/
    onGetRankingListHandle(data) {
        if (this.node.active == false) return;
        if (!data || data.friendList.length == 0) return;

        if (this.page == 0) {
            this.rankingList = data.friendList;
        } else {
            this.rankingList = this.rankingList.concat(data.friendList);
        }
        this.page += 1;
        this.onCreateItem(this.rankingList);
    },

    /**
     * 滑动视图 ScrollView 的上拉加载
     */
    onLoadMoreHandle(scrollview, eventType) {
        if (eventType === cc.ScrollView.EventType.BOUNCE_BOTTOM) {
            this.onGetRankingListRequest();
        } else if (eventType === cc.ScrollView.EventType.BOUNCE_TOP) {
            this.page = 0;
            this.onGetRankingListRequest();
        }
    },
});
