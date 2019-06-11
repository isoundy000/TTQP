// let guanggaos = [
//     {"sender": "测试测试测试测试1", "msg": "大师傅的按斯蒂芬1"},
//     {"sender": "测试测试2", "msg": "大师傅的按时发大水发斯蒂芬2"},
//     {"sender": "测试3", "msg": "大师傅的水发斯蒂芬3"},
//     {"sender": "测试测试测试测试测试4", "msg": "大师傅的按时发大水发斯蒂芬4"},
//     {"sender": "测试5", "msg": "大师傅的按时发大水发时发大水发斯蒂时发大水发斯蒂斯蒂芬5"},
//     {"sender": "测试6", "msg": "大师傅的按时发大水发斯蒂芬6"},
//     {"sender": "测试测试7", "msg": "大师傅的按时发大水发斯蒂时发大水发斯蒂芬7"},
//     {"sender": "测试8", "msg": "大师傅的按时发大水发斯蒂芬8"},
//     {"sender": "测试测试9", "msg": "大师傅的按时发大水时发大水发斯蒂时发大水发斯蒂发斯蒂芬9"},
//     {"sender": "系统公告测试10", "msg": "大师傅的按时发大水发斯蒂芬10"},
// ];

cc.Class({
    extends: cc.Component,

    properties: {
        radioLabelPrefab: cc.Prefab,
    },

    onLoad: function () {

        this.broadcastList = [];
        // this.broadcastList = guanggaos;

        // 初始化对象池
        HPool.initObjPool(this, 'HomeRadioPool')
        
        // 获取任务列表
        onfire.on("HomeGetBroadcastHandle",this.onGetBroadcastData.bind(this));

        this.onCreateItem();
    },

    /**
     * 创建广告标签
     */
    onCreateItem() {
        if (this.broadcastList.length > 0) {
            let windowSize = cc.view.getVisibleSize();
            let parentNodeW = windowSize.width - 150;

            let newNode = HPool.onCreateItem(this['HomeRadioPool'], this.radioLabelPrefab, this.node);
            // newNode.getComponent(cc.Label).string = this.broadcastList[0].sender.toString() + ':' + this.broadcastList[0].msg.toString();
            newNode.setPosition(cc.p(parentNodeW, -100));
            newNode.getComponent('HomeGuangBoItem').init(this.broadcastList[0]);
            this.broadcastList.splice(0, 1);
        }
    },

    onGetBroadcastData(data) {
        if (data) {
            this.broadcastList.push(data);
            if (this.broadcastList.length == 1) {
                this.onCreateItem();
            }
        }
    },

    onNextGuanggao() {
        this.onCreateItem();
    },

    onRecyclingNode(node) {
        HPool.onRecyclingNodeToPool(this, 'HomeRadioPool', node);
    },
});