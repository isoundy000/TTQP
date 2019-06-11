cc.Class({
    extends: cc.Component,

    properties: {

        scrollView: cc.ScrollView,
        scrollContent: cc.Node,

        itemPrefab: cc.Prefab,
    },

    onLoad() { },

    onCreateItem() {
        if (!this.bankDataList) return;

        this.scrollContent.removeAllChildren();
        for (let i = 0; i < this.bankDataList.length; i++) {
            let itemDic = this.bankDataList[i];

            let item = cc.instantiate(this.itemPrefab);
            let self = this;
            item.getComponent('HomeSetTixianBankItem').init(
                itemDic,
                (itemData) => {
                    self.node.active = false;
                    if (self.callback) {
                        self.callback(itemData);
                    }
                });
            this.scrollContent.addChild(item);
        }
        this.scrollView.scrollToTop(0.000001);  
    },

    init(isShow, bankDataList, callback) {
        this.node.active = isShow;
        this.bankDataList = bankDataList;
        this.callback = callback;

        this.onCreateItem();
    },

    onCloseView(event) {
        this.node.active = false;
    },
});
