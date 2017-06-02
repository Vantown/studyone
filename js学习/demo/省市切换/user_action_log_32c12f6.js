(function(win, doc) {

    if (win._uacq) {
        return;
    }

    var utils = {
        isArray: function(arr) {
            return Object.prototype.toString.call(arr) === '[object Array]';
        },
        isToutiao: function() {
            var istt = document.referrer == 'http://nativeapp.toutiao.com' || /(News|NewsSocial|Explore|NewsArticle)( |\/)(\d.\d.\d)/i.test(navigator.userAgent);
            return istt;
        },
        getLocationParam: function(param) {
            var adRequest = {
                QueryString: function(val) {
                    var uri = window.location.href;
                    var re = new RegExp("" + val + "=([^&?]*)", "ig");
                    return ((uri.match(re)) ? (decodeURI(uri.match(re)[0].substr(val.length + 1))) : '');
                }
            };
            return adRequest.QueryString(param);
        },
        queryToJson: function(url) {
            var query = url.substr(url.lastIndexOf('?') + 1),
                params = query.split('&'),
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
        jsonToQuery: function(json) {
            var ret = [];
            json = json || {};
            var re = /^(?:string|boolean|number)/i;
            for (var p in json) {
                if (json.hasOwnProperty(p) ) {
                    if(re.test(typeof json[p]) ){
                        ret.push(p + '=' + json[p]);

                    }
                    if(utils.isArray(json[p])){
                        ret.push(p + '=' + JSON.stringify(json[p]) );
                    }
                }
            }
            return ret.join('&');
        },
        extend: function(src, dst) {
            for (var o in dst) {
                src[o] = dst[o];
            }
        },
        getAdId: function() {
            var adId = utils.getLocationParam('_tt_ad_id') || utils.getLocationParam('ad_id') || 0; // || utils.getLocationParam('aid');
            return adId;
        },
        getReqId: function() {
            return utils.getLocationParam("req_id") || '';
        },
        getCid: function() {
            return utils.getLocationParam("cid") || '';
        },
        encodeParams: function(json) {
            var arr = [];
            json = json || {};
            var re = /^(?:string|boolean|number)/i;
            for (var key in json) {
                if (json.hasOwnProperty(key) && re.test(typeof json[key])) {
                    var val = decodeURIComponent(json[key]);
                    arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
                }
            }
            return arr.join('&');
        },
        syncGet: function(options) {
            var request = new XMLHttpRequest();
            request.open('GET', options.url, false);
            request.withCredentials = true;
            request.send(null);
        },
        imageGet: function(options) {
            var image = new Image();
            image.src = window.location.protocol + options.url;
        },
        addLoadEvent: function(func) {
            var oldonload = window.onload;
            if (typeof window.onload != 'function') {
                window.onload = func;
            } else {
                window.onload = function() {
                    oldonload();
                    func();
                };
            }
        },
        getSiteId: function() {
            var pathname = window.location.pathname,
                reg = /\d+/g;
            var regPathnameRs = pathname.match(reg) || [];
            return regPathnameRs[0] || '';
        },
        setToSessionStorage: function(key, value) {
            var storage = window.sessionStorage;
            storage.setItem(key, value);
        },
        getFromSessionStorage: function(key) {
            var storage = window.sessionStorage;
            return storage.getItem(key);
        }
    };
    // var g_req_id = ''; //request_id
    var g_device_id = '';
    var g_user_id = '';
    var g_cid = ''; //创意ID
    var g_site_id = utils.getSiteId(); //仅仅针对建站

    win._uacq = {

        user_action_queue: [],
        add: function(obj) {
            this.user_action_queue.push(obj);
            if (!obj.event_type) {
                console.log('event_type is null');
                return;
            }
        },

        _assembleData: function() {
            var send_data_obj = {},
                that = this;
            utils.extend(send_data_obj, that._getDeviceInfo());
            utils.extend(send_data_obj, that._getPageInfo());
            send_data_obj.events = that.user_action_queue;
            return send_data_obj;
        },
        _getPageInfo: function() {
            var pInfo = {};
            // pInfo.req_id = utils.getReqId() || g_req_id;
            g_cid = g_cid || utils.getFromSessionStorage('_tt_cid');
            pInfo.cid = utils.getCid() || g_cid;
            pInfo.site_id = g_site_id; //仅针对建站
            pInfo.ad_id = utils.getAdId();
            return pInfo;
        },
        _getDeviceInfo: function() {
            var rst = {};
            g_device_id = g_device_id || utils.getFromSessionStorage('_tt_device_id');
            g_user_id = g_user_id || utils.getFromSessionStorage('_tt_user_id');
            rst.device_id = g_device_id;
            rst.user_id = g_user_id;
            return rst;
        },
    };

    $(window).unload(function() {
        var url = '';
        try{
            var send_data_obj = win._uacq._assembleData();
            if(send_data_obj.events.length){
                url = '/tetris/save_user_action_log/';
                url += '?' + utils.jsonToQuery(send_data_obj);
                utils.imageGet({
                    url: url
                });
            }

        }catch(e){
        }
    });

})(window, document);
