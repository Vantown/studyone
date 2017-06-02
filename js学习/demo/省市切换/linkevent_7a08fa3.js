$(document.body).on('click', 'a', function(e) {
    var target = e.currentTarget;
    var $target = $(e.currentTarget);
    var href = $target.attr('href');
    var REG_INDEX = /tetris\/page\/index\/(\d{6})\/?\d*/;
    var GET_PREFIX = /(.*page\/)index\/\d{6}\/?/;
    try {
        if (REG_INDEX.test(href)) {
            var idx = +href.match(REG_INDEX)[1];
            var page_id = GLOBAL_VAR.pageid_map[idx];

            if (GET_PREFIX.test(href)) {
                var prefix = href.match(GET_PREFIX)[1];
                target.href = prefix + page_id + '/';
            }
        }
    } catch (e) {

    }
});