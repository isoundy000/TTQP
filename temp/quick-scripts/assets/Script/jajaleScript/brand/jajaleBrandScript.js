(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/jajaleScript/brand/jajaleBrandScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bdffdtkpLJJhozqRYt3z9RI', 'jajaleBrandScript', __filename);
// Script/jajaleScript/brand/jajaleBrandScript.js

'use strict';

var nums = {
    'black': ['UI_KP_bA', 'UI_KP_b2', 'UI_KP_b3', 'UI_KP_b4', 'UI_KP_b5', 'UI_KP_b6', 'UI_KP_b7', 'UI_KP_b8', 'UI_KP_b9', 'UI_KP_b10', 'UI_KP_bJ', 'UI_KP_bQ', 'UI_KP_bK'],
    'red': ['UI_KP_rA', 'UI_KP_r2', 'UI_KP_r3', 'UI_KP_r4', 'UI_KP_r5', 'UI_KP_r6', 'UI_KP_r7', 'UI_KP_r8', 'UI_KP_r9', 'UI_KP_r10', 'UI_KP_rJ', 'UI_KP_rQ', 'UI_KP_rK']
};

var brandTypes = ['UI_KP_fangk', 'UI_KP_meih', 'UI_KP_hongt', 'UI_KP_heit'];

var brandJQKTpyes = [{ '0': 'UI_KP_fangkJ_1', '1': 'UI_KP_meihJ_1', '2': 'UI_KP_hongtJ_1', '3': 'UI_KP_heitJ_1' }, { '0': 'UI_KP_fangkQ_1', '1': 'UI_KP_meihQ_1', '2': 'UI_KP_hongtQ_1', '3': 'UI_KP_heitQ_1' }, { '0': 'UI_KP_fangkK_1', '1': 'UI_KP_meihK_1', '2': 'UI_KP_hongtK_1', '3': 'UI_KP_heitK_1' }];

cc.Class({
    extends: cc.Component,

    properties: {
        // 牌 数字
        brandNum: cc.Sprite,
        // 牌 花色小
        brandType1: cc.Sprite,
        // 牌 花色大
        brandType2: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        // this.nums = {
        //     'black': ['UI_KP_bA','UI_KP_b2','UI_KP_b3','UI_KP_b4','UI_KP_b5','UI_KP_b6','UI_KP_b7','UI_KP_b8','UI_KP_b9','UI_KP_b10','UI_KP_bJ','UI_KP_bQ','UI_KP_bK'],
        //     'red': ['UI_KP_rA','UI_KP_r2','UI_KP_r3','UI_KP_r4','UI_KP_r5','UI_KP_r6','UI_KP_r7','UI_KP_r8','UI_KP_r9','UI_KP_r10','UI_KP_rJ','UI_KP_rQ','UI_KP_rK']
        // };
        // this.brandTypes = ['UI_KP_heit','UI_KP_hongt','UI_KP_meih','UI_KP_fangk'];
        // this.brandJQKTpyes = [
        //     {J1: 'UI_KP_heitJ_1',J2: 'UI_KP_hongtJ_1',J3: 'UI_KP_meihJ_1',J4: 'UI_KP_fangkJ_1'},
        //     {Q1: 'UI_KP_heitQ_1',Q2: 'UI_KP_hongtQ_1',Q3: 'UI_KP_meihQ_1',Q4: 'UI_KP_fangkQ_1'},
        //     {K1: 'UI_KP_heitK_1',K2: 'UI_KP_hongtK_1',K3: 'UI_KP_meihK_1',K4: 'UI_KP_fangkK_1'},
        // ];
    },

    /**
     * 创建 牌 主要做 spriteFrame
     */
    createBrand: function createBrand(num) {

        var self = this;

        var tmp = num - 1;

        var n = parseInt(tmp / 4);
        var m = tmp % 4;
        // console.log(n, m,nums);
        var numsKey = m % 2 == 0 ? 'red' : 'black';

        var brandNumIcon = nums[numsKey][n];
        var brandType1Icon = brandTypes[m];
        var brandType2Icon = brandTypes[m];

        if (n > 9) {
            switch (n) {
                case 10:
                    brandType2Icon = brandJQKTpyes[0][m];
                    break;
                case 11:
                    brandType2Icon = brandJQKTpyes[1][m];
                    break;
                case 12:
                    brandType2Icon = brandJQKTpyes[2][m];
                    break;

                default:
                    break;
            }
        }
        // console.log(brandNumIcon,brandType1Icon,brandType2Icon);


        var file = "textures/Global_imgs/brand";
        cc.loader.loadRes(file, cc.SpriteAtlas, function (err, atlas) {

            var frame1 = atlas.getSpriteFrame(brandNumIcon);
            self.brandNum.spriteFrame = frame1;

            var frame2 = atlas.getSpriteFrame(brandType1Icon);
            self.brandType1.spriteFrame = frame2;

            var frame3 = atlas.getSpriteFrame(brandType2Icon);
            self.brandType2.spriteFrame = frame3;
        });
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
        //# sourceMappingURL=jajaleBrandScript.js.map
        