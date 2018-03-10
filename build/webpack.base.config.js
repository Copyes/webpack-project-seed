const path = require('path')
const { getEntries } = require('./entry.js')

const ARGVS = process.env.npm_config_argv
const entries = getEntries(ARGVS)
var config = {
  // 入口
  entry: entries,
  // 出口
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/',
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[id].[hash].js'
  },
  // 解析模块,因为支持了git hook检测 所以可以考虑不要这个在线检测了。
  module: {
    rules: [
      // {
      //   test: /\.(js)$/,
      //   use: [
      //     {
      //       loader: 'eslint-loader',
      //       options: {
      //         formatter: require('eslint-friendly-formatter')
      //       }
      //     }
      //   ],
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   include: path.join(__dirname, '../src')
      // },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory'
          }
        ]
      },
      {
        test: /\.xtpl$/,
        use: ['xtpl-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.less'],

    mainFields: ['jsnext:main', 'main'],
    // 使用别名，方便在引入的时候写路径方便点
    alias: {
      layout: path.resolve(__dirname, '../src/layout/'),
      libs: path.resolve(__dirname, '../src/libs'),
      commons: path.resolve(__dirname, '../src/common'),
      components: path.resolve(__dirname, '../src/components'),
      src: path.resolve(__dirname, '../src/'),
      vue: 'vue/dist/vue.esm.js'
    }
    //modules:  ["node_modules"]//path.resolve(__dirname, 'node_modules'),
    // 自动解析文件后缀名
  }
  // performance: {
  //   	hints: "warning"
  // }
  // externals: {
  //     $: "$",
  //     'window.$': "$"
  // }
}

module.exports = config
