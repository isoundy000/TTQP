
cc.Class({
    extends: cc.Component,

    properties: {
        // 走势图 item
        scrollViewItem: cc.Prefab,
        // 
        scrollView1: cc.ScrollView,
        // 
        scrollView1Content: cc.Node,
        // 
        scrollView2: cc.ScrollView,
        // 
        scrollView2Content: cc.Node,
        // 第几局
        curGameNum: cc.Label,
        // A队的赢数量
        winANum: cc.Label,
        // B队的赢数量
        winBNum: cc.Label,
        // A对子的赢数量
        winPairANum: cc.Label,
        // B对方的赢数量
        winPairBNum: cc.Label,
        // 和的赢数量
        winDrawNum: cc.Label,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.node.on(cc.Node.EventType.TOUCH_END, function(event) { this.node.active = false; }, this);
    },
    initTrend: function(data) {
        this.curGameNum.string = data.curGameNum;
        this.winANum.string = data.winANum;
        this.winBNum.string = data.winBNum;
        this.winPairANum.string = data.winPairANum;
        this.winPairBNum.string = data.winPairBNum;
        this.winDrawNum.string = data.winDrawNum;

        // 走势1
        var list = data.winLoseList;
        
        for (let index = 0; index < list.length; index++) {
            var item = cc.instantiate(this.scrollViewItem);
            this.scrollView1Content.addChild(item);
            item.getComponent('trendItemScript').createItemSpriteFrame(list[index]);
        }

        // 走势2
        var test1 = list;
        var test2 = [];
        // 这里先将数据分组
        for (let index = 0; index < test1.length; index++) {
            if (test2.length === 0) {
                test2[0] = [];
                test2[0].push(test1[0]);
            }else {
                var l = test2.length;
                if (test2[l - 1].indexOf(test1[index]) != -1) {
                    test2[l - 1].push(test1[index]);
                    
                }else {
                    test2[l] = [];
                    test2[l].push(test1[index]);
                }
                
            }
        }
        // 这里将分组数据在组合，小于5补满5，大于5填充
        for (let index = 0; index < test2.length; index++) {
            if (test2[index].length <= 5) {
               test2[index].length = 5;
                
            }else {
                var tmp = test2[index].length - 5;
                
                var tmpArr = test2[index];
                for (let idx = 0; idx < tmp; idx++) {
                    tmpArr.splice((idx + 1)*5,0,0,0,0,0);
                    
                }
            }
        }
        for (let index = 0; index < test2.length; index++) {
            for (let i = 0; i < test2[index].length; i++) {
                var item = cc.instantiate(this.scrollViewItem);
                this.scrollView2Content.addChild(item);
                item.getComponent('trendItemScript').createItemSpriteFrame(test2[index][i]);
            }
            
        }
    },
     /**
     * 关闭弹窗
     */
    onCloseTrendBox: function() {
        this.node.active = false;
    }

});
