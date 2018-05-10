const path = require('path')
const { getEntries } = require('./entry.js')
const ARGVS = process.env.npm_config_argv
const entries = getEntries(ARGVS)
const vueLoaderConfig = require('./vue-loader')
const utils = require('./utils')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../'),
  // 入口
  entry: entries,
  // 出口
  output: {
    path: path.resolve(__dirname, '../dist/'),
    publicPath: '/'
  },
  // 解析模块,因为支持了git hook检测 所以可以考虑不要这个在线检测了。
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.vue$/,
        /**
         * loader配置的几种写法: https://www.bilibili.com/bangumi/play/ss12432
         * 单个：loader + options或use: 字符串
         * 多个：use/loaders: [string|[]单个]
         */
        loader: 'vue-loader',
        // 包含在.vue文件内的css预处理器配置
        options: vueLoaderConfig
      },
      // 单独配置的css预处理器配置
      ...utils.styleLoaders({
        sourceMap: true,
        extract: process.env.NODE_ENV === 'production' ? true : false,
        usePostCSS: true
      }),
      {
        // 末尾\?.*匹配带?资源路径，css字体配置中可能带版本信息
        test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
        /**
         * url-loader
         * 会配合 webpack 对资源引入路径进行复写，如将 css 提取成独立文件，可能出现 404 错误可查看 提取 js 中的 css 部分解决
         * 会以 webpack 的输出路径为基本路径，以 name 配置进行具体输出
         * limit 单位为 byte，小于这个大小的文件会编译为 base64 写进 js 或 html
         */
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.xtpl$/,
        use: ['xtpl-loader']
      }
    ]
  },
  plugins: [
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ],
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
// module.exports = config
