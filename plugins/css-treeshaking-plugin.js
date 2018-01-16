const postcss = require('postcss')
const parser = require('postcss-selector-parser')

const classInJsRegex = className => {
  const re = new RegExp(`('|")([-_a-zA-Z0-9-\\s]*)?` + className + `([-_a-zA-Z0-9-\\s]*)('|")`, 'g')
  const vre = new RegExp(`(\\{|,])?\\s*` + className + `([-_a-zA-Z0-9-\\s]*)\\:`, 'g')
  return [re, vre]
}

module.exports = postcss.plugin('list-selectors', options => {
  let opts = options
  let notCache = {}
  let config = options.opts

  console.log(config)
  return (cssRoot, postcssResult) => {
    // 判断js中是不是有css
    let isCssInJs = className => {
      let exist = false
      // 判断是不是在js中有忽略检查的class
      if (opts.ignore && opts.ignore.length > 0) {
        exist = opts.ignore.some(item => {
          const reg = new RegExp(item, 'g')
          return reg.test(className)
        })
      }

      if (!exist) {
        // 检查js中的class名称
        return classInJsRegex(className).some(item => {
          return item.test(opts.source)
        })
      }
      return true
    }
    let checkRule = rule => {
      return new Promise(resolve => {
        if (!rule.selectors) {
          postcssResult.warn('Failed to find any selectors at all in the source files you provided. ' + 'You are going to get an empty selector list.')
          resolve(true)
        }
        let secs = rule.selectors.filter(function(selector) {
          let result = true
          let processor = parser(function(selectors) {
            for (let i = 0, len = selectors.nodes.length; i < len; i++) {
              let node = selectors.nodes[i]
              let excludeType = ['comment', 'combinator', 'pseudo']
              if (excludeType.indexOf(node.type)) continue
              for (let j = 0, len2 = node.nodes.length; j < len2; j++) {
                let n = node.nodes[j]
                if (!notCache[n.value]) {
                  switch (n.type) {
                  case 'tag':
                    // nothing
                    break
                  case 'id':
                  case 'class':
                    if (!isCssInJs(n.value)) {
                      notCache[n.value] = true
                      result = false
                      break
                    }
                    break
                  default:
                    // nothing
                  }
                } else {
                  result = false
                  break
                }
              }
            }
          })
          processor.process(selector)
          return result
        })
        resolve({
          selectors: secs
        })
      })
    }
    let start = Date.now()
    cssRoot.walkRules(rule => {
      if (rule.parent.type === 'atrule' && /keyframes/.test(rule.parent.name)) return
      checkRule(rule).then(result => {
        if (result.selectors.length === 0) {
          let log = ' ✂️ [' + rule.selector + '] shaked, [1]'
          console.log(log)
          if (config.remove) {
            rule.remove()
          }
        } else {
          let shaked = rule.selectors.filter(item => {
            return result.selectors.indexOf(item) === -1
          })
          if (shaked && shaked.length > 0) {
            let log = ' ✂️ [' + shaked.join(' ') + '] shaked, [2]'
            console.log(log)
          }
          if (config.remove) {
            rule.selectors = result.selectors
          }
        }
      })
    })
    console.log('[total time]:', ((Date.now() - start) / 1000).toFixed(2) + 's')
  }
})
