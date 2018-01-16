const postcss = require('postcss')
const cssTreeShakingPlugin = require('./css-treeshaking-plugin')

class CssTreeShakingPlugin {
  constructor(options) {
    this.options = Object.assign({}, { remove: false, ignore: [] }, options)
  }
  apply(compiler) {
    compiler.plugin('after-emit', (compilation, callback) => {
      let cssFiles = Object.keys(compilation.assets).filter(asset => {
        return /\.css/.test(asset)
      })

      let jsFiles = Object.keys(compilation.assets).filter(asset => {
        return /\.(js|jsx)$/.test(asset)
      })

      let jsContents = jsFiles.reduce((acc, filename) => {
        let contents = compilation.assets[filename].source()
        acc += contents
        return acc
      }, '')
      let tasks = []
      cssFiles.forEach(filename => {
        let source = compilation.assets[filename].source()
        let listOpts = {
          include: '',
          source: jsContents,
          options: this.options
        }
        tasks.push(
          postcss(cssTreeShakingPlugin(listOpts))
            .process(source)
            .then(result => {
              let css = result.toString()
              compilation.assets[filename] = {
                source: () => css,
                size: () => css.length
              }
              return result
            })
        )
      })
      Promise.all(tasks).then(() => {
        callback()
      })
    })
  }
}

module.exports = CssTreeShakingPlugin
