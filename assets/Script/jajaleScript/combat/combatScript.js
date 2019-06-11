
var jajaleState = require("jajaleState");

var StateEnum = cc.Enum({
    READY: 1, // 等待准备
    BET: 2, // 下注
    DEAL: 3, // 发牌
    DEAL_END: 4, // A开牌
    TWIST: 5, // B开牌
    CLEARING: 6, // 结算
})

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:
/**
 * 状态机
 * 等待准备 > 下注 > 发牌 > A开牌/B开牌 > 结算
 */
    onLoad () {

        // console.log(32,cc.jajale.enterRoomData);

        // this.statusArr = [];

        // cc.jajale.state = jajaleState.connect('clearing');
   
        // onfire.on('jajaleGameStateMessage',this.jajaleGameStateMessage.bind(this));

        // if (cc.jajale.enterRoomData.status ===1) {
        //     // 等待
        //     cc.jajale.state = jajaleState.connect();
        // }
        // else if (cc.jajale.enterRoomData.status ===2) {
        //     // 下注
        //     cc.jajale.state = jajaleState.connect('下注');
        // }
        // else if (cc.jajale.enterRoomData.status ===3) {
        //     // 发牌
        //     cc.jajale.state = jajaleState.connect('发牌');
        // }
        // else if (cc.jajale.enterRoomData.status ===4) {
        //     // A开牌
        //     cc.jajale.state = jajaleState.connect('A开牌');
        // }
        // else if (cc.jajale.enterRoomData.status ===5) {
        //     // B开牌
        //     cc.jajale.state = jajaleState.connect('B开牌');
        // }
        // else if (cc.jajale.enterRoomData.status ===6) {
        //     // 结算
        //     cc.jajale.state = jajaleState.connect('结算');
        // }
        

    },
    
    jajaleGameStateMessage: function(data) {
        console.log(data.status, '游戏状态发生改变22');
        
        switch (data.status) {
            case 1:
                // 等待准备
                // cc.jajale.state.fsm.clearingHandle();
                onfire.fire('jajaleReadyStateHandle');
                break;
            case 2:
                // 下注
                // cc.jajale.state.fsm.readyHandle();
                onfire.fire('jajaleBetStateHandle');
                break;
            case 3:
                // 发牌
                // cc.jajale.state.fsm.betHandle();
                onfire.fire('jajaleDealStateHandle');
                break;
            case 4:
                // A开牌
                // this.statusArr.push(4);
                // // this.statusArr.indexOf(5) > -1  是否包含的判断
                // if (this.statusArr.indexOf(5) > -1) {
                //     // 先执行了5 B开牌了
                //     cc.jajale.state.fsm.dealBHandle();
                // }else {
                //     cc.jajale.state.fsm.dealAHandle();
                // }
                onfire.fire('jajaleAOpenCardStateHandle');
                break;
            case 5:
                // B开牌
                // this.statusArr.push(5);
                // if (this.statusArr.indexOf(4) > -1) {
                //     // 先执行了4 A开牌了
                //     cc.jajale.state.fsm.openAHandle();
                // }else {
                //     cc.jajale.state.fsm.openBHandle();
                // }
                onfire.fire('jajaleBOpenCardStateHandle');
                break;
            case 6:
                // 结算
                // this.statusArr = [];
                // cc.jajale.state.fsm.openCardHandle();
                onfire.fire('jajaleClearStateHandle');
                break;
        
            default:
                break;
        }
    }, 
});
