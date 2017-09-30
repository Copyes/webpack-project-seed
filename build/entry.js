/**
 * 获取文件路径下的所有文件
 * @param  {[type]} globalPath 文件目录
 * @param  {[type]} cutPath    要去掉的部分
 * @return {[type]}            所有的文件路径
 */
const glob = require('glob')
const path = require('path')

const GLOB_FILE_PATH = './src/pages/**/index.js'
const CUT_PATH = './src/pages/'

exports.getEntries = function(argv){
    let  paths = glob.sync(GLOB_FILE_PATH)
    let  entries = {}
    // 使用方法 npm run dev -- --keyword1,keyword2  支持单文件编译
    var keywords
    try {
        argv = JSON.parse(argv).remain
        keywords = (argv.length ? argv[0].slice(2) : '').split(',')
    } catch (e){
        keywords = []
    }
    paths = paths.filter((value) => {
        for (let i = 0; i < keywords.length; i++){
            if (value.indexOf(keywords[i]) !== -1){
                return true
            }
        }
        return false
    })

    for (let i = 0; i < paths.length; i++){
        let pathName = path.dirname(paths[i]).replace(new RegExp('^' + CUT_PATH), '')
        entries[pathName] = paths[i]
    }
    return entries
}