(function ($) {
    var defaultCfg = {
        format: '000,000,000',
        update: false,
        timeout: 100,
        numberclass: 'number',
        symbolclass: 'symbol',
        getData: function () {
            return 0;
        }
    };
    $.fn.RuntimeSum = function (args) {
        this.data(args);

        return this.each(function () {
            var t = $(this);
            switch (args) {
                case 'destory':
                    t.data({
                        'init-runtime-sum': false,
                        'update': false
                    });
                    return;
            }
            if (t.data('init-runtime-sum')) {
                return;
            }
            else {
                t.data('init-runtime-sum', true);
            }

            var cfg = $.extend({}, defaultCfg, t.data());
            var last_num = '';
            var nc = cfg.numberclass;
            var sc = cfg.symbolclass;
            var run = function run () {
                var num = Number(cfg.getData.call(t)) || 0;
                if (num !== last_num) {
                    last_num = num;
                    var str = '' + num;
                    var format = cfg.format;
                    var lackLen = str.length - format.match(/\d/g).length;
                    var index = 0;

                    t.html(format.replace(/./g, function (c) {
                        if (/\d/.test(c)) {
                            var d = str.charAt(lackLen + index) | 0;
                            index++;
                            return '<span class="' + nc + ' ' + nc + '-' + d + '">' + d + '</span>';
                        }
                        return '<span class="' + sc + '">' + c + '</span>';
                    }));
                }
                if (t.data('update')) {
                    setTimeout(run, cfg.timeout);  
                }
            };

            run();

        });
    };
})(jQuery)