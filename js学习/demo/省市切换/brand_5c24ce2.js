(function($) {
    function Brand($parent, options) {
        this.tpl = [
            '<div class="tt-brand">',
            '<div class="brandtest"></div>',
            // '<div class="icon">icon</div>',
            '<div class="text">',
            '<span class="">今日头条建站，免费制作您的移动站点</span>',
            '</div>',
            '</div>'
        ].join('');

        this.$parent = $parent;
        this.$el = $(this.tpl);
        this.$parent.append(this.$el);


        this.showTime = 2000;
        this.showGapTime = 1000 * 86400;

        if(this.isVisible()){
            this.init();
            this.bindEvent();
        }
    }

    Brand.prototype = {
        init: function() {
            var u = navigator.userAgent;
            this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        },
        scrolledValue: function(oDocument) {
            oDocument = oDocument || document;
            var dd = oDocument.documentElement;
            var db = oDocument.body;
            return Math.max(window.pageYOffset || 0, dd.scrollTop, db.scrollTop)
        },
        bindEvent: function() {
            var that = this;
            var winHeight = $(window).height();
            var docHeight = $(document).height();

            $(document).on('readystatechange', function() {
                if (document.readyState === "complete") {
                    docHeight = $(document).height();
                    // winHeight = $(window).height();
                }
            });


            var debounce = function(func, wait, immediate) {
                var timeout, args, context, timestamp, result;

                var later = function() {
                    var last = +new Date - timestamp;

                    if (last < wait && last >= 0) {
                        timeout = setTimeout(later, wait - last);
                    } else {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                            if (!timeout) context = args = null;
                        }
                    }
                };

                return function() {
                    context = this;
                    args = arguments;
                    timestamp = +new Date;
                    var callNow = immediate && !timeout;
                    if (!timeout) timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                        context = args = null;
                    }

                    return result;
                };
            };
            var hideTimer;
            var lastShow = 0;
            var showBrand = function() {
                var scrollY = (that.scrolledValue() + $(window).height()).toFixed(0);
                // $(that.$el.find('.brandtest')).html(scrollY + '---' + docHeight +'---');


                var now = +new Date;
                if (scrollY >= docHeight && (now - lastShow > that.showGapTime)) {
                    lastShow = +new Date;
                    that.$el.removeClass('showOnce');
                    var temp = that.$el.clone(true);
                    that.$el.before(temp);
                    that.$el.remove();
                    that.$el = temp;
                    that.$el.addClass('showOnce');
                    if (hideTimer) {
                        clearTimeout(hideTimer);
                    }
                    hideTimer = setTimeout(function() {
                        console.log('hide1!!!')
                        that.$el.hide();
                        that.$el.removeClass('showOnce');
                        that.$el.show();
                        clearTimeout(hideTimer);
                    }, that.showTime);
                }
            };


            //针对安卓
            //安卓滑动到底部就不能再出发scroll事件了
            if (this.isAndroid) {
                $(window).swipeDown(debounce(showBrand, 300));
            }


            var showBrand2 = function() {
                if (that.$el.hasClass('showOnce')) return;
                var scrollY = (that.scrolledValue() + $(window).height()).toFixed(0);
                // $(that.$el.find('.brandtest')).html($(that.$el.find('.brandtest')).html() + 'show');
                // console.log(+new Date);

                var now = +new Date;
                if (scrollY >= docHeight && (now - lastShow > that.showGapTime)) {
                    lastShow = +new Date;
                    // console.log('show');
                    // $(that.$el.find('.brandtest')).html('once');
                    that.$el.addClass('showOnce');
                    hideTimer = setTimeout(function() {
                        console.log('hide1!!!')
                        that.$el.hide();
                        that.$el.removeClass('showOnce');
                        that.$el.show();
                        clearTimeout(hideTimer);
                    }, that.showTime);
                }
            }
            if (this.isiOS) {
                $(window).on('scroll', debounce(showBrand2, 300));
            }
        },
        //针对特殊情况，本标签不想让人看到
        isVisible: function(){
            var get_dialog_ua = navigator.userAgent.match(/RevealType\/Dialog/i);
            var isWebviewDialogUrl = function(){
                var str, reg = /(revealType)(\=)(\w+)/g;
                    str = window.location.href.match(reg);
                var parameter = (str && str[0]) ? str[0].split('=') : [];
                if (parameter[0] && parameter[0] === 'revealType' && parameter[1] && parameter[1] === 'dialog') {
                    return true;
                } else {
                    return false;
                }
            };
            return !(get_dialog_ua || isWebviewDialogUrl());
        }
    }
    new Brand($("body"), {});
})(Zepto);
