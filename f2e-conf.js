var path = require('path');
var output_path = path.join(__dirname, '../flow-portal-out');
var dev_port = 8012;

exports["localhost"] = {
    root: __dirname,
    port: dev_port,
    buildFilter: function(path){
        var regs = [
            /\/(js|css)(\/index\..*)?($|\?.*)/,
            /\/(img|fonts)(\/.*)?/,
            /\/(index\.html|favicon\.ico)?($|\?.*)/
        ];

        for (var i = 0; i < regs.length; i++) {
            if (regs[i].test(path)) {
                return true;
            }
        }
        return false;
    },
    agent: {
        get: function (pathname) {
            if (pathname.match(/\.css$/)) {
                return {
                    host: 'localhost',
                    port: dev_port,
                    path: function () {return pathname.replace(/\.css$/, '.less')}
                }
            }
        }
    },
    output: output_path
};

exports["output_path"] = {
    root: output_path,
    welcome: 'index.html',
    port: 8013,
    runJs: false,
    gzip: true,
    cdn: true
}