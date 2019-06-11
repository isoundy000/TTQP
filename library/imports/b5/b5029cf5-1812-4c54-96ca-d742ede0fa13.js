"use strict";
cc._RF.push(module, 'b5029z1GBJMVJbK10Lt4PoT', 'HomeActivityTaskView');
// Script/HomeScript/HomeActivityShowView/HomeActivityTaskView.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        scrollContent: cc.Node,
        itemPrefab: cc.Prefab,

        // 分享任务 切换按钮
        shareTitleBtn: cc.Node,
        // 充值任务 切换按钮
        chongzhiTitleBtn: cc.Node
    },

    onLoad: function onLoad() {
        // 获取任务列表
        onfire.on("HomeTaskDetailHandle", this.onGetTaskData.bind(this));
        // 领取任务奖励
        onfire.on("HomeTaskGetDewardHandle", this.onGetTaskGetDeward.bind(this));
    },
    onShowView: function onShowView(isShow) {
        this.node.active = isShow;
        if (isShow) {

            // 任务类型 0 == 分享任务；1 == 充值任务  默认分享任务
            this.taskIdx = 0;
            // 任务数据列表
            this.taskList = [];
            // 获取完成的任务索引
            this.getTaskIdx = 0;

            this.shareTitleBtn.getComponent('HomeSelectImgTitleBtn').onStatus(this.taskIdx == 0);
            this.chongzhiTitleBtn.getComponent('HomeSelectImgTitleBtn').onStatus(this.taskIdx == 1);

            // 获取任务列表
            this.onGetTaskDataRequest();
        }
    },
    onCreateItem: function onCreateItem() {
        var _this = this;

        this.scrollContent.removeAllChildren();

        var _loop = function _loop(i) {
            var taskData = _this.taskList[i];

            var item = cc.instantiate(_this.itemPrefab);
            _this.scrollContent.addChild(item);

            var self = _this;
            item.getComponent('HomeAcitivityTaskItem').init(taskData, i, function (taskDic, idx) {
                self.getTaskIdx = idx;
                self.onGetTaskGetDewardRequest(taskDic);
            });
        };

        for (var i = 0; i < this.taskList.length; i++) {
            _loop(i);
        }
    },


    /****************************************  本类接口相关  ****************************************/
    // 获取任务列表
    onGetTaskDataRequest: function onGetTaskDataRequest() {
        cc.scn.socket.send(10803, {
            taskNum: this.taskIdx
        });

        this.shareTitleBtn.getComponent('HomeSelectImgTitleBtn').onStatus(this.taskIdx == 0);
        this.chongzhiTitleBtn.getComponent('HomeSelectImgTitleBtn').onStatus(this.taskIdx == 1);
    },

    // 领取任务奖励
    onGetTaskGetDewardRequest: function onGetTaskGetDewardRequest(taskDic) {
        cc.scn.socket.send(10804, {
            id: parseInt(taskDic.id),
            species: parseInt(taskDic.species)
        });
    },


    /****************************************  本类接口回调相关  ****************************************/
    // 获取任务列表
    onGetTaskData: function onGetTaskData(data) {
        this.taskList = data;
        this.onCreateItem();
    },

    // 领取任务奖励
    onGetTaskGetDeward: function onGetTaskGetDeward(data) {
        this.taskList.splice(this.getTaskIdx, 1);
        this.onCreateItem();
    },
    onMenusClick: function onMenusClick(event, customData) {
        var idx = parseInt(customData);

        this.taskIdx = idx;

        this.onGetTaskDataRequest();
    }
});

cc._RF.pop();