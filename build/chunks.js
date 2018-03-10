const fs = require('fs')
const path = require('path')
const PWD = process.env.PWD || process.cwd() // 兼容windows

exports.getChunksObject = function(entries) {
  return Object.keys(entries).map(pathname => {
<<<<<<< HEAD
    var templatePath = '!!ejs-full-loader!src/layout/index.html'
    try {
      let stat = fs.statSync(path.join(PWD, 'src/pages', pathname) + '/index.html')
      if (stat && stat.isFile()) {
        templatePath = `!!ejs-full-loader!src/pages/${pathname}/index.html`
=======
    var templatePath = 'src/layout/index.html'
    try {
      let stat = fs.statSync(path.join(PWD, 'src/pages', pathname) + '/index.html')
      if (stat && stat.isFile()) {
        templatePath = `src/pages/${pathname}/index.html`
>>>>>>> cbe1ce0edaa28c3b9d1257fdcf3751148b3169b2
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
