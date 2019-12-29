/**
 * description: 将obvious的源码复制到demo的node_modules下
 *              在obvious工程根目录下执行npm run build后将会执行此文件
 */

const fs = require( 'fs' );
const path = require('path');

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
    fs.access(dist, function(err){
        if(err){
            // 目录不存在时创建目录
            fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });

    function _copy(err, src, dist) {
        if(err){
            callback(err);
        } else {
            fs.readdir(src, function(err, paths) {
                if(err){
                    callback(err);
                } else {
                    paths.forEach(function(path) {
                        var _src = src + '/' + path;
                        var _dist = dist + '/' + path;
                        fs.stat(_src, function(err, stat) {
                            if(err){
                                callback(err);
                            } else {
                                // 判断是文件还是目录
                                if(stat.isFile() && path !== 'package.json') {
                                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                                } else if(stat.isDirectory()) {
                                    // 当是目录是，递归复制
                                    copyDir(_src, _dist, callback);
                                }
                            }
                        });
                    });
                }
            });
        }
    }
}

copyDir(path.join(__dirname, '../../build/'), path.join(__dirname, '../node_modules/@runnan/obvious/'), () => {
    console.log('there is an error when copying the lib code to node modules of demo project');
});