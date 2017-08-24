const fs = require('fs')
const path = require('path')

// 页面配置常量
const config = require('./page.config.js')

let PAGES = './src/pages/'
let PAGE_NAME = ''

function error(msg){
    return console.error(msg)
}

function action(actionName, msg){
    return console.log(`> ${actionName} : ${msg}`)
}

function done(){
    return console.info('> done!!')
}
// 检查配置文件
{
    if(!config){
        return error(`配置文件缺失，请检查根目录下面的 page-config 文件`)
    }
}
// 检查参数设置

{
    let pageName = process.argv[2]
    let tempArr = pageName.split('/')
    let dirName = tempArr.slice(0, tempArr.length - 1).join('/')
    PAGES += dirName
    pageName = tempArr[tempArr.length-1]

    if(!pageName){
        return error('请输入你的页面名字～')
    }
    PAGE_NAME = pageName
}


// 检查 page 是否已经存在
{
    console.log(PAGES)
    let pagePath = path.join(PAGES, PAGE_NAME)
    let exists
    try {
        exists = fs.statSync(pagePath).isDirectory()
    }catch(e){
        exists = false
    }

    if(exists){
        return error('page 已存在')
    }else{
        fs.mkdirSync(pagePath, 0o755)
    }
}

// 写入文件
{
    let files = config.files
    for( let filePath in files ){
        let file = files[filePath]
        let file_absolute_path = path.join(PAGES, PAGE_NAME, filePath)
        action('writing file', filePath)
        fs.writeFileSync(file_absolute_path, file, {
            encoding: 'utf-8'
        })
    }
}

// done
done()