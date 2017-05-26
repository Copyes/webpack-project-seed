const utils = require('./utils')
//var config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? false
      : true,
    extract: isProduction
  })
}
