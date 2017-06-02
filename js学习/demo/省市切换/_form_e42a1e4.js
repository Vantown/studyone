define("tetris/parse/_form.js", function(require, exports, module) {
    var GET_COUNT_URL = "/tetris/form/result/count/";
    var device_id = 0, user_id = 0, user_mobile = '';
    var g_cid = 0;
    var isWrite = false;
    function Form($el, showJump, successUrl, failedUrl, successmsg, isShowCount, countText, countNum, countPos, telAutoFill,formId) {
        var that = this;
        this.$el = $el;
        this.formId = formId;
        this.$btn = this.$el.find('.btn-i');
        this.$reset = this.$el.find('#reset');
        this.$jump = this.$el.find('.btn-jump');
        this.padding = 20;
        this.showJump = showJump;
        this.successUrl = successUrl;
        this.failedUrl = failedUrl;
        this.successmsg = successmsg;
        this.isShowCount = isShowCount;
        this.countPos = countPos ? parseInt(countPos) : 0;
        this.countNum = isNaN(countNum) ? 0 : parseInt(countNum);
        this.countText = countText;
        this.telAutoFill = telAutoFill;
        this.csrf = this.$el.find('[name="csrfmiddlewaretoken"]').val();
        this.doCityCtr();
        this.addEvent();
        this.initCount();
        this.reqId = this.getReqId();
        this.sendWriteActionLog();
        this.sendFormAutoFillLog(0);
        this.TriggerAutoFill = false;

        var bridgeTimer = setInterval(function() {
            if(window.TetrisBridge){
                that.fetchUserInfo();
                that.getCid();
                clearInterval(bridgeTimer);
            }
        }, 200);
    }
    $.extend(Form.prototype, {
        sendWriteActionLog: function () {
            var that = this;
            $('form input').on('input',function() {
                if (!isWrite) {
                    window.addTetrisAction({
                        component_type: 'form',
                        component_id: that.formId,
                        action_type: 'form_write',
                        action_value: '1'
                    });
                    isWrite = true;
                }
            })
        },
        sendFormAutoFillLog: function (action_value) {
            this.removeFormAutoFillLog();

            if (window.addTetrisAction) {
                window.addTetrisAction({
                    component_type: 'form',
                    component_id: this.formId,
                    action_type: 'trigger_autofill',
                    action_value: action_value
                });
            }
        },
        removeFormAutoFillLog: function () {
            if (window.removeTetrisAction) {
                window.removeTetrisAction('form', 'trigger_autofill');
            }
        },
        sendFormSubmitWithAutoFillLog: function () {
            if (window.addTetrisAction) {
                window.addTetrisAction({
                    component_type: 'form',
                    component_id: this.formId,
                    action_type: 'submit_with_autofill',
                    action_value: this.TriggerAutoFill ? 1 : 0
                });
            }
        },
        getCid: function () {
            var bridge = window.TetrisBridge || {};
            if ('function' === typeof bridge.call) {
                bridge.call('adInfo', {}, function (error, res) {
                    if (error) {
                        return;
                    }
                    res = res || {};
                    g_cid = res.cid || 0;
                });
            }
        },
        fetchUserInfo: function () {
            var that = this;
            var bridge = window.TetrisBridge || {};
            if ('function' === typeof bridge.call) {
                bridge.call('appInfo', {}, function (error, res) {
                    if (error) {
                        return;
                    }
                    res = res || {};
                    device_id = res.device_id || 0;
                    user_id   = res.user_id || 0;
                    if(user_id && parseInt(that.telAutoFill) ){
                        getMobileByUserId(user_id);
                    }
                });
            }

            function getMobileByUserId(user_id){
                if(user_mobile){
                    return;
                }
                $.ajax({
                    url: '/tetris/user_mobile_info/',
                    data:{
                        uid: user_id
                    },
                    success: function(data){
                        user_mobile = data.mobile || '';
                    }
                });
            }

        },
        doCityCtr: function() {
            this.$city = this.$el.find('.city-group');
            if (this.$city && this.$city.length) {
                this.city = [];
                this.cityData = {
                    "cities": ["北京|beijing|bj", "天津|tianjin|tj", "河北|hebei|hb", "山西|shanxi|sx", "内蒙古|neimenggu|nmg", "辽宁|liaoning|ln", "吉林省|jilinsheng|jls", "黑龙江|heilongjiang|hlj", "上海|shanghai|sh", "江苏|jiangsu|js", "浙江|zhejiang|zj", "安徽|anhui|ah", "福建|fujian|fj", "江西|jiangxi|jx", "山东|shandong|sd", "河南|henan|hn", "湖北|hubei|hb", "湖南|hunan|hn", "广东|guangdong|gd", "广西|guangxi|gx", "海南|hainan|hn", "重庆|chongqing|cq", "四川|sichuan|sc", "贵州|guizhou|gz", "云南|yunnan|yn", "西藏|xizang|xz", "陕西|shanxi|sx", "甘肃|gansu|gs", "青海|qinghai|qh", "宁夏|ningxia|nx", "新疆|xinjiang|xj", "台湾|taiwan|tw", "香港|xianggang|xg", "澳门|aomen|am", "石家庄|shijiazhuang|sjz", "唐山|tangshan|ts", "秦皇岛|qinhuangdao|qhd", "邯郸|handan|hd", "邢台|xingtai|xt", "保定|baoding|bd", "张家口|zhangjiakou|zjk", "承德|chengde|cd", "沧州|cangzhou|cz", "廊坊|langfang|lf", "衡水|hengshui|hs", "太原|taiyuan|ty", "大同|datong|dt", "阳泉|yangquan|yq", "长治|changzhi|cz", "晋城|jincheng|jc", "朔州|shuozhou|sz", "忻州|xinzhou|xz", "临汾|linfen|lf", "运城|yuncheng|yc", "呼和浩特|huhehaote|hhht", "包头|baotou|bt", "乌海|wuhai|wh", "赤峰|chifeng|cf", "通辽|tongliao|tl", "鄂尔多斯|eerduosi|eeds", "沈阳|shenyang|sy", "大连|dalian|dl", "鞍山|anshan|as", "抚顺|fushun|fs", "本溪|benxi|bx", "丹东|dandong|dd", "锦州|jinzhou|jz", "营口|yingkou|yk", "阜新|fuxin|fx", "辽阳|liaoyang|ly", "盘锦|panjin|pj", "铁岭|tieling|tl", "朝阳|chaoyang|cy", "葫芦岛|huludao|hld", "长春|changchun|cc", "四平|siping|sp", "辽源|liaoyuan|ly", "通化|tonghua|th", "白城|baicheng|bc", "延边|yanbian|yb", "哈尔滨|haerbin|heb", "齐齐哈尔|qiqihaer|qqhe", "鸡西|jixi|jx", "鹤岗|hegang|hg", "双鸭山|shuangyashan|sys", "大庆|daqing|dq", "宜春|yichun|yc", "佳木斯|jiamusi|jms", "七台河|qitaihe|qth", "牡丹江|mudanjiang|mdj", "绥化|suihua|sh", "黑河|heihe|hh", "大兴安岭|daxinganling|dxal", "南京|nanjing|nj", "无锡|wuxi|wx", "徐州|xuzhou|xz", "常州|changzhou|cz", "苏州|suzhou|sz", "南通|nantong|nt", "连云港|lianyungang|lyg", "盐城|yancheng|yc", "扬州|yangzhou|yz", "镇江|zhenjiang|zj", "泰州|taizhou|tz", "宿迁|suqian|sq", "杭州|hangzhou|hz", "宁波|ningbo|nb", "温州|wenzhou|wz", "嘉兴|jiaxing|jx", "湖州|huzhou|hz", "绍兴|shaoxing|sx", "金华|jinhua|jh", "衢州|quzhou|qz", "舟山|zhoushan|zs", "丽水|lishui|ls", "台州|taizhou|tz", "合肥|hefei|hf", "芜湖|wuhu|wh", "蚌埠|bangbu|bb", "淮南|huainan|hn", "马鞍山|maanshan|mas", "淮北|huaibei|hb", "铜陵|tongling|tl", "安庆|anqing|aq", "阜阳|fuyang|fy", "宿州|suzhou|sz", "滁州|chuzhou|cz", "六安|liuan|la", "宣城|xuancheng|xc", "池州|chizhou|cz", "福州|fuzhou|fz", "厦门|xiamen|xm", "莆田|putian|pt", "三明|sanming|sm", "泉州|quanzhou|qz", "漳州|zhangzhou|zz", "南平|nanping|np", "宁德|ningde|nd", "龙岩|longyan|ly", "陇南|longnan|ln", "庆阳|qingyang|qy", "南昌|nanchang|nc", "景德镇|jingdezhen|jdz", "萍乡|pingxiang|px", "九江|jiujiang|jj", "新余|xinyu|xy", "鹰潭|yingtan|yt", "赣州|ganzhou|gz", "宜春|yichun|yc", "上饶|shangrao|sr", "吉安|jian|ja", "济南|jinan|jn", "青岛|qingdao|qd", "淄博|zibo|zb", "枣庄|zaozhuang|zz", "东营|dongying|dy", "烟台|yantai|yt", "潍坊|weifang|wf", "济宁|jining|jn", "泰安|taian|ta", "威海|weihai|wh", "日照|rizhao|rz", "滨州|binzhou|bz", "德州|dezhou|dz", "聊城|liaocheng|lc", "临沂|linyi|ly", "菏泽|heze|hz", "莱芜|laiwu|lw", "郑州|zhengzhou|zz", "开封|kaifeng|kf", "洛阳|luoyang|ly", "平顶山|pingdingshan|pds", "安阳|anyang|ay", "鹤壁|hebi|hb", "新乡|xinxiang|xx", "焦作|jiaozuo|jz", "濮阳|puyang|py", "许昌|xuchang|xc", "漯河|leihe|lh", "三门峡|sanmenxia|smx", "商丘|shangqiu|sq", "周口|zhoukou|zk", "驻马店|zhumadian|zmd", "南阳|nanyang|ny", "信阳|xinyang|xy", "武汉|wuhan|wh", "黄石|huangshi|hs", "十堰|shiyan|sy", "随州|suizhou|sz", "宜昌|yichang|yc", "襄樊|xiangfan|xf", "鄂州|ezhou|ez", "荆门|jingmen|jm", "黄冈|huanggang|hg", "孝感|xiaogan|xg", "咸宁|xianning|xn", "荆州|jingzhou|jz", "恩施|enshi|es", "长沙|changsha|cs", "株洲|zhuzhou|zz", "湘潭|xiangtan|xt", "衡阳|hengyang|hy", "邵阳|shaoyang|sy", "岳阳|yueyang|yy", "常德|changde|cd", "张家界|zhangjiajie|zjj", "益阳|yiyang|yy", "娄底|loudi|ld", "郴州|chenzhou|cz", "永州|yongzhou|yz", "怀化|huaihua|hh", "广州|guangzhou|gz", "韶关|shaoguan|sg", "深圳|shenzhen|sz", "珠海|zhuhai|zh", "汕头|shantou|st", "江门|jiangmen|jm", "湛江|zhanjiang|zj", "茂名|maoming|mm", "肇庆|zhaoqing|zq", "惠州|huizhou|hz", "梅州|meizhou|mz", "汕尾|shanwei|sw", "河源|heyuan|hy", "阳江|yangjiang|yj", "潮州|chaozhou|cz", "揭阳|jieyang|jy", "云浮|yunfu|yf", "清远|qingyuan|qy", "东莞|dongguan|dg", "中山|zhongshan|zs", "南宁|nanning|nn", "柳州|liuzhou|lz", "桂林|guilin|gl", "梧州|wuzhou|wz", "北海|beihai|bh", "防城港|fangchenggang|fcg", "贵港|guigang|gg", "贺州|hezhou|hz", "玉林|yulin|yl", "百色|baise|bs", "河池|hechi|hc", "钦州|qinzhou|qz", "海口|haikou|hk", "三亚|sanya|sy", "成都|chengdu|cd", "自贡|zigong|zg", "攀枝花|panzhihua|pzh", "阿坝|aba|ab", "甘孜|ganzi|gz", "凉山|liangshan|ls", "广安|guangan|ga", "巴中|bazhong|bz", "泸州|luzhou|lz", "德阳|deyang|dy", "绵阳|mianyang|my", "广元|guangyuan|gy", "遂宁|suining|sn", "内江|najiang|nj", "乐山|leshan|ls", "宜宾|yibin|yb", "南充|nanchong|nc", "达州|dazhou|dz", "雅安|yaan|ya", "眉山|meishan|ms", "资阳|ziyang|zy", "贵阳|guiyang|gy", "六盘水|liupanshui|lps", "遵义|zunyi|zy", "铜仁|tongren|tr", "毕节|bijie|bj", "安顺|anshun|as", "昆明|kunming|km", "德宏|dehong|dh", "昭通|zhaotong|zt", "曲靖|qujing|qj", "楚雄|chuxiong|cx", "玉溪|yuxi|yx", "红河|honghe|hh", "文山|wenshan|ws", "西双版纳|xishuangbanna|xsbn", "大理|dali|dl", "保山|baoshan|bs", "怒江|nujiang|nj", "丽江|lijiang|lj", "迪庆|diqing|dq", "临沧|lincang|lc", "拉萨|lasa|ls", "昌都|changdu|cd", "山南|shannan|sn", "日喀则|rikaze|rkz", "那曲|naqu|nq", "阿里|ali|al", "林芝|linzhi|lz", "西安|xian|xa", "铜川|tongchuan|tc", "宝鸡|baoji|bj", "咸阳|xianyang|xy", "渭南|weinan|wn", "汉中|hanzhong|hz", "安康|ankang|ak", "商洛|shangluo|sl", "延安|yanan|ya", "榆林|yulin|yl", "兰州|lanzhou|lz", "嘉峪关|jiayuguan|jyg", "金昌|jinchang|jc", "白银|baiyin|by", "天水|tianshui|ts", "酒泉|jiuquan|jq", "张掖|zhangye|zy", "武威|wuwei|ww", "定西|dingxi|dx", "平凉|pingliang|pl", "临夏|linxia|lx", "西宁|xining|xn", "果洛|guoluo|gl", "海西|haixi|hx", "海东|haidong|hd", "海北|haibei|hb", "玉树|yushu|ys", "黄南|huangnan|hn", "银川|yinchuan|yc", "石嘴山|shizuishan|szs", "吴忠|wuzhong|wz", "固原|guyuan|gy", "乌鲁木齐|wulumuqi|wlmq", "克拉玛依|kelamayi|klmy", "吐鲁番|tulufan|tlf", "哈密|hami|hm", "昌吉|changji|cj", "阿克苏|akesu|aks", "喀什|kashi|ks", "和田|hetian|ht", "伊犁|yili|yl", "塔城|tacheng|tc", "阿勒泰|aletai|alt", "佛山|foshan|fs", "松原|songyuan|sy", "黄山|huangshan|hs", "吕梁|lvliang|ll", "晋中|jinzhong|jz", "抚州|fuzhou|fz", "来宾|laibin|lb", "崇左|chongzuo|cz", "博尔塔拉|boertala|betl", "巴音郭楞|bayinguoleng|bygl", "克孜勒苏|kezilesu|kzls", "白山|baishan|bs", "吉林市|jilinshi|jls", "伊春|yichun|yc", "济源|jiyuan|jy", "漯河|luohe|lh", "襄阳|xiangyang|xy", "呼伦贝尔|hunlunbeier|hlbe", "巴彦淖尔|bayannaoer|byne", "乌兰察布|wulanchabu|wlcb", "淮安|huaian|ha", "普洱|puer|pe"],
                    "codes": [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 130100, 130200, 130300, 130400, 130500, 130600, 130700, 130800, 130900, 131000, 131100, 140100, 140200, 140300, 140400, 140500, 140600, 140900, 141000, 140800, 150100, 150200, 150300, 150400, 150500, 150600, 210100, 210200, 210300, 210400, 210500, 210600, 210700, 210800, 210900, 211000, 211100, 211200, 211300, 211400, 220100, 220300, 220400, 220500, 220800, 222400, 230100, 230200, 230300, 230400, 230500, 230600, 360900, 230800, 230900, 231000, 231200, 231100, 232700, 320100, 320200, 320300, 320400, 320500, 320600, 320700, 320900, 321000, 321100, 321200, 321300, 330100, 330200, 330300, 330400, 330500, 330600, 330700, 330800, 330900, 331100, 331000, 340100, 340200, 340300, 340400, 340500, 340600, 340700, 340800, 341200, 341300, 341100, 341500, 341800, 341700, 350100, 350200, 350300, 350400, 350500, 350600, 350700, 350900, 350800, 621200, 621000, 360100, 360200, 360300, 360400, 360500, 360600, 360700, 360900, 361100, 360800, 370100, 370200, 370300, 370400, 370500, 370600, 370700, 370800, 370900, 371000, 371100, 371600, 371400, 371500, 371300, 371700, 371200, 410100, 410200, 410300, 410400, 410500, 410600, 410700, 410800, 410900, 411000, 411100, 411200, 411400, 411600, 411700, 411300, 411500, 420100, 420200, 420300, 421300, 420500, 420600, 420700, 420800, 421100, 420900, 421200, 421000, 422800, 430100, 430200, 430300, 430400, 430500, 430600, 430700, 430800, 430900, 431300, 431000, 431100, 431200, 440100, 440200, 440300, 440400, 440500, 440700, 440800, 440900, 441200, 441300, 441400, 441500, 441600, 441700, 445100, 445200, 445300, 441800, 441900, 442000, 450100, 450200, 450300, 450400, 450500, 450600, 450800, 451100, 450900, 451000, 451200, 450700, 460100, 460200, 510100, 510300, 510400, 513200, 513300, 513400, 511600, 511900, 510500, 510600, 510700, 510800, 510900, 511000, 511100, 511500, 511300, 511700, 511800, 511400, 512000, 520100, 520200, 520300, 522200, 522400, 520400, 530100, 533100, 530600, 530300, 532300, 530400, 532500, 532600, 532800, 532900, 530500, 533300, 530700, 533400, 530900, 540100, 542100, 542200, 542300, 542400, 542500, 542600, 610100, 610200, 610300, 610400, 610500, 610700, 610900, 611000, 610600, 610800, 620100, 620200, 620300, 620400, 620500, 620900, 620700, 620600, 621100, 620800, 622900, 630100, 632600, 632800, 632100, 632200, 632700, 632300, 640100, 640200, 640300, 640400, 650100, 650200, 652100, 652200, 652300, 652900, 653100, 653200, 654000, 654200, 654300, 440600, 220700, 341000, 141100, 140700, 361000, 451300, 451400, 652700, 652800, 653000, 220600, 220200, 230700, 411800, 411100, 420600, 150700, 150800, 150900, 320800, 530800]
                };

                var cities = this.cityData.cities,
                    codes = this.cityData.codes,
                    that = this,
                    len = cities.length;
                for (var i = 0; i < len; i++) {
                    var ele = cities[i];
                    var obj = {
                        name: ele,
                        code: codes[i]
                    };
                    that.city.push(obj);
                }
                var $proList = this.$city.find('#pro');

                $proList.bind('change', function(evt) {
                    that.initCity($(this).val());
                });

                this.initCity($proList.val());
            } //end of if
        },
        addEvent: function() {
            this.jumpBtnEvent();
            this.multiSelectEvent();
            this.radioSelectEvent();
            this.chkboxSelectEvent();
            this.submitEvent();
            this.captchaEvent();
            this.telPhoneEvent();
        },
        submitEvent: function(){
            var that = this;
            that.hasClick = true;
            that.$btn.bind('click', function(evt) {
                evt.preventDefault();
                if (that.hasClick) {
                    that.doSubmit(evt.currentTarget);
                    that.hasClick = false;
                }
            });
        },
        jumpBtnEvent: function() {
            var showJump = this.showJump;
            var that = this;
            var scrollTimer;
            var lastScroll = +new Date();
            if (showJump == "1") {
                this.$jump.css({'display': 'block'}).show();
                this.$jump.bind('click', function(evt) {
                    var offset = that.$el.offset();
                    var scrollValue = offset.top;  //浏览器会自动修正scroll超出范围
                    window.scrollTo(0, scrollValue);
                });
            }
            if ($('.create-left-content').length) {
                $('.create-left-content').append(this.$jump);
            } else {
                $('<div class="create-left-content"/>')
                .append(this.$jump)
                .appendTo('#content');
            };
            if ($('.create-right-content').length) {
                $('.create-right-content').append(this.$jump);
            } else {
                $('<div class="create-right-content"/>')
                .append(this.$jump)
                .appendTo('#content');
            }
        },
        captchaEvent: function() {
            var that = this;
            var $smsValidate = that.$el.find('.sms-validate');
            var $picValidate = that.$el.find('.pic-validate-wrapper');
            $picValidate.attr('pic-validate', '0');


            var originSendText;//发送验证码按钮文案
            if(!$smsValidate.length) return;

            $smsSendBtn = $smsValidate.find('.sendSms');
            $smsValidateSendBtn = $picValidate.find('.send_sms_validate');

            originSendText = $smsValidate.find('.text').text();

            var timerBtn = function($btn){
                var counter = 59;
                $btn.addClass('disabled');
                $btn.children('.timer').text('(' + (counter--) + ')');
                $btn.children('.text').text('重新获取');
                var counteTimer = setInterval(function() {
                    $btn.children('.timer').text('(' + (counter--) + ')');
                    if (counter === -1) {
                        $btn.children('.timer').text('');
                        $btn.children('.text').text(originSendText);
                        clearInterval(counteTimer);
                        $btn.removeClass('disabled');
                    }

                }.bind(this), 1000);
            };

            //click validatepic to refresh
            $imgValidate = $picValidate.find('img.validate-img');
            $picValidate.find('img.validate-img, .refresh-pic-btn').click(function(){
                $imgValidate.attr('src', $imgValidate.attr('origin-src')+ '&_t=' + (+new Date()));
            });

            //点击灰色区域
            $picValidate.on('click', function(e){
                var $target = $(e.target);
                if(e.target === e.currentTarget){
                    $picValidate.addClass('hide');
                }
            });

            //弹窗中发送短信按钮
            $smsValidateSendBtn.on('click', function(e){
                var phone_number = $smsValidate.prev('input').val();

                $.ajax({
                    // url: '/tetris/check_img_captcha/',
                    url: '/tetris/send_captcha/',
                    type: 'POST',
                    data: {
                        cvalue: $picValidate.find('input').val(),
                        ckey: $picValidate.attr('captcha_key'),
                        phone_number:  phone_number,
                        csrfmiddlewaretoken: that.csrf,
                    },
                    beforeSend: function (request)
                    {
                        request.setRequestHeader("X-CSRFToken", that.csrf);
                    },
                    success: function(rs){
                        if(rs.status === 'success'){
                            $picValidate.addClass('hide');
                            //成功调用了一次发送后 原有按钮进入倒计时
                            timerBtn($smsSendBtn);
                        }else{
                            alert(rs.msg || '短信发送失败');
                        }
                    }
                });
            });


            $smsSendBtn.on('click', function() {
                if($(this).hasClass('disabled')){
                    return;
                }
                var phone_number = $smsValidate.siblings('input').val();
                if(phone_number.trim().length != 11 || !/\d{11}/.test(phone_number)){
                    alert('电话号码应为11位数字');
                    return;
                }

                if($picValidate.attr('pic-validate') == '1'){
                    $picValidate.removeClass('hide');
                    return;
                }

                // csrf = this.getCookie()['csrftoken'] || "";
                $.ajax({
                    url: '/tetris/send_captcha/',
                    type: 'POST',
                    data:{
                        phone_number:  phone_number,
                        csrfmiddlewaretoken: that.csrf
                    },
                    beforeSend: function (request)
                    {
                        request.setRequestHeader("X-CSRFToken", that.csrf);
                    },
                    success: function(rs){
                        if(rs.data && !rs.data.captcha_key){
                            $picValidate.addClass('hide');
                            //成功调用了一次发送后 原有按钮进入倒计时
                            timerBtn($smsSendBtn);
                        }
                        //表示应该提供图片验证码而未能提供
                        if(rs.data && rs.data.captcha_key){
                            //pic_captcha 为1 要求输入图片验证码
                            $picValidate.attr('pic-validate', '1');
                            $picValidate.find('img').attr('src', rs.data.captcha_url+ '&_t=' + (+new Date()));
                            $picValidate.find('img').attr('origin-src', rs.data.captcha_url);
                            $picValidate.attr('captcha_key', rs.data.captcha_key);
                            $picValidate.removeClass('hide');
                        }
                        if(rs.msg){
                            alert(rs.msg || '短信发送失败');
                        }
                    }
                });
            });
        },
        multiSelectEvent: function() {
            var that = this;
            var $selectGroups = this.$el.find('.selectMulti-group');
            if (!$selectGroups.length) {
                return;
            }

            $selectGroups.each(function() {
                var $selectGroup = $(this);
                var data;
                var $allSelects, $select1, $input;

                try {
                    data = $selectGroup.attr('data-select');
                    data = JSON.parse(data);
                    // data.arr = data.arrObj.filter(function(item) {
                    //     return item.id != '0';
                    // })
                } catch (e) {
                    console.log(e);
                }
                if ($selectGroup) {
                    $selectWrappers = $selectGroup.find('.select-wrapper');
                    $select1 = $selectGroup.find('.select-list1');

                    $allSelects = $selectGroup.find('select');
                    $input = $selectGroup.find('.multi-select'); //下拉选择的值存在$input中

                    var inputValJson = {}; //$input.data('value');  //{1: .., 2:...}
                    var inputStr;

                    //当有下一层选项才显示
                    $selectWrappers.hide().removeClass('showing');
                    $select1.show().addClass('showing');
                    //每当用户操作  计算所选择的值
                    (function($selectWrappers){
                        $allSelects.on('change', function(e) {
                            var selectElem = e.target;
                            var val = $(this).val();
                            var id, $next;
                            var selectIndex = $(this).index();
                            //计算当前被选中的option的data-id值
                            //根据data-id填充下一个select
                            //Zepto不支持:selected  下面是获取被选中的option的data-id (包含嵌套关系)
                            var options = Array.prototype.slice.call(selectElem.options);
                            for (var i = 0; i < options.length; i++) {
                                if (options[i].value === val) {
                                    id = options[i].dataset.id;
                                }
                            }
                            $next = $(this).parent().next(); //zepto 没有nextAll()
                            //填充下一个select
                            appendOpt($next, id);
                            inputValJson = that.getSelectValue($selectWrappers);
                            inputStr = (function() {
                                var str = '';
                                for (var key in inputValJson) {
                                    str = str + inputValJson[key] + ',';
                                }
                                str = str.slice(0, str.length - 1);
                                return str;
                            })();
                            $input.val(inputStr);
                        });
                    })($selectWrappers);

                    //新增checkbox
                    (function($selectWrappers){
                        $selectGroup.on('change', 'input[type="checkbox"]', function(e){
                            inputValJson = that.getSelectValue($selectWrappers);
                            inputStr = (function() {
                                var str = '';
                                for (var key in inputValJson) {
                                    str = str + inputValJson[key] + ',';
                                }
                                str = str.slice(0, str.length - 1);
                                return str;
                            })();
                            $input.val(inputStr);
                        });
                    })($selectWrappers);

                }


                //关于级联选择  一种是次级每次都是 请选择 //目前使用这一种
                //另一种是  显示第一个值


                function appendOpt($selectWrapper, pid) {
                    if (!($selectWrapper && $selectWrapper.length)) return;

                    var parentNode = data.arrObj[pid];

                    if(parentNode.type == 'checked'){
                        $selectWrapper[0].dataset.checkbox = '1'; //获取数据的时候根据这个判断是否多选
                        $selectWrapper.addClass('select-checkbox');
                    }else{
                        $selectWrapper.removeClass('select-checkbox');
                        $selectWrapper[0].dataset.checkbox = '';
                        $selectWrapper.removeAttr('data-checkbox');
                    }


                    setToEmpty($selectWrapper);

                    if (pid === '0') { //前一个select再次选为Root时
                        $selectWrapper.hide().removeClass('showing');
                        appendOpt($selectWrapper.next(), '0'); //那么所有次级都是 请选择
                    } else {
                        var added = 0;
                        if (parentNode && parentNode.sid) {

                            if(!parentNode.type){
                                //单选  添加option
                                parentNode.sid.forEach(function(id) {
                                    var item = data.arrObj[id];
                                    // if(firstId === 0 )firstId = item.id;
                                    added = 1;
                                    var opt = document.createElement("option");
                                    opt.dataset.id = item.id;
                                    opt.value = item.text;
                                    opt.text = item.text;
                                    $selectWrapper.find('select')[0].add(opt, null);
                                });
                            }else if(parentNode.type == 'checked'){
                                var $cbWrapper = $('<div class="cb-wrapper"></div>');
                                $selectWrapper.append($cbWrapper);
                                $cbWrapper.empty();
                                parentNode.sid.forEach(function(id) {
                                    var item = data.arrObj[id];
                                    // if(firstId === 0 )firstId = item.id;
                                    added = 1;
                                    var html = '<label class="cbx-item"><input type="checkbox" id="{{item_id}}" value="{{item_value}}"/>{{item_text}}</label>';
                                    html = html.replace('{{item_id}}', item.id);
                                    html = html.replace('{{item_value}}', item.text);
                                    html = html.replace('{{item_text}}', item.text);
                                    var cbx = $(html);
                                    // ckb.dataset.id = item.id;
                                    // ckb.value = item.text;
                                    // ckb.text = item.text;
                                    $cbWrapper.append(cbx);
                                });
                            }

                        }
                        if (added) {
                            $selectWrapper.show().addClass('showing');
                        } else {
                            $selectWrapper.hide().removeClass('showing');
                        }
                        // appendOpt($selectWrapper.next(), firstId); //所有次级都是第一个值
                        appendOpt($selectWrapper.next(), '0'); //请选择
                    }
                }

                function setToEmpty($selectWrapper) {
                    var $select = $selectWrapper.find('select');
                    var $cbWrapper = $selectWrapper.find('.cb-wrapper');
                    $select[0].value = ''; //清空之前选择的值
                    //逻辑修改了  现在存在checkbox
                    if ($select[0].options) {
                        $select[0].options.length = 0;
                    }
                    var opt = document.createElement("option");
                    opt.dataset.id = '0';
                    opt.value = 'null';
                    opt.text = '--请选择--';
                    $select[0].add(opt, null);
                    // $elem.empty()

                    if ($cbWrapper) {
                        $cbWrapper.remove();
                        // $cbWrapper.children().each(function(idx) {
                        //     $(this).prop('checked', false);
                        // })
                    }
                }
            });
        },
        getSelectValue: function($selectWrappers) {
            var showingItems = $selectWrappers.filter('.showing');
            var inputVal = {};
            showingItems.each(function(idx) {

                if($(this)[0].dataset.checkbox == '1'){
                    var $cbWrapper = $(this).children('.cb-wrapper');
                    var rs = [];
                    if($cbWrapper){
                        $cbWrapper.children().each(function(idx2, cbx){
                            var $cbx = $(cbx);
                            if($cbx.children('input').prop('checked')){
                                rs.push($cbx.children().val());
                            }
                        })
                    }
                    inputVal[idx + 1] = '[' + rs.toString() + ']';
                }else{
                    inputVal[idx + 1] = $(this).children('select').val() || 'null';
                }

            });
            if(inputVal[1] === 'null'){ inputVal = {}};
            return inputVal;
        },
        //单选 多选框
        radioSelectEvent: function(){
            var $radioGroups = this.$el.find('.radio-group');
            $radioGroups.each(function(){
                var $radioGroup = $(this);
                var $radioInputs = $radioGroup.find('input[type="radio"]');
                var $radioValue = $radioGroup.find('input.radio-select');
                $radioInputs.on('change', function(e){
                    // debugger
                    var selectRadio = $radioGroup.find('input[type="radio"]:checked');
                    $radioValue.val(selectRadio.val());
                }.bind(this));
            });
        },
        chkboxSelectEvent: function(){
            var $checkboxGroups = this.$el.find('.checkbox-group');
            $checkboxGroups.each(function(){
                var $checkboxGroup = $(this);
                var $checkboxInputs = $checkboxGroup.find('input[type="checkbox"]');
                var $checkboxValue = $checkboxGroup.find('input.checkbox-select');
                $checkboxInputs.on('change', function(e){
                    var $selectcheckbox = $checkboxGroup.find('input[type="checkbox"]:checked');

                    var selectValue = [];
                    $.each($selectcheckbox, function(idx, item){
                        // debugger
                        selectValue.push(item.value);
                    });
                    $checkboxValue.val(selectValue.toString());
                }.bind(this));
            });
        },
        //电话自动填充
        telPhoneEvent: function(){
            var that = this;
            if(this.telAutoFill == '1'){  //附加创意不处理
                var $inputGroups = this.$el.find('.input-group-i');
                $inputGroups = $inputGroups.filter(function(){
                    return $(this).attr('validate') && (
                    $(this).attr('validate') == "cellphone" || $(this).attr('validate') == "captcha" );
                });
                var $inputTel = $inputGroups.children('input');
                var focused = 0;
                $inputTel.focus(function(e){
                    var $target = $(e.target);
                    var $parent = $target.parent();
                    if($target.val().length !== 0){ //已经有值 不弹出
                        return;
                    }

                    if(user_mobile && !focused){
                        $target.blur();
                        focused = 1;
                        var rs = window.confirm('是否自动填充您在今日头条注册时使用的手机号?\n' + user_mobile);
                        if(rs){
                            $target.val(user_mobile);
                        }else{
                            $target.focus();
                        }

                        that.sendFormAutoFillLog(1);
                        that.TriggerAutoFill = true;
                    }
                });
            }
        },

        doSubmit: function(target) {
            var that = this;
            var toutiao = window.toutiao || {};
            // send log
            //不再使用以前的统计方式
            //stat.send(1);
            var ajax_url = this.$el.attr('action_url'),
                form_id = this.$el.attr('form_id'),
                ajax_type = "POST",
                ajax_data = this.$el.serialize().replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, '').replace(/&=[^&]*/g, '');

            var query = this.queryToJson(location.href),
                site_id = query.site_id || "",
                ad_id = query.ad_id || "",
                req_id = query.req_id || "",
                csrf = this.getCookie()['csrftoken'] || "";

            //判断是否是表单附加创意页面
            var $creative_title = $('#creative-title'),
                $submit_result = $('#submit-result'),
                is_creative_page = $creative_title.length > 0,
                get_dialog_ua = navigator.userAgent.match(/RevealType\/Dialog/i),
                is_webview_dialog = get_dialog_ua || isWebviewDialogUrl();

            var event_type_value = 'form';

            function isWebviewDialogUrl(){
                var str, reg = /(revealType)(\=)(\w+)/g;
                    str = window.location.href.match(reg);
                var parameter = (str && str[0]) ? str[0].split('=') : [];
                if (parameter[0] && parameter[0] === 'revealType' && parameter[1] && parameter[1] === 'dialog') {
                    return true;
                } else {
                    return false;
                }
            }

            // ajax_data += "&site_id=" + site_id;
            // ajax_data += "&ad_id=" + ad_id;
            // ajax_data += "&csrfmiddlewaretoken="+csrf;

            var submit_data = function(cid) {
                if (cid) {
                    ajax_data += "&cid=" + cid;
                }
                ajax_data += "&form_id=" + form_id;
                ajax_data += "&req_id=" + req_id;
//                ajax_data += "&export_url=" + form_export_url;

                that.$el.find('.need-serialize').each(function(idx, ele) {
                    var $ele = $(ele),
                        query = '';
                    $ele.find('input,select').each(function(idx, ele) {
                        query += $(ele).val() + '+';
                    });
                    query = query.substring(0, query.length - 1);
                    ajax_data += "&" + $ele.attr('name') + "=" + encodeURIComponent(query);
                });

                //用于将服务器返回的错误信息转为英文，错误信息格式固定
                var chinese2English = function(str) {
                    if (str.indexOf('格式不正确') >= 0) {
                        return 'format error';
                    }
                    if (str.indexOf('已使用') >= 0) {
                        return 'already exist';
                    }
                    if (str.indexOf('为空') >= 0) {
                        return 'cannot be empty';
                    }
                    if (str.indexOf('时间的格式') >= 0) {
                        return 'time format error';
                    }
                    return 'NONE';
                };

                //表单提交添加device_id & user_id
                ajax_data += "&device_id=" + device_id;
                ajax_data += "&user_id=" + user_id;

                ajax_data = Base64.encode(ajax_data);

                $.ajax({
                    type: ajax_type,
                    url: ajax_url,
                    // data: ajax_data,
                    data: {
                        'csrfmiddlewaretoken': csrf,
                        ajax_data: ajax_data
                    },
                    success: function(result) {
                        that.hasClick = true;
                        var errTxt = '';
                        if (result.status == "success") {
                            if (that.successUrl) {
                                var REG_INDEX = /tetris\/page\/index\/(\d{6})\/?\d*/;
                                var GET_PREFIX = /(.*page\/)index\/\d{6}\/?/;

                                if(REG_INDEX.test(that.successUrl) ){
                                    var page_link_id = +that.successUrl.match(REG_INDEX)[1];
                                    var page_id = GLOBAL_VAR.pageid_map[page_link_id];
                                    var prefix = that.successUrl.match(GET_PREFIX)[1];
                                    // if(Array.isArray(GLOBAL_VAR.pageIds)){
                                    //     that.successUrl = prefix + page_id;
                                    // }
                                    if(GLOBAL_VAR.pageid_map){
                                        that.successUrl = prefix + page_id + '/';
                                    }
                                }

                                window.location.href = that.successUrl;
                            }else{
                                if(is_creative_page && is_webview_dialog){
                                    $submit_result.html('');
                                    toutiao.formDialogClose({
                                        "submit_result": 1,
                                        success : function(o){
                                            console.log('success: ' + JSON.stringify(o));
                                        },
                                        fail : function(o){
                                            console.log('fail: ' + JSON.stringify(o));
                                        },
                                        error: function(o) {
                                            console.log('error: ' +  JSON.stringify(o));
                                        }
                                    });
                                }else{
                                    var alertmsg = that.successmsg || '表单提交成功!';
                                    alert(alertmsg);
                                }
                            }
                            that.addCount();
                            var msg = {};
                            msg.page_url = window.location.href;
                            msg.event_type = event_type_value;
                            msg.target = target;
                            msg.page_type = 1;
                            _taq.push(msg);

                            //上报行为日志
                            if ('function' === typeof window.addTetrisAction) {
                                window.addTetrisAction({
                                    component_type: 'form',
                                    component_id: form_id,
                                    action_type: 'success'
                                });
                            }


                            that.$reset.click();


                            that.$el.find('.showing:not(.select-list1)').removeClass('showing').hide();
                            if (that.$city && that.$city.length) {
                                that.initCity(that.$city.find('#pro').val());
                            }
                        } else {
                            var $inputs = that.$el.find('input,select,textarea'),
                                len = $inputs.length,
                                i = 0;
                            for (; i < len; i++) {
                                var name = $inputs.eq(i).attr('name');
                                var $prev = $inputs.eq(i).prev();
                                if (result.data[name]) {
                                    var info = $prev.text() + result.data[name];
                                    if(is_creative_page && is_webview_dialog){
                                        $submit_result.html(info);
                                    }else{
                                        alert(info);
                                    }
                                    errTxt = $prev.text() + ' ' + $inputs.eq(i).prop('tagName') + ' ' + chinese2English(result.data[name]);
                                    _taq.push({
                                        page_url: window.location.href,
                                        event_type: event_type_value,
                                        event_value: 'error',
                                        target: target,
                                        page_type: 1,
                                        options: errTxt
                                    });
                                    //上报行为日志
                                    if ('function' === typeof window.addTetrisAction) {
                                        window.addTetrisAction({
                                            component_type: 'form',
                                            component_id: form_id,
                                            action_type: 'error',
                                            action_value: errTxt
                                        });
                                    }
                                    if(that.failedUrl){
                                        window.location.href = that.failedUrl;
                                    }
                                    return;
                                } else if (result.data[name] == '') {
                                    var info = $prev.text() + '不能为空!';
                                    if(is_creative_page && is_webview_dialog){
                                        $submit_result.html(info);
                                    }else{
                                        alert(info);
                                    }
                                    errTxt = $prev.text() + ' ' + $inputs.eq(i).prop('tagName') + ' ' + chinese2English(result.data[name]);
                                    _taq.push({
                                        page_url: window.location.href,
                                        event_type: event_type_value,
                                        event_value: 'error',
                                        target: target,
                                        page_type: 1,
                                        options: errTxt
                                    });
                                    //上报行为日志
                                    if ('function' === typeof window.addTetrisAction) {
                                        window.addTetrisAction({
                                            component_type: 'form',
                                            component_id: form_id,
                                            action_type: 'error',
                                            action_value: errTxt
                                        });
                                    }
                                    if(that.failedUrl) {
                                        window.location.href = that.failedUrl;
                                    }
                                    return;
                                }
                            }

                            if(is_creative_page && is_webview_dialog){
                                toutiao.formDialogClose({
                                    "submit_result": 0,
                                    success : function(o){
                                        console.log('success: ' + JSON.stringify(o));
                                    },
                                    fail : function(o){
                                        console.log('fail: ' + JSON.stringify(o));
                                    },
                                    error: function(o){
                                        console.log('error: ' +  JSON.stringify(o));
                                    }
                                });
                            }
                        }
                    }
                });
            };
            submit_data(g_cid);
            this.sendFormSubmitWithAutoFillLog();
            return false;
        },
        strToJson: function (query) {
            var params = query.split('&'),
                len = params.length,
                result = {},
                i = 0,
                key, value, item, param;

            for (; i < len; i++) {
                if (!params[i]) {
                    continue;
                }
                param = params[i].split('=');
                key = param[0];
                value = param[1];

                item = result[key];
                if ('undefined' == typeof item) {
                    result[key] = value;
                } else if (this.isArray(item)) {
                    item.push(value);
                } else { // 这里只可能是string了
                    result[key] = [item, value];
                }
            }

            return result;
        },
        queryToJson: function(url) {
            var query = url.substr(url.lastIndexOf('?') + 1);
            return this.strToJson(query);
        },
        isArray: function(arr) {
            return toString.call(arr) === '[object Array]';
        },
        getCookie: function() {
            var cookie = document.cookie,
                cookies = cookie.split(';'),
                length = cookies.length,
                i = 0,
                item,
                result = {};

            for (; i < length; i++) {
                if (!cookies[i]) {
                    continue;
                }
                item = cookies[i].split('=');
                var key = item[0].trim(),
                    value = item[1];

                result[key] = value;
            }
            return result;
        },
        getCodeByName: function(name) {
            var length = this.city.length,
                i = 0;
            for (; i < length; i++) {
                var ele = this.city[i];
                if (ele.name.indexOf(name) === 0) {
                    return ele.code;
                }
            }
            return false;
        },
        getListByCode: function(code) {
            var list = [],
                length = this.city.length;
            for (var i = 0; i < length; i++) {
                var ele = this.city[i];
                if (ele.code.toString().indexOf(code) === 0) {
                    list.push(ele);
                }
            }
            return list;
        },
        initCity: function(pro) {
            var code = this.getCodeByName(pro);
            var list = this.getListByCode(code);
            var $cityList = this.$city.find('#city'),
                html = '';

            $cityList.children().remove();

            var len = list.length;
            if (len > 1) {
                list.shift();
                len--;
            }

            for (var i = 0; i < len; i++) {
                var name = list[i].name.split('|')[0];
                html += '<option>' + name + '</option>';
            }
            $cityList.append(html);
        },
        renderCount: function () {
            if (this.isShowCount !== "true") {
                return;
            }
            var texts      = this.countText.split('{计数}');
            var targetNode = 0 === this.countPos ? "bottomCount" : "topCount";
            this.$el.parent('.form-piece').find('[data-node="' + targetNode + '"]').css("display", "flex");
            this.$el.parent('.form-piece').find('[data-node="countTextNum"]').text(this.countNum);
            this.$el.parent('.form-piece').find('[data-node="countTextPre"]').text(texts[0]);
            this.$el.parent('.form-piece').find('[data-node="countTextPos"]').text(texts[1]);
        },
        initCount: function () {
            if (this.isShowCount !== "true") {
                return;
            }
            var that = this;
            $.get(GET_COUNT_URL, {
                form_id: this.formId
            }, function (res) {
                res = res || {};
                if (res.status !== 'success') {
                    return;
                }
                that.countNum += parseInt(res.count, 10);
                that.renderCount();
            });
        },
        addCount: function () {
            this.countNum += 1;
            this.renderCount();
        },
        getReqId: function () {
            return this.getLocationParam("req_id") || '';
        },
        getLocationParam: function(param) {
            var adRequest = {
                QueryString : function(val) {
                    var uri = window.location.href;
                    var re = new RegExp("[&\?]{1}" +val+ "=([^&?]*)", "ig");
                    return ((uri.match(re))?(decodeURI(uri.match(re)[0].substr(val.length + 2))):'');
                }
            };
            return adRequest.QueryString(param);
        }
    });

    exports.init = function(el, showJump, successUrl, failedUrl, successmsg, isShowCount, countText, countNum, countPos, telAutoFill, formId) {
        var formInstance = new Form($(el), showJump, successUrl, failedUrl, successmsg, isShowCount, countText, countNum, countPos, telAutoFill,formId);
        return formInstance;
    };
});
