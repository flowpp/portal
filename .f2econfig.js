const path = require('path')

module.exports = {
    // host: 'f2e.local.cn',
    /**
     * 是否开启自动刷新, 默认为 true
     * @type {Boolean}
     */
    livereload: true,
    /**
     * 使用 less 编译为css, 使用 less 配置
     * @type {Object}
     */
    useLess: {
        compress: false
    },
    buildFilter: function(path){
        var regs = [
            /^(js|css|img|fonts)(\/.*)?/,
            /^(index\.html|favicon\.ico)?($|\?.*)/
        ];

        for (var i = 0; i < regs.length; i++) {
            if (regs[i].test(path)) {
                return true;
            }
        }
        return false;
    },
    outputFilter: function(path){
        var regs = [
            /^(js|css)(\/index\.*|$)/,
            /^(img|fonts)(\/.*)?/,
            /^(index\.html|favicon\.ico)?($|\?.*)/
        ];

        for (var i = 0; i < regs.length; i++) {
            if (regs[i].test(path)) {
                return true;
            }
        }
        return false;
    },
    middlewares: [
        (conf) => ({
            onSet (pathname, data) {
                if (pathname.match(/^(index)\b/)) {
                    let str = data.toString()
                    try {
                        str = require('lodash').template(str)()
                    } catch (e) {
                        console.log(pathname, e)
                    }
                    return str
                }
            }
        })
    ],
    /**
     * 是否支持 gzip
     * @type {Boolean}
     */
    gzip: true,
    /**
     * 资源数据目录, 未设置的时候 build 中间件不开启
     * @type {local-url}
     */
    output: path.resolve(__dirname, '../flow-portal-out')
}
