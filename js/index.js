$include["../node_modules/jquery/dist/jquery.js"];
$include["../node_modules/bootstrap/dist/js/bootstrap.js"];
$include["../node_modules/fullpage.js/dist/jquery.fullpage.js"];
(function ($) {
    // 处理各个 section 事件配置
    var all_section_config = {};
    var addSectionConfig = function (conf, index) {
        index = index || $('#flowpp-container > .section').length;
        all_section_config[index] = $.extend({
            afterLoad: function () {},
            onLeave: function () {}
        }, typeof conf === 'function' ? conf() : conf);
    };
    $.addSectionConfig = addSectionConfig;

    $(document).ready(function () {
        var container = $('#flowpp-container');
        container.children().not('.section').remove();
        var sections = container.children('.section');

        // 统一处理动画相关
        sections.find('[data-animate]').each(function () {
            var t = $(this);
            t.addClass('fade').addClass('animated');
        });

        container.fullpage({
            anchors: ['flow-index', 'flow-flowpp', 'flow-flowai', 'flow-about', 'flow-links'],
            menu: '#flow-menu',
            onLeave: function(index, nextIndex, direction){
                var section = sections.eq(index - 1);
                // 统一恢复动画
                section.find('[data-animate]').each(function () {
                    var t = $(this);
                    var animateName = t.data('animate');
                    t.addClass('fade').removeClass(animateName);
                });
                // 分别执行指定section事件
                var conf = all_section_config[index];
                conf && conf.onLeave && conf.onLeave(section);
            },
            afterLoad: function(anchorLink, index){
                var section = sections.eq(index - 1);
                // 统一处理动画
                section.find('[data-animate]').each(function () {
                    var t = $(this);
                    var animateName = t.data('animate');
                    var delay = t.data('delay') | 0;
                    setTimeout(function () {
                        t.removeClass('fade').addClass(animateName);
                    }, delay);
                });
                // 分别执行指定section事件
                var conf = all_section_config[index];
                conf && conf.onLeave && conf.afterLoad(section);
            },
        });
    });
})(jQuery);