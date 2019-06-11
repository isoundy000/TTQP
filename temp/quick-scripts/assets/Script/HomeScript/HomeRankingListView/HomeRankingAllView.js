(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeRankingListView/HomeRankingAllView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '18ba1561JhF5qUq3HpyJ0+F', 'HomeRankingAllView', __filename);
// Script/HomeScript/HomeRankingListView/HomeRankingAllView.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        contentScrollView: cc.ScrollView,
        scrollContent: cc.Node,

        rankingItemPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        onfire.on("HomeAllMoneyRankingHanle", this.onGetAllMoneyRankingHandle.bind(this));

        // 给滑动视图view 添加上拉加载功能操作
        var scrollViewEventHandler = new cc.Component.EventHandler();
        scrollViewEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        scrollViewEventHandler.component = "HomeRankingAllView"; //这个是代码文件名
        scrollViewEventHandler.handler = "onLoadMoreHandle"; // 触发上拉加载回调
        var scroll = this.contentScrollView.getComponent(cc.ScrollView);
        scroll.scrollEvents.push(scrollViewEventHandler);
    },
    onCreateItem: function onCreateItem(rankingList) {
        var _this = this;

        this.scrollContent.removeAllChildren();

        var _loop = function _loop(i) {
            var itemData = rankingList[i];
            var item = cc.instantiate(_this.rankingItemPrefab);
            _this.scrollContent.addChild(item);

            var self = _this;
            item.getComponent('HomeRankingListItem').init(itemData, i, function (data, idx) {
                self.callback(data);
            });
        };

        for (var i = 0; i < rankingList.length; i++) {
            _loop(i);
        }
    },


    /**
     * 
     * @param {*} isShow 是否显示好友榜单
     * @param {*} callback 是否显示好友榜单
     */
    onShowView: function onShowView(isShow, callback) {
        this.node.active = isShow;
        this.callback = callback;

        if (isShow) {
            this.page = 0;
            this.rankingList = [];
            this.onGetRankingListRequest();
        }
    },


    /************************  本类发送接口相关  ************************/
    onGetRankingListRequest: function onGetRankingListRequest() {
        var params = {
            "page": this.page ? this.page : 0
        };
        cc.scn.socket.send(11001, params);
    },


    /************************  本类接口回调相关  ************************/
    onGetAllMoneyRankingHandle: function onGetAllMoneyRankingHandle(data) {
        if (this.node.active == false) return;
        if (!data || data.rankList.length == 0) return;

        if (this.page == 0) {
            this.rankingList = data.rankList;
        } else {
            this.rankingList = this.rankingList.concat(data.rankList);
        }
        this.page += 1;
        this.onCreateItem(this.rankingList);
    },


    /**
     * 滑动视图 ScrollView 的上拉加载
     */
    onLoadMoreHandle: function onLoadMoreHandle(scrollview, eventType) {
        if (eventType === cc.ScrollView.EventType.BOUNCE_BOTTOM) {
            this.onGetRankingListRequest();
        } else if (eventType === cc.ScrollView.EventType.BOUNCE_TOP) {
            this.page = 0;
            this.onGetRankingListRequest();
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=HomeRankingAllView.js.map
        