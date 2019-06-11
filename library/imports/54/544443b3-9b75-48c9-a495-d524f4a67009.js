"use strict";
cc._RF.push(module, '54444Ozm3VIyaSV1ST0pnAJ', 'HomeNodePool');
// Script/HomeScript/HomeToolJS/HomeNodePool.js

"use strict";

window.HPool = {

    /**
     * 初始化对象池
     * @param {需要创建节点池的类} obj 
     * @param {节点池的名称，注意，要唯一性}} poolName 
     */
    initObjPool: function initObjPool(obj, poolName) {
        obj[poolName] = new cc.NodePool();
    },


    /**
     * 创建控件
     * @param {*} pool 当前类的释放吃
     * @param {*} prefab 要创建的控件
     * @param {*} nodeParent 父节点
     */
    onCreateItem: function onCreateItem(pool, prefab, nodeParent) {
        var newNode = null;
        if (pool.size() > 0) {
            newNode = pool.get();
        } else {
            newNode = cc.instantiate(prefab);
        }
        nodeParent.addChild(newNode);
        return newNode;
    },


    /**
     * 回收节点
     * @param {*} obj 当前类的对象
     * @param {*} poolName 当前类的节点名称
     * @param {*} node 要回收的节点
     */
    onRecyclingNodeToPool: function onRecyclingNodeToPool(obj, poolName, node) {
        obj[poolName].put(node);
    },


    /**
     * 清空节点池
     * @param {*} obj 当前类的对象
     * @param {*} poolName 当前类的节点名称
     * @param {*} node 要回收的节点
     */
    onClearPool: function onClearPool(obj, poolName) {
        obj[poolName].clear();
    }
};

cc._RF.pop();