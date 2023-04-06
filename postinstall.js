var readline = require('readline');
var recursiveCopy = require('recursive-copy')

var fs = require('fs'),
    stat = fs.stat;
/*
05
 * 复制目录中的所有文件包括子目录1
06
 * @param{ String } 需要复制的目录
07
 * @param{ String } 复制到指定的目录
08
 */
var distFolder = '../../'

var copy = function (src, dst) {

    // 读取目录中的所有文件/目录
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err;
        }
        paths.forEach(function (path) {
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;
            let flag = true
            ignores.forEach(function (ignore) {
                if (_src.indexOf(ignore) > -1) {
                    flag = false;
                }
            })
            if (flag) {
                stat(_src, function (err, st) {
                    if (err) {
                        throw err;
                    }
                    // 判断是否为文件
                    if (st.isFile()) {
                        compareFile(_src, _dst, function (status) {
                            //只有发生过修改的文件，才覆盖
                            if (status) {
                                var backFileName = _dst.replace(distFolder, '')
                                console.log('变更文件：', backFileName);
                                if (status == 'modify') {
                                    // recursiveCopy(_dst, backFilePath + backFileName, {
                                    //     overwrite: true,
                                    // }, function (error, results) {
                                    //     // 创建读取流
                                    //     readable = fs.createReadStream(_src);
                                    //     // 创建写入流
                                    //     writable = fs.createWriteStream(_dst);
                                    //     // 通过管道来传输流
                                    //     readable.pipe(writable);
                                    // })
                                } else if (status == 'add') {
                                    // 创建读取流
                                    readable = fs.createReadStream(_src);
                                    // 创建写入流
                                    writable = fs.createWriteStream(_dst);
                                    // 通过管道来传输流
                                    readable.pipe(writable);
                                }
                            }
                        })
                    }
                    // 如果是目录则递归调用自身
                    else if (st.isDirectory()) {
                        exists(_src, _dst, copy);
                    }
                });
            }
        });
    });
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function (src, dst, callback) {
    fs.exists(dst, function (exists) {
        // 已存在
        if (exists) {
            callback(src, dst);
        }
        // 不存在
        else {
            fs.mkdir(dst, function () {
                callback(src, dst);
            });
        }
    });
};

/*
* 按行读取文件内容
* 返回：字符串数组
* 参数：fReadName:文件名路径
*      callback:回调函数
* */
var readFileToArr = function (fReadName, callback) {
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input: fRead
    });
    var arr = new Array();
    objReadline.on('line', function (line) {
        arr.push(line);
    });
    objReadline.on('close', function () {
        callback(arr);
    });
}

//文件内容比较
var compareFile = function (newFilePath, oldFilePath, callback) {
    readFileToArr(newFilePath, function (newLines) {
        fs.exists(oldFilePath, function (exists) {
            if (exists) {
                readFileToArr(oldFilePath, function (oldLines) {
                    let isModify = false
                    for (var i = 0; i < newLines.length; i++) {
                        if (newLines[i] != oldLines[i]) {
                            isModify = true
                            break;
                        }
                    }
                    callback(isModify ? 'modify' : '')
                })
            } else {
                callback('add')
            }
        });

    })
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//忽略复制的文件
var ignores = [
    "postinstall.js",
    // "package.json",
    "Jenkinsfile",
    ".vscode",
    ".npmrc"
]

//=====先注释了，逻辑不是很清晰====
// console.log('__dirname', __dirname)

fs.exists("../../../vite.config.ts", function (isExists) {
    console.log('vite.config.ts存在:' + isExists)
    if (!isExists) {
        var nowDate = new Date().Format("yyyyMMddHHmmss")
        var backFilePath = distFolder + "/backFile/" + nowDate + '/'
        console.log("下载文件：" + backFilePath.replace(distFolder, ''))
        exists(__dirname, distFolder, copy);
    }
})
// if (__dirname.indexOf("node_modules") != -1) {
//     // 复制目录
//     // var distFolder = '../../../'
//     // var nowDate = new Date().Format("yyyyMMddHHmmss")
//     // var backFilePath = distFolder + "/backFile/" + nowDate + '/'
//     // console.log("本次更新备份路径为：" + backFilePath.replace(distFolder, ''))
//     // exists(__dirname, distFolder, copy);
// }
