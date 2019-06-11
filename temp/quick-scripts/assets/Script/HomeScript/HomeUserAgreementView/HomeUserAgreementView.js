(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeUserAgreementView/HomeUserAgreementView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '689d1ZriUtON5nWaOklt3vd', 'HomeUserAgreementView', __filename);
// Script/HomeScript/HomeUserAgreementView/HomeUserAgreementView.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件的背景View
        contentView: cc.Node,

        // 滑动视图
        scrollView: cc.ScrollView,
        scrollContent: cc.Node,
        // 协议标签
        contentLabel: cc.Label
    },

    onLoad: function onLoad() {
        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(function () {
            self.onShowView(false);
        });

        //         this.contentLabel.string = `
        // 哎哟不错棋牌网络游戏用户协议

        // 【首部及导言】

        // 欢迎您使用哎哟不错棋牌游戏软件及服务！

        // 为使用哎哟不错棋牌棋牌游戏软件（以下简称“本软件”）及服务，您应当阅读并遵守《哎哟不错棋牌网络游戏用户协议》（以下简称“本协议”），请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示您注意。

        // 除非您已阅读并接受本协议所有条款，否则您无权下载、安装或使用本软件及相关服务。您的下载、安装、使用、获取游戏帐号、登录等行为即视为您已阅读并同意上述协议的约束。
        // 如果您未满18周岁，请在法定监护人的陪同下阅读本协议及其他上述协议，并特别注意未成年人使用条款。

        // 一、【协议的范围】

        // 1.1 【协议适用主体范围】

        // 本协议是您与哎哟不错棋牌之间关于您下载、安装、使用、复制本软件，以及使用哎哟不错棋牌相关服务所订立的协议。

        // 二、【关于本服务】

        // 2.1 【本服务的内容】

        // 本服务内容是指哎哟不错棋牌向用户提供的棋牌类网络游戏（以下简称“哎哟不错棋牌棋牌网络游戏”）软件许可及服务（以下简称“本服务”）。上述“哎哟不错棋牌棋牌网络游戏”，指由哎哟不错棋牌负责运营的棋牌类网络游戏的统称，包括计算机客户端游戏、网页游戏、HTML5游戏（H5游戏）、移动终端游戏、电视端游戏以及其他形式的游戏；哎哟不错棋牌游戏可能以软件形式提供，这种情况下，哎哟不错棋牌游戏还包括该相关软件及相关文档。

        // 2.2 【本服务的形式】

        // 2.2.1 您使用本服务需要下载哎哟不错棋牌棋牌网络游戏的客户端软件，对于这些软件，哎哟不错棋牌给予您一项个人的、不可转让及非排他性的许可。您仅可为访问或使用本服务的目的而使用这些软件及服务。

        // 2.3 【本服务许可的范围】

        // 2.3.1 哎哟不错棋牌给予您一项个人的、不可转让及非排他性的许可，以使用本软件。您可以为非商业目的在单一台终端设备上安装、使用、显示、运行本软件。

        // 2.3.2 您可以为使用本软件及服务的目的复制本软件的一个副本，仅用作备份。备份副本必须包含原软件中含有的所有著作权信息。

        // 2.3.3 本条及本协议其他条款未明示授权的其他一切权利仍由哎哟不错棋牌保留，您在行使这些权利时须另外取得哎哟不错棋牌的书面许可。哎哟不错棋牌如果未行使前述任何权利，并不构成对该权利的放弃。

        // 三、【软件的获取】

        // 3.1 您可以直接从哎哟不错棋牌的网站上获取本软件，也可以从得到哎哟不错棋牌授权的第三方获取。

        // 3.2 如果您从未经哎哟不错棋牌授权的第三方获取本软件或与本软件名称相同的安装程序，哎哟不错棋牌无法保证该软件能够正常使用，并对因此给您造成的损失不予负责。

        // 四、【软件的安装与卸载】

        // 4.1 哎哟不错棋牌可能为不同的终端设备开发了不同的软件版本，您应当根据实际情况选择下载合适的版本进行安装。

        // 4.2 下载安装程序后，您需要按照该程序提示的步骤正确安装。

        // 4.3 为提供更加优质、安全的服务，在本软件安装时哎哟不错棋牌可能推荐您安装其他软件，您可以选择安装或不安装。

        // 4.4 如果您不再需要使用本软件或者需要安装新版软件，可以自行卸载。如果您愿意帮助哎哟不错棋牌改进产品服务，请告知卸载的原因。

        // 五、【软件的更新】

        // 5.1 为了改善用户体验、完善服务内容，哎哟不错棋牌将不断努力开发新的服务，并为您不时提供软件更新（这些更新可能会采取软件替换、修改、功能强化、版本升级等形式）。

        // 5.2 为了保证本软件及服务的安全性和功能的一致性，哎哟不错棋牌有权不经向您特别通知而对软件进行更新，或者对软件的部分功能效果进行改变或限制。

        // 5.3 本软件新版本发布后，旧版本的软件可能无法使用。哎哟不错棋牌不保证旧版本软件继续可用及相应的客户服务，请您随时核对并下载最新版本。

        // 六、【游戏账号】

        // 6.1 您如果需要使用和享受哎哟不错棋牌网络游戏，则您需要将您享有使用权的手机号或微信账号作为游戏账号，并按照《网络游戏管理暂行规定》及文化部《网络游戏服务格式化协议必备条款》等要求，登录实名注册系统并进行实名注册。您对手机号和微信账号的使用行为应符合哎哟不错网络科技公司公布的《哎哟不错棋牌网络游戏用户协议》、《哎哟不错棋牌微信软件许可及服务协议》等规范。

        // 您进行实名注册时，应提供有关您本人真实、合法、准确、有效的身份信息及其他相关信息，且不得以他人身份资料进行实名注册。否则，哎哟不错棋牌有权终止为您提供本服务，并有权对您的游戏账号采取包括但不限于警告、限制或禁止使用游戏帐号全部或部分功能、删除游戏账号及游戏数据、删除相关信息、游戏账号封禁（以下有时简称“封号”）直至注销暂的处理措施（为描述方便，以下有时也将该等处理措施称为“处罚”），因此造成的一切后果由您自行承担。

        // 6.2 您充分理解并同意：哎哟不错棋牌会按照国家相关要求将您的实名注册信息运用于防沉迷系统之中，即哎哟不错棋牌可能会根据您的实名注册信息判断您是否年满18周岁，从而决定是否对您的游戏账号予以防沉迷限制；同时，为保障您使用本服务的合法权益及身心健康，哎哟不错棋牌也会结合不同棋牌游戏的玩法及类型，逐级进行防沉迷限制和提醒，具体标准将由各棋牌游戏单独制定并以合适的方式提示您。

        // 6.3 您充分理解并同意，根据公安部等《关于规范网络游戏经营秩序查禁利用网络游戏赌博的通知》及文化部文化市场司《关于开展棋牌类网络游戏专项核查工作的通知》等规定，哎哟不错棋牌有权对您在使用本服务时每局、每日游戏币、游戏积分或者其他游戏道具的输赢数量进行限制；具体标准将由各棋牌游戏单独制定并以合适的方式提示您。

        // 6.4 您充分理解并同意，若哎哟不错棋牌依照相关业务规则限制、冻结或终止您的QQ账号或微信账号的使用，可能会导致您游戏账号下游戏数据及相关信息被删除，以及相关权益的丧失，该损失由您自行承担，对此哎哟不错棋牌不承担任何责任。

        // 七、【用户个人信息保护】

        // 7.1保护用户个人信息是哎哟不错棋牌的一项基本原则，哎哟不错棋牌将会采取合理的措施保护用户的个人信息。除法律法规规定的情形外，未经用户许可哎哟不错棋牌不会向第三方公开、透露用户个人信息。哎哟不错棋牌对相关信息采用专业加密存储与传输方式，保障用户个人信息的安全。

        // 7.2 您在注册帐号或使用本服务的过程中，可能需要提供一些必要的信息，例如：为向您提供帐号注册服务或进行用户身份识别，需要您填写QQ号码等信息。若国家法律法规或政策有特殊规定的，您需要提供真实的身份信息。若您提供的信息不完整，则无法使用本服务或在使用过程中受到限制。

        // 7.3一般情况下，您可随时浏览、修改自己提交的信息，但出于安全性和身份识别（如号码申诉服务）的考虑，您可能无法修改注册时提供的初始注册信息及其他验证信息。

        // 7.4哎哟不错棋牌将运用各种安全技术和程序建立完善的管理制度来保护您的个人信息，以免遭受未经授权的访问、使用或披露。

        // 7.5未经您的同意，哎哟不错棋牌不会向哎哟不错棋牌以外的任何公司、组织和个人披露您的个人信息，但法律法规另有规定的除外。

        // 7.6哎哟不错棋牌非常重视对未成年人个人信息的保护。若您是18周岁以下的未成年人，在使用哎哟不错棋牌的服务前，应事先取得您家长或法定监护人的书面同意。

        // 八、【用户行为规范】

        // 8.1【信息内容规范】

        // 8.1.1本条所述信息内容是指用户使用本软件及本服务过程中所制作、复制、发布、传播的任何内容，包括但不限于游戏帐号头像、名字、用户说明等注册信息，或文字、语音、图片等发送，以及其他使用游戏帐号或本软件及本服务所产生的内容。

        // 8.1.2 您理解并同意，哎哟不错棋牌棋牌一直致力于为用户提供公平公正、绿色健康、规范有序的网络环境，您不得利用游戏帐号或本软件及本服务制作、复制、发布、传播如下干扰哎哟不错棋牌棋牌网络游戏正常运营，以及侵犯其他用户或第三方合法权益的内容，包括但不限于：

        // 8.1.2.1 发布、传送、传播、储存违反国家法律、危害国家安全统一、社会稳定、公序良俗、社会公德以及赌博、宣扬赌博、侮辱、诽谤、淫秽或含有任何性或性暗示的、暴力的内容；

        // 8.1.2.2 发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；

        // 8.1.2.3 涉及他人隐私、个人信息或资料的；

        // 8.1.2.4 发表、传送、传播骚扰、广告信息及垃圾信息；

        // 8.1.2.5 其他违反法律法规、政策及公序良俗、社会公德或干扰哎哟不错棋牌棋牌网络游戏正常运营和侵犯其他用户或第三方合法权益内容的信息。

        // 8.2【软件使用规范】

        // 除非法律允许或哎哟不错棋牌书面许可，您使用本软件过程中不得从事下列行为：

        // 8.2.1 删除本软件及其副本上关于著作权的信息；

        // 8.2.2 对本软件进行反向工程、反向汇编、反向编译，或者以其他方式尝试发现本软件的源代码；

        // 8.2.3 对哎哟不错棋牌拥有知识产权的内容进行使用、出租、出借、复制、修改、链接、转载、汇编、发表、出版、建立镜像站点等；

        // 8.2.4 对本软件或者本软件运行过程中释放到任何终端内存中的数据、软件运行过程中客户端与服务器端的交互数据，以及本软件运行所必需的系统数据，进行复制、修改、增加、删除、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或非哎哟不错棋牌经授权的第三方工具/服务接入本软件和相关系统；

        // 8.2.5 通过修改或伪造软件运行中的指令、数据，增加、删减、变动软件的功能或运行效果，或者将用于上述用途的软件、方法进行运营或向公众传播，无论这些行为是否为商业目的；

        // 8.2.6 通过非哎哟不错棋牌开发、授权的第三方软件、插件、外挂、系统，登录或使用哎哟不错棋牌软件及服务，或制作、发布、传播上述工具；

        // 8.2.7 自行或者授权他人、第三方软件对本软件及其组件、模块、数据进行干扰；

        // 8.2.8 其他未经哎哟不错棋牌明示授权的行为。

        // 8.3【服务运营规范】

        // 除非法律允许或哎哟不错棋牌书面许可，您使用本服务过程中不得从事下列行为（以下称“违规行为”）：

        // 8.3.1 安装使用会影响本软件平衡的第三方软件；

        // 8.3.2 利用游戏漏洞采用盗刷游戏币、游戏积分或其他游戏道具等方式，谋取利益、破坏游戏的公平秩序；

        // 8.3.3 同一玩家（或同一IP，或同一物理地址）注册或登录多个帐号角色；

        // 8.3.4 在游戏内哄抬物价、直接或变相非法倒卖虚拟货币、游戏币、游戏积分或其他游戏道具；

        // 8.3.5 游戏对局中采取双簧作弊、投注后故意逃跑导致游戏币等输给其他玩家、不合理拖延比赛时间而影响游戏公平性等作弊行为；

        // 8.3.6 基于第8.3.5款约定的游戏对局中作弊行为而被哎哟不错棋牌发现或者哎哟不错棋牌收到他人举报或投诉用户存在线下交易行为（交易渠道包括但不限于QQ转账、微信转账、银行卡汇款或转账）；

        // 8.3.7 在游戏内传播宣扬淫秽、色情、赌博或宣扬赌博、暴力、或者教唆犯罪等信息；或者利用游戏帐号和/或本软件及服务从事任何违法犯罪活动的（包括但不限于赌博、开设赌场）；

        // 8.3.8 提交、发布虚假信息，或冒充、利用他人名义的；

        // 8.3.9 诱导其他用户点击链接页面或分享信息的；

        // 8.3.10 虚构事实、隐瞒真相以误导、欺骗他人的；

        // 8.3.11 侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；

        // 8.3.12 未经哎哟不错棋牌书面许可利用游戏帐号和任何功能，以及第三方运营平台进行推广或互相推广的；

        // 8.3.13 制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的；

        // 8.3.14 其他违反法律法规规定、侵犯其他用户合法权益、干扰产品正常运营或哎哟不错棋牌未明示授权的行为。

        // （备注：上述违规行为将作为哎哟不错棋牌依据第8.5条作出违规处理的重要依据；哎哟不错棋牌有权根据监测到的游戏数据、用户行为等进行独立判断，从而判定是否构成以上违规行为）

        // 8.4 【对自己行为负责】

        // 您充分了解并同意，您必须为自己注册帐号下的一切行为负责，包括您所发表的任何内容以及由此产生的任何后果。您应对本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。哎哟不错棋牌无法且不会对因前述风险而导致的任何损失或损害承担责任。

        // 8.5【违规处理】

        // 8.5.1 如果哎哟不错棋牌发现或者收到他人举报或投诉用户违反本协议约定的，哎哟不错棋牌有权不经通知随时对相关内容进行删除，并视行为情节对违规帐号处以包括但不限于警告，限制或禁止使用全部或部分功能，取消游戏帐号由此获得的相关奖励（比如游戏币、游戏积分、参赛资格或者其他游戏道具），帐号封禁直至注销的处罚，并公告处理结果；情节严重的将移交有关行政管理机关给予行政处罚，或者追究刑事责任；用户应独自承担由此而产生的一切法律责任。

        // 温馨提示：哎哟不错棋牌对于您基于使用本软件及本服务所获得的虚拟货币、游戏币、游戏积分、参赛资格及其他游戏道具等均不提供任何形式的官方回购、直接或变相兑换现金或实物、相互赠予转让等服务及相关功能。您清楚知悉，哎哟不错棋牌严禁用户之间在游戏中及线下进行任何相互叫卖、转让虚拟货币、游戏币、游戏积分、参赛资格及其他游戏道具等行为。一经发现并经哎哟不错棋牌评估后，有权立即采取封号处理；情节严重的，有权移交相关机构依法处理。

        // 据此，也希望您能够号召其他用户对上述第8.3条规定的违规行为根据各棋牌游戏的要求开展举报（比如在游戏中点击对方头像，点击“举报”按钮进行举报），与哎哟不错棋牌一同为净化棋牌游戏环境共同努力。

        // 8.5.2 您理解并同意，因您违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，您应当独立承担责任；哎哟不错棋牌因此遭受损失的，您也应当一并赔偿。

        // 九、【知识产权声明】

        // 9.1 哎哟不错棋牌是本软件的知识产权权利人。本软件的一切著作权、商标权、专利权、商业秘密等知识产权，以及与本软件相关的所有信息内容（包括但不限于文字、图片、音频、视频、图表、界面设计、版面框架、有关数据或电子文档等）均受中华人民共和国法律法规和相应的国际条约保护，哎哟不错棋牌享有上述知识产权。

        // 9.2 未经哎哟不错棋牌书面同意，您不得为任何商业或非商业目的自行或许可任何第三方实施、利用、转让上述知识产权，哎哟不错棋牌保留追究上述行为法律责任的权利。

        // 十、【终端安全责任】

        // 10.1您理解并同意，本软件同大多数互联网软件一样，可能会受多种因素影响，包括但不限于用户原因、网络服务质量、社会环境等；也可能会受各种安全问题的侵扰，包括但不限于他人非法利用用户资料，进行现实中的骚扰；用户下载安装的其他软件或访问的其他网站中可能含有病毒、木马程序或其他恶意程序，威胁您的终端设备信息和数据安全，继而影响本软件的正常使用等。因此，您应加强信息安全及个人信息的保护意识，注意密码保护，以免遭受损失。

        // 10.2 您不得制作、发布、使用、传播用于窃取游戏帐号及他人个人信息、财产的恶意程序。

        // 10.3 维护软件安全与正常使用是哎哟不错棋牌和您的共同责任，哎哟不错棋牌将按照行业标准合理审慎地采取必要技术措施保护您的终端设备信息和数据安全，但是您承认和同意哎哟不错棋牌并不能就此提供完全保证。

        // 10.4 在任何情况下，您不应轻信借款、索要密码或其他涉及财产的网络信息。涉及财产操作的，请一定先核实对方身份，并请经常留意哎哟不错棋牌有关防范诈骗犯罪的提示。

        // 十一、【其他】

        // 11.1 您使用本软件即视为您已阅读并同意受本协议的约束。哎哟不错棋牌有权在必要时修改本协议条款。您可以在本软件的最新版本中查阅相关协议条款。本协议条款变更后，如果您继续使用本软件，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用本软件。

        // 11.2 本协议签订地为中华人民共和国海南省海口市龙华区。

        // 11.3 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。

        // 11.4 若您和哎哟不错棋牌之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。

        // 11.5 本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。

        // 11.6 本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。

        // 11.7 根据国家新闻出版总署关于健康游戏的忠告，哎哟不错棋牌棋牌网络游戏温馨提示您：抵制不良游戏，拒绝盗版游戏，注意自我保护，谨防受骗上当，适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活。

        // 11.8 如果您对本协议或其他服务协议有任何意见或建议，可与哎哟不错棋牌客户服务部门联系，我们会给予您必要的帮助。
        //         `;

        //         this.scrollContent.height = this.contentLabel.node.height;
        //         this.scrollView.scrollToTop(0.0000001, 0);
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow
     */
    onShowView: function onShowView(isShow) {

        this.node.active = isShow;
        if (isShow) {
            var moveAction = cc.moveTo(0.2, cc.p(0, 0));
            this.contentView.runAction(moveAction);
        } else {
            this.contentView.setPositionY(-1300);
        }
    },


    /****************************************  本类事件监听  ****************************************/

    /**
     * 关闭按钮的点击
     */
    onCloseBtnClick: function onCloseBtnClick(event) {
        this.onShowView(false);
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
        //# sourceMappingURL=HomeUserAgreementView.js.map
        