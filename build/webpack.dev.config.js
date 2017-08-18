/**
 * lip.fan
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vConsolePlugin = require('vconsole-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.config.js')
const config = require('../config/index.js')
const { getChunksObject } = require('./chunks.js')

let entries = baseWebpackConfig.entry;
let devClient = './build/dev-client.js'
// 热更新
Object.keys(entries).forEach(function (name) {
    baseWebpackConfig.entry[name] = [devClient].concat(baseWebpackConfig.entry[name])
})

let devConfig = merge(baseWebpackConfig, {
    devtool: '#cheap-module-eval-source-map',
    cache: true,
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                postcss: [require('autoprefixer')({
                    browsers: ['android >= 4.0', 'ios_saf >= 7.0'],
                    remove: false
                })]
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }]
        }, {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader'
            }, {
                loader: 'less-loader'
            }]
        }]
    },
    plugins: []
})
let chunksObject = getChunksObject(entries)

chunksObject.forEach(item => {
    let conf = {
        filename: './' + item.pathname + '.html', // 生成的html存放路径，相对于publicPath
        template: item.templatePath, // html模板路径,
        inject: false //js插入的位置，true/'head'/'body'/false
    }
    if (item.pathname in entries) {
        conf.inject = 'body'
        conf.chunks = [item.pathname]
    }
    devConfig.plugins.push(new HtmlWebpackPlugin(conf))
})

devConfig.plugins = devConfig.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': config.dev.env
    }),
    //new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new vConsolePlugin({
        enable: true
    })
    // /* 全局shimming */
    // new webpack.ProvidePlugin({
    //     $: 'zepto',
    //     Zepto: 'zepto',
    //     'window.$': 'zepto',
    //     'window.Zepto': 'zepto',
    // }),
])

module.exports = devConfig