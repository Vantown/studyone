(function ($) {
    'use strict';
    var SSLOCAL_PROTOCOL = "sslocal://webview?url=";

    function isFromToutiao() {
        return document.referrer.match('http://nativeapp.toutiao.com') || (/(News|NewsSocial|Explore|NewsArticle)(\ |\/)(\d.\d.\d)/i).test(window.navigator.userAgent);
    }

    function isHomePage() {
        var tmp,
            reg = /(homepage)(\=)(\d)/g;
        tmp = window.location.href.match(reg);
        var parameter = (tmp && tmp[0]) ? tmp[0].split('=') : [];
        if (parameter[0] && parameter[0] === 'homepage' && parameter[1] && parameter[1] === '1') {
            return true;
        } else {
            return false;
        }
    }

    function onClickHandler(ev) {
        var $target, targetUrl, reg = /^(http|https)(:\/\/)/i;
        $target = $(ev.target);
        if ($target.attr('href') && reg.test($target.prop('href'))) {
            ev.preventDefault();
            targetUrl = SSLOCAL_PROTOCOL + $target.prop('href');
            window.open(targetUrl);
        }
    }

    function init() {
        if (isFromToutiao() && isHomePage()) {
            $(document).on('click', 'a', onClickHandler);
        }
    }

    init();

}(window.$));
