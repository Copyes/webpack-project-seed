/**
 * lip.fan
 */
const os = require('os')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const WebpackMd5Hash = require('webpack-md5-hash')
const UglifyJsParallelPlugin = require('webpack-uglify-parallel')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const config = require('../config/index.js')
const { getChunksObject } = require('./chunks.js')
const path = require('path')

var buildConfig = merge(baseWebpackConfig, {
    devtool: false,
    bail: true,
    cache: true,
    performance: {
        hints: false
    },
    output: {
        path: config.prod.assetsRoot,
        filename: 'static/js/[name]-[chunkhash:16].js',
        chunkFilename: 'static/js/[id]-[chunkhash:16].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                css: ExtractTextPlugin.extract({
                                    use: 'css-loader!postcss-loader',
                                    fallback: 'vue-style-loader'
                                }),
                                less: ExtractTextPlugin.extract({
                                    use: 'css-loader!postcss-loader!less-loader',
                                    fallback: 'vue-style-loader'
                                })
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['vue-style-loader', 'css-loader?minimize', 'postcss-loader']
                }),
                exclude: /node_modules/
            },
            {
                test: /\.less$/, // ['css-loader?minimize&-autoprefixer!postcss-loader', 'less-loader']
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?minimize', 'postcss-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        // 配置 Node 环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: config.prod.env
            }
        }),
        // 清理目录
        new CleanWebpackPlugin(['static', 'assets/static'], {
            root: path.resolve('./dist')
        }),
        // 抽取公共库
        new webpack.DllReferencePlugin({
            name: 'vendor',
            manifest: require('../dist/assets/vendor-manifest.json')
        }),
        // 通过范围提升，webpack可以根据你正在使用什么样的模块和一些其他条件来回退到正常的捆绑
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurrenceOrderPlugin(),
        //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
        new ExtractTextPlugin({
            filename: 'static/css/[name]-[contenthash:16].css',
            allChunks: true
        }),
        // 压缩js
        new UglifyJsParallelPlugin({
            workers: os.cpus().length,
            uglifyJS: {
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true
                },
                comments: false,
                mangle: true
            }
        }),
        // 压缩css：去重并去掉注释
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: false,
                autoprefixer: false,
                discardComments: { removeAll: true }
            }
        }),
        new webpack.NamedModulesPlugin(),
        // 根据模块打包前的代码内容生成hash，而不是像Webpack那样根据打包后的内容生成hash
        //new WebpackMd5Hash(),
        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            names: ['commons'], // 这公共代码的chunk名为'commons'
            filename: 'assets/static/js/[name].bundle.[chunkhash:16].js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
            minChunks: 4
        }),
        // new BundleAnalyzerPlugin(),
        // 插入自定义文件插入到html中
        new AddAssetHtmlPlugin([
            {
                filepath: 'dist/assets/dll/*.js',
                publicPath: '/assets/dll/',
                outputPath: '/assets/dll',
                // files: config.libraryEntry.map(entry => entry + '.html'),
                includeSourcemap: false
            }
        ])
    ]
})
// 全都是为了打包html

let entries = baseWebpackConfig.entry
let chunksObject = getChunksObject(entries)

chunksObject.forEach(item => {
    let conf = {
        filename: './html/' + item.pathname + '.html', // 生成的html存放路径，相对于publicPath
        template: item.templatePath, // html模板路径,
        inject: false, //js插入的位置，true/'head'/'body'/false
        minify: {
            //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //删除空白符与换行符
            minifyJS: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        },
        chunksSortMode: 'dependency'
    }
    if (item.pathname in entries) {
        conf.inject = 'body'
        conf.chunks = ['commons', item.pathname]
    }

    buildConfig.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = buildConfig
