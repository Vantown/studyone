!function(t,e){function n(){var n=t._page_type?t._page_type:0,r=t._tt_config,o={FAIL:0,UNUSE:1,SUCCESS:2},i="",a="",s=20,u=null,c="",d="",g="",f="",l="",p="",_="",v=o.UNUSE,m=o.UNUSE,h=t.ToutiaoJSBridge||{},S={getOS:function(){var t={ipad:/ipad/gi.test(navigator.appVersion),iphone:/iphone/gi.test(navigator.appVersion),android:/android/gi.test(navigator.userAgent),nexusS:-1!=window.navigator.userAgent.indexOf(/Nexus\s*S/gi),miui:/MiuiBrowser/i.test(navigator.userAgent),huaWei:/huawei/i.test(navigator.userAgent),safari:/Safari/i.test(navigator.userAgent)&&/iPhone\sOS/.test(navigator.userAgent),weixin:/MicroMessenger/gi.test(navigator.userAgent),UC:/UC/i.test(navigator.userAgent)||/UC/i.test(navigator.appVersion),Baidu:/baidubrowser/i.test(navigator.userAgent)||/baiduboxapp/i.test(navigator.userAgent),QQ:/QQBrowser/i.test(navigator.userAgent)},e="";for(var n in t)t[n]&&(e=n);return e},isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},isToutiao:function(){var t="http://nativeapp.toutiao.com"==document.referrer||/(News|NewsSocial|Explore|NewsArticle|NewsInHouse|joke_essay|Joke|Video|VideoInHouse|VideoArticle)( |\/|_)(\d.\d.\d)/i.test(navigator.userAgent);return t},getLocationParam:function(t){var e={QueryString:function(t){var e=window.location.href,n=new RegExp("[&?]{1}"+t+"=([^&?|^#?]*)","ig");return e.match(n)?decodeURI(e.match(n)[0].substr(t.length+2)):""}};return e.QueryString(t)},queryToJson:function(t){for(var e,n,r,o,i=t.substr(t.lastIndexOf("?")+1),a=i.split("&"),s=a.length,u={},c=0;s>c;c++)a[c]&&(o=a[c].split("="),e=o[0],n=o[1],r=u[e],"undefined"==typeof r?u[e]=n:this.isArray(r)?r.push(n):u[e]=[r,n]);return u},jsonToQuery:function(t){var e=[];t=t||{};var n=/^(?:string|boolean|number)/i;for(var r in t)t.hasOwnProperty(r)&&n.test(typeof t[r])&&e.push(r+"="+t[r]);return e.join("&")},extend:function(t,e){for(var n in e)t[n]=e[n]},getAdId:function(){var t=S.getLocationParam("_tt_ad_id")||S.getLocationParam("ad_id")||S.getLocationParam("aid");return t},getReqId:function(){return S.getLocationParam("req_id")||""},getCid:function(){return S.getLocationParam("cid")||""},getWebUrlInfo:function(){var t,e=window.decodeURIComponent(S.getLocationParam("_toutiao_params")||"");try{t=JSON.parse(e)}catch(n){}return t},encodeParams:function(t){var e=[];t=t||{};var n=/^(?:string|boolean|number)/i;for(var r in t)if(t.hasOwnProperty(r)&&n.test(typeof t[r])){var o=decodeURIComponent(t[r]);e.push(encodeURIComponent(r)+"="+encodeURIComponent(o))}return e.join("&")},jsonp:function(t){if(t=t||{},!t.url||!t.callback)throw new Error("参数不合法");var e=("jsonp_"+Math.random()).replace(".",""),n=document.getElementsByTagName("head")[0];t.data[t.callback]=e;var r=this.encodeParams(t.data),o=document.createElement("script");n.appendChild(o),window[e]=function(r){n.removeChild(o),clearTimeout(o.timer),window[e]=null,t.success&&t.success(r)},o.src=t.url+"?"+r,t.time&&(o.timer=setTimeout(function(){window[e]=null,n.removeChild(o),t.fail&&t.fail({message:"超时"})},t.time))},syncGet:function(t){var e=new XMLHttpRequest;e.open("GET",t.url,!1),e.withCredentials=!0,e.send(null)},imageGet:function(t){var e=new Image;e.src=window.location.protocol+t.url},addLoadEvent:function(t){var e=window.onload;window.onload="function"!=typeof window.onload?t:function(){e(),t()}},getSiteId:function(){var t=window.location.pathname,e=/\d+/g,n=t.match(e)||[];return n[0]||""},setToSessionStorage:function(t,e){var n=window.sessionStorage;n.setItem(t,e)},getFromSessionStorage:function(t){var e=window.sessionStorage;return e.getItem(t)}},y={getChildrenIndex:function(t){if(t.sourceIndex)return t.sourceIndex-t.parentNode.sourceIndex-1;for(var e=0;t=t.previousElementSibling;)e++;return e},getXPath:function(t){for(var e="";t.length;){var n=Array.prototype.pop.apply(t);if(n&&n.tagName&&"body"!=n.tagName.toLowerCase()&&"html"!=n.tagName.toLowerCase()){var r=n.id?"#"+n.id:"";e+=n.tagName.toLowerCase()+this.getChildrenIndex(n)+r+(0==t.length?"":">")}}return e},getElementByAttr:function(t,e){if("string"==typeof t&&(t=document.getElementById(t)),t||(t=document),t.querySelectorAll){var n=t.querySelectorAll("["+e+"]");return n=Array.prototype.slice.call(n)}for(var r=t.getElementsByTagName("*"),o=r.length,i=0,a=[];o>i;i++){var s=r[i];s.getAttribute(e)&&a.push(s)}return a},getPerformanceObj:function(){if(!window.performance)return"";var t=performance.timing;return t},getDomCount:function(){return document.getElementsByTagName("*").length},getElementParentsAndSelf:function(t){var e=this.getElementParents(t);return e.unshift(t),e},getElementParents:function(t){for(var e=[];t;)t=t.parentNode,t&&e.push(t);return e},delegate:function(t,e,n,r){function o(e){var o=/^\[(.*)\]$/,a=window.event?window.event:e,s=a.target||a.srcElement;if(o.test(n))for(var u=n.match(o)[1],c=y.getElementByAttr(t,u),d=s;d;){if(i.inElement(d,c)){r.call(s,a);break}d=d.parentNode}}if("string"==typeof t&&(t=document.getElementById(t)),t||(t=document),n&&"function"==typeof r){var i=this;t[e]=o}},inElement:function(t,e){for(var n=e.length,r=0;n>r;r++)if(t==e[r])return!0;return!1}};!function(t){"use strict";function e(t,e){var n=(65535&t)+(65535&e),r=(t>>16)+(e>>16)+(n>>16);return r<<16|65535&n}function n(t,e){return t<<e|t>>>32-e}function r(t,r,o,i,a,s){return e(n(e(e(r,t),e(i,s)),a),o)}function o(t,e,n,o,i,a,s){return r(e&n|~e&o,t,e,i,a,s)}function i(t,e,n,o,i,a,s){return r(e&o|n&~o,t,e,i,a,s)}function a(t,e,n,o,i,a,s){return r(e^n^o,t,e,i,a,s)}function s(t,e,n,o,i,a,s){return r(n^(e|~o),t,e,i,a,s)}function u(t,n){t[n>>5]|=128<<n%32,t[(n+64>>>9<<4)+14]=n;var r,u,c,d,g,f=1732584193,l=-271733879,p=-1732584194,_=271733878;for(r=0;r<t.length;r+=16)u=f,c=l,d=p,g=_,f=o(f,l,p,_,t[r],7,-680876936),_=o(_,f,l,p,t[r+1],12,-389564586),p=o(p,_,f,l,t[r+2],17,606105819),l=o(l,p,_,f,t[r+3],22,-1044525330),f=o(f,l,p,_,t[r+4],7,-176418897),_=o(_,f,l,p,t[r+5],12,1200080426),p=o(p,_,f,l,t[r+6],17,-1473231341),l=o(l,p,_,f,t[r+7],22,-45705983),f=o(f,l,p,_,t[r+8],7,1770035416),_=o(_,f,l,p,t[r+9],12,-1958414417),p=o(p,_,f,l,t[r+10],17,-42063),l=o(l,p,_,f,t[r+11],22,-1990404162),f=o(f,l,p,_,t[r+12],7,1804603682),_=o(_,f,l,p,t[r+13],12,-40341101),p=o(p,_,f,l,t[r+14],17,-1502002290),l=o(l,p,_,f,t[r+15],22,1236535329),f=i(f,l,p,_,t[r+1],5,-165796510),_=i(_,f,l,p,t[r+6],9,-1069501632),p=i(p,_,f,l,t[r+11],14,643717713),l=i(l,p,_,f,t[r],20,-373897302),f=i(f,l,p,_,t[r+5],5,-701558691),_=i(_,f,l,p,t[r+10],9,38016083),p=i(p,_,f,l,t[r+15],14,-660478335),l=i(l,p,_,f,t[r+4],20,-405537848),f=i(f,l,p,_,t[r+9],5,568446438),_=i(_,f,l,p,t[r+14],9,-1019803690),p=i(p,_,f,l,t[r+3],14,-187363961),l=i(l,p,_,f,t[r+8],20,1163531501),f=i(f,l,p,_,t[r+13],5,-1444681467),_=i(_,f,l,p,t[r+2],9,-51403784),p=i(p,_,f,l,t[r+7],14,1735328473),l=i(l,p,_,f,t[r+12],20,-1926607734),f=a(f,l,p,_,t[r+5],4,-378558),_=a(_,f,l,p,t[r+8],11,-2022574463),p=a(p,_,f,l,t[r+11],16,1839030562),l=a(l,p,_,f,t[r+14],23,-35309556),f=a(f,l,p,_,t[r+1],4,-1530992060),_=a(_,f,l,p,t[r+4],11,1272893353),p=a(p,_,f,l,t[r+7],16,-155497632),l=a(l,p,_,f,t[r+10],23,-1094730640),f=a(f,l,p,_,t[r+13],4,681279174),_=a(_,f,l,p,t[r],11,-358537222),p=a(p,_,f,l,t[r+3],16,-722521979),l=a(l,p,_,f,t[r+6],23,76029189),f=a(f,l,p,_,t[r+9],4,-640364487),_=a(_,f,l,p,t[r+12],11,-421815835),p=a(p,_,f,l,t[r+15],16,530742520),l=a(l,p,_,f,t[r+2],23,-995338651),f=s(f,l,p,_,t[r],6,-198630844),_=s(_,f,l,p,t[r+7],10,1126891415),p=s(p,_,f,l,t[r+14],15,-1416354905),l=s(l,p,_,f,t[r+5],21,-57434055),f=s(f,l,p,_,t[r+12],6,1700485571),_=s(_,f,l,p,t[r+3],10,-1894986606),p=s(p,_,f,l,t[r+10],15,-1051523),l=s(l,p,_,f,t[r+1],21,-2054922799),f=s(f,l,p,_,t[r+8],6,1873313359),_=s(_,f,l,p,t[r+15],10,-30611744),p=s(p,_,f,l,t[r+6],15,-1560198380),l=s(l,p,_,f,t[r+13],21,1309151649),f=s(f,l,p,_,t[r+4],6,-145523070),_=s(_,f,l,p,t[r+11],10,-1120210379),p=s(p,_,f,l,t[r+2],15,718787259),l=s(l,p,_,f,t[r+9],21,-343485551),f=e(f,u),l=e(l,c),p=e(p,d),_=e(_,g);return[f,l,p,_]}function c(t){var e,n="",r=32*t.length;for(e=0;r>e;e+=8)n+=String.fromCharCode(t[e>>5]>>>e%32&255);return n}function d(t){var e,n=[];for(n[(t.length>>2)-1]=void 0,e=0;e<n.length;e+=1)n[e]=0;var r=8*t.length;for(e=0;r>e;e+=8)n[e>>5]|=(255&t.charCodeAt(e/8))<<e%32;return n}function g(t){return c(u(d(t),8*t.length))}function f(t,e){var n,r,o=d(t),i=[],a=[];for(i[15]=a[15]=void 0,o.length>16&&(o=u(o,8*t.length)),n=0;16>n;n+=1)i[n]=909522486^o[n],a[n]=1549556828^o[n];return r=u(i.concat(d(e)),512+8*e.length),c(u(a.concat(r),640))}function l(t){var e,n,r="0123456789abcdef",o="";for(n=0;n<t.length;n+=1)e=t.charCodeAt(n),o+=r.charAt(e>>>4&15)+r.charAt(15&e);return o}function p(t){return unescape(encodeURIComponent(t))}function _(t){return g(p(t))}function v(t){return l(_(t))}function m(t,e){return f(p(t),p(e))}function h(t,e){return l(m(t,e))}function S(t,e,n){return e?n?m(e,t):h(e,t):n?_(t):v(t)}t.md5=S}(this);var w={getPrefix:function(t){var e="";try{e=t.split("_")[0]}catch(n){}return e},traversal:function(t,e,n,r,o){if(t&&1===t.nodeType&&!(n>=r)){var i="",a=this.getPrefix(e);o(e);for(var s,u=0,c=t.childNodes,d=0;u<c.length;u++)s=c[u],s&&1===s.nodeType&&(i=a+","+d+"_"+s.tagName,this.traversal(s,i,n+1,r,o),++d)}}};_=n?S.getSiteId():"",t._taq={push:function(t){var e={};return t.event_type?(e=this._assembleData(t),this._send_log(e),void(S.isToutiao()&&I.initFromSessionStorage())):void console.log("event_type is null")},getFromTTBridge:function(t,e){"adInfo"==t?v=o.FAIL:"appInfo"==t&&(m=o.FAIL),"function"==typeof h.call&&h.call(t,{},function(n){"adInfo"==t?v=o.SUCCESS:"appInfo"==t&&(m=o.SUCCESS),e(n)})},_send_log:function(t){var e={out:"//isub.snssdk.com/2/wap/landing_tetris_log/","in":"//ad.toutiao.com/tetris/landing/log/"},r=n?e.in:e.out;r+="?"+S.jsonToQuery(t);try{S.syncGet({url:r})}catch(o){}},_assembleData:function(e){var r={},o={},i={},s="",c=this;for(var d in e)if("target"==d){var g=c._getPosition(e[d]);S.extend(r,g)}else r[d]=e[d];try{o=JSON.parse(e.options||"{}")}catch(f){console.log("options 必须为JSON格式字符串"),o.other=e.options}return"performance"===e.event_type&&(o.performance=y.getPerformanceObj()),"xpath"===e.event_type&&(o.dom_md5=a),r.options=o,r.log_extra=u||"{}",r.os=S.getOS(),r.page_url=r.page_url||t.location.href,r.page_type=r.page_type||n,S.extend(i,c._getDeviceInfo()),S.extend(i,c._getPageInfo()),s=window.encodeURIComponent(JSON.stringify([r])),S.extend(i,{track_data:s}),i.tt_bridge=100+10*v+m,i},_getPageInfo:function(){var t={};return t.req_id=c||S.getReqId(),t.cid=l||S.getCid(),t.site_id=_,t.ad_id=S.getAdId(),t},_getDeviceInfo:function(){var t={};return t.device_id=d,t.user_id=g,t.client_version=f,t},_getPosition:function(n){if(n){var r=t.innerWidth||e.body.clientWidth,o=n.offsetLeft,i=n.offsetHeight,a=320,s=y.getElementParentsAndSelf(n),u={ox:o,oy:i,tx:~~(o*a/r),ty:~~(i*a/r),xpath:y.getXPath(s)};return u}}};var I={initFlags:function(){v=o.FAIL,m=o.FAIL},initMd5:function(){w.traversal(e.body,"0_body",0,s,function(t){i+=t}),a=md5(i)},bindEvent:function(){var t=this;e.addEventListener("click",function(o){for(var i=o.target,a=i;i!=e;)i.hasAttribute("tt-data-click")&&t._sendTargetMsg(i),i=i.parentNode;if(i==e&&!r){var s={};s.target=a,s.event_type="xpath",s.page_url=location.href,s.page_type=n,s.convert_id=p,_taq.push(s)}},!1)},getInfoFromUrl:function(){var t=S.getWebUrlInfo();return t?(c=t.req_id||"",p=t.convert_id||"",l=t.cid||"",g=t.uid||"",d=t.device_id||"",u=t.log_extra||"",!0):!1},initFromSessionStorage:function(){a+"ad"===S.getFromSessionStorage("_tt_ad_info_success")||o.SUCCESS==v?(c=c||S.getFromSessionStorage("_tt_req_id"),l=l||S.getFromSessionStorage("_tt_cid"),p=p||S.getFromSessionStorage("_tt_convert_id"),u=u||S.getFromSessionStorage("_tt_log_extra"),v=o.UNUSE):_taq.getFromTTBridge("adInfo",function(t){var e;t=t||{},"string"==typeof t&&(t=JSON.parse(t)),l=t.cid||t.ad_id||"",e=JSON.parse(t.log_extra||"{}"),c=e.req_id||"",p=e.convert_id||"",u=t.log_extra||"{}",S.setToSessionStorage("_tt_ad_info_success",a+"ad"),S.setToSessionStorage("_tt_cid",l),S.setToSessionStorage("_tt_req_id",c),S.setToSessionStorage("_tt_convert_id",p),S.setToSessionStorage("_tt_log_extra",u)}),a+"app"===S.getFromSessionStorage("_tt_app_info_success")||o.SUCCESS==m?(d=d||S.getFromSessionStorage("_tt_device_id"),g=g||S.getFromSessionStorage("_tt_user_id"),f=f||S.getFromSessionStorage("_tt_app_version"),m=o.UNUSE):_taq.getFromTTBridge("appInfo",function(t){t=t||{},d=t.device_id||"",g=t.user_id||"",f=t.appVersion||"",S.setToSessionStorage("_tt_app_info_success",a+"app"),S.setToSessionStorage("_tt_device_id",d),S.setToSessionStorage("_tt_user_id",g),S.setToSessionStorage("_tt_app_version",f)})},_sendTargetMsg:function(e){var r={};r.page_url=e.getAttribute("tt-data-url")||t.location.href,r.page_type=n,r.event_type=e.getAttribute("tt-data-eventtype")||"",r.convert_id=e.getAttribute("tt-data-convertid")||"",r.event_value=e.getAttribute("tt-data-eventvalue")||"",r.target=e,r.options=e.getAttribute("tt-data-options")||"",_taq.push(r)}};I.initMd5(),!I.getInfoFromUrl()&&S.isToutiao()&&I.initFromSessionStorage(),I.bindEvent()}function r(t,e){if(window.TetrisBridge)return e();var n=document.createElement("script");n.src=t,e=e||function(){},n.onload=n.onreadystatechange=function(){this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(e(),this.onload=this.onreadystatechange=null,this.parentNode.removeChild(this))},document.getElementsByTagName("head")[0].appendChild(n)}t._taq||(t._taq=[],r("//s3.pstatp.com/inapp/toutiao.js",function(){n()}))}(window,document);