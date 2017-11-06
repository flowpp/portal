const path = require('path')

module.exports = {
    livereload: true,
    useLess: true,
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
        {test: /^(index)\b/, middleware: 'template'}
    ],
    // onRoute: pathname => pathname || 'index.html',
    gzip: true,
    output: path.resolve(__dirname, '../flow-portal-out')
}
