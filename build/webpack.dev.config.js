'use strict'
process.env.NODE_ENV = 'development'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config.js')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const config = require('../config/index.js')
const { getChunksObject } = require('./chunks.js')

let entries = baseWebpackConfig.entry
// let devClient = './build/dev-client.js'
// // 热更新
// Object.keys(entries).forEach(function(name) {
//   baseWebpackConfig.entry[name] = [devClient].concat(baseWebpackConfig.entry[name])
// })

let devConfig = merge(baseWebpackConfig, {
  /**
   * development模式下默认启用这些插件
   * NamedChunksPlugin  // 使用entry名做标识
   * NamedModulesPlugin // 使用模块的相对路径非自增id做标识
   * 以上两个模块均为解决hash固化的问题
   */
  mode: 'development',
  devtool: '#cheap-module-eval-source-map',
  cache: true,
  output: {
    /**
     * HotModuleReplacement下文件名无法使用hash，
     * 所以将filename与chunkFilename配置从base中拆分到dev与prod中
     */
    filename: 'static/[name].js',
    chunkFilename: 'static/[id].js'
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.vue$/,
  //       loader: 'vue-loader',
  //       options: {
  //         postcss: [
  //           require('autoprefixer')({
  //             browsers: ['android >= 4.0', 'ios_saf >= 7.0'],
  //             remove: false
  //           })
  //         ]
  //       }
  //     },
  //     {
  //       test: /\.html$/,
  //       use: [{ loader: 'html-loader' }]
  //     },
  //     {
  //       test: /\.css$/,
  //       exclude: /node_modules/,
  //       use: [
  //         {
  //           loader: 'style-loader'
  //         },
  //         {
  //           loader: 'css-loader'
  //         },
  //         {
  //           loader: 'postcss-loader'
  //         }
  //       ]
  //     },
  //     {
  //       test: /\.less$/,
  //       use: [
  //         {
  //           loader: 'style-loader'
  //         },
  //         {
  //           loader: 'css-loader'
  //         },
  //         {
  //           loader: 'postcss-loader'
  //         },
  //         {
  //           loader: 'less-loader'
  //         }
  //       ]
  //     }
  //   ]
  //},
  devServer: {
    clientLogLevel: 'warning',
    inline: true,
    // 启动热更新
    hot: true,
    // 在页面上全屏输出报错信息
    overlay: {
      warnings: true,
      errors: true
    },
    // 显示进度
    progress: true,
    // dev-server 服务路径
    contentBase: false,
    // contentBase: path.join(__dirname, '../dist'), //网站的根目录为 根目录/dist
    compress: true,
    host: 'localhost',
    port: '8080',
    open: true,
    quiet: true,
    publicPath: '/'
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new FriendlyErrorsPlugin()]
})
let chunksObject = getChunksObject(entries)
console.log(chunksObject)
chunksObject.forEach(item => {
  let conf = {
    filename: './' + item.pathname + '.html', // 生成的html存放路径，相对于publicPath
    template: './' + item.templatePath, // html模板路径,
    inject: false //js插入的位置，true/'head'/'body'/false
  }
  if (item.pathname in entries) {
    conf.inject = 'body'
    conf.chunks = [item.pathname]
  }
  devConfig.plugins.push(new HtmlWebpackPlugin(conf))
})

// devConfig.plugins = devConfig.plugins.concat([
//   new webpack.HotModuleReplacementPlugin(),
//   new webpack.DefinePlugin({
//     'process.env': config.dev.env
//   }),
//   new webpack.NoEmitOnErrorsPlugin()
//   // new vConsolePlugin({
//   //   enable: true
//   // })
// ])

module.exports = devConfig
