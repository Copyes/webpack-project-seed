const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PWD = process.env.PWD || process.cwd(); // 兼容windows
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const utils = require('./utils');

const assetsRoot = path.resolve(__dirname, '../dist');
const assetsSubDirectory = 'static';

var config = {
    devtool: false,
    bail: true,
    //入口文件输出配置
    entry: baseWebpackConfig.entry,
    output: {
        path: assetsRoot,
        filename: 'static/js/[name]-[chunkhash:16].js',
        chunkFilename: 'static/js/[id]-[chunkhash:16].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        loader: 'css-loader!postcss-loader',
                        fallbackLoader: 'vue-style-loader'
                    }),
                    less: ExtractTextPlugin.extract({
                        loader: 'css-loader!postcss-loader!less-loader',
                        fallbackLoader: 'vue-style-loader'
                    })
                }
            }
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader?modules',
                'postcss-loader'
            ],
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract(['css-loader?minimize&-autoprefixer!postcss-loader', 'less-loader'])
        }, {
            test: /\.xtpl$/,
            loader: '@beibei/xtpl-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader?cacheDirectory'
        }]
    },
    resolve: {
        // 支持ES2015 import
        mainFields: ['jsnext:main', 'main'],
        extensions: ['.js'] // todo:
    },
    externals: {
        $: "$",
        Zepto: "Zepto",
        Vue: "Vue"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.ProgressPlugin(function handler(percentage, msg) {
            var _perInt = parseInt(percentage * 100)
            if (_perInt % 10 === 0) {
                console.log('当前进度: ' + parseInt(percentage * 100) + "%", msg)
            }
        }),
        //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
        new ExtractTextPlugin({
            filename: 'static/css/[name]-[contenthash:16].css',
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            output: {
                comments: false, // remove all comments
            },
            compress: {
                warnings: false,
                drop_console: false, // 不删除console
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
};


// 全都是为了打包html
let entries = baseWebpackConfig.entry;

const chunksObject = Object.keys(entries).map(pathname => {
    var templatePath = '!!ejs-full-loader!unit/layout/webpack_layout.html';
    try {
        let stat = fs.statSync(path.join(PWD, 'src/pages', pathname) + '/index.html');
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

chunksObject.forEach(item => {
    let conf = {
        filename: './html/' + item.pathname + '.html', // 生成的html存放路径，相对于publicPath
        template: item.templatePath, // html模板路径,
        inject: false, //js插入的位置，true/'head'/'body'/false
        minify: { //压缩HTML文件
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //删除空白符与换行符
            // 为了使GAEA能正确识别script, 保留引号
            // removeAttributeQuotes: true,
            minifyJS: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }
        //chunksSortMode: 'dependency'
    }
    if (item.pathname in entries) {
        conf.inject = 'body'
        conf.chunks = [item.pathname]
    }
    config.plugins.push(new HtmlWebpackPlugin(conf))
});

module.exports = config;
