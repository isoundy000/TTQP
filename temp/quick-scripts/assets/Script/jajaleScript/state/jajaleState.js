(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/jajaleScript/state/jajaleState.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0e4d0eH/wVKC4nxJEfG+603', 'jajaleState', __filename);
// Script/jajaleScript/state/jajaleState.js

'use strict';

var jajaleStateMachine = require('state-machine');

/**
 * 状态机
 * 等待准备 > 下注 > 发牌 > A开牌/B开牌 > 结算
 */

var jajaleState1 = {

    fsm: {},

    connect: function connect() {
        var defaultState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ready';


        this.fsm = new jajaleStateMachine({

            // init: defaultState,

            transitions: [
            // { name: 'startHandle', from: 'none', to: 'ready'},
            // { name: 'clearingHandle', from: 'clearing', to: 'ready'},

            { name: 'readyHandle', from: 'ready', to: 'bet' }, { name: 'betHandle', from: 'bet', to: 'deal' }, { name: 'dealAHandle', from: 'deal', to: 'openCardA' }, { name: 'dealBHandle', from: 'deal', to: 'openCardB' }, { name: 'openAHandle', from: 'openCardA', to: 'openCardB' }, { name: 'openBHandle', from: 'openCardB', to: 'openCardA' }, { name: 'openCardHandle', from: 'openCardA', to: 'clearing' }, { name: 'openCardHandle', from: 'openCardB', to: 'clearing' }, { name: 'clearingHandle', from: 'clearing', to: 'ready' }],

            methods: {

                // onBeforeReadyHandle: function(lifecycle) {
                //   console.log("BEFORE: " + lifecycle.transition);
                // },

                // onLeaveReady: function(lifecycle) {
                //   console.log("LEAVE: " + lifecycle.from);
                // },

                // onEnterReady: function(lifecycle) {
                //   console.log("ENTER: " + lifecycle.to, animationContainer);
                // },

                // onAfterReadyHandle: function(lifecycle) {
                //   console.log("AFTER: " + lifecycle.transition);
                // },

                // onReadyHandle: function(lifecycle) {
                //   console.log("DURING: " + lifecycle.transition + " (from " + lifecycle.from + " to " + lifecycle.to + ")");
                // },

                //   onBeforeReadyHandle: function(lifecycle) {
                //     onfire.fire('jajaleReadyStateHandle');
                //   },
                //   onBeforeBetHandle: function(lifecycle) {
                //     onfire.fire('jajaleBetStateHandle');
                //   },

            }
        });

        return this;
    }

};

module.exports = jajaleState1;

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
        //# sourceMappingURL=jajaleState.js.map
        