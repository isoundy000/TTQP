cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        scrollContent: cc.Node,
        itemPrefab: cc.Prefab,

        // 分享任务 切换按钮
        shareTitleBtn: cc.Node,
        // 充值任务 切换按钮
        chongzhiTitleBtn: cc.Node,
    },

    onLoad () {
        // 获取任务列表
        onfire.on("HomeTaskDetailHandle",this.onGetTaskData.bind(this));
        // 领取任务奖励
        onfire.on("HomeTaskGetDewardHandle",this.onGetTaskGetDeward.bind(this));
    },

    onShowView(isShow) {
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

    onCreateItem() {

        this.scrollContent.removeAllChildren();

        for (let i = 0; i < this.taskList.length; i++) {
            const taskData = this.taskList[i];

            let item = cc.instantiate(this.itemPrefab);
            this.scrollContent.addChild(item);

            let self = this;
            item.getComponent('HomeAcitivityTaskItem').init(taskData, i, (taskDic, idx)=>{
                self.getTaskIdx = idx;
                self.onGetTaskGetDewardRequest(taskDic);
            });
        }
    },
    
    /****************************************  本类接口相关  ****************************************/
    // 获取任务列表
    onGetTaskDataRequest() {
        cc.scn.socket.send(10803, {
            taskNum: this.taskIdx,
        });

        this.shareTitleBtn.getComponent('HomeSelectImgTitleBtn').onStatus(this.taskIdx == 0);
        this.chongzhiTitleBtn.getComponent('HomeSelectImgTitleBtn').onStatus(this.taskIdx == 1);
    },
    // 领取任务奖励
    onGetTaskGetDewardRequest(taskDic) {
        cc.scn.socket.send(10804, {
            id: parseInt(taskDic.id),
            species: parseInt(taskDic.species)
        });
    },

    /****************************************  本类接口回调相关  ****************************************/
    // 获取任务列表
    onGetTaskData(data) {
        this.taskList = data;
        this.onCreateItem();
    },
    // 领取任务奖励
    onGetTaskGetDeward(data) {
        this.taskList.splice(this.getTaskIdx, 1);
        this.onCreateItem();
    },

    onMenusClick (event, customData) {
        let idx = parseInt(customData);

        this.taskIdx = idx;

        this.onGetTaskDataRequest();
    },
});
