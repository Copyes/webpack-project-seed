const fs = require('fs')
const path = require('path')
const PWD = process.env.PWD || process.cwd() // 兼容windows

exports.getChunksObject = function(entries) {
  return Object.keys(entries).map(pathname => {
    var templatePath = '!!ejs-full-loader!src/layout/index.html'
    try {
      let stat = fs.statSync(path.join(PWD, 'src/pages', pathname) + '/index.html')
      if (stat && stat.isFile()) {
        templatePath = `!!ejs-full-loader!src/pages/${pathname}/index.html`
      }
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e
      }
    }
    return {
      pathname,
      templatePath
    }
  })
}
