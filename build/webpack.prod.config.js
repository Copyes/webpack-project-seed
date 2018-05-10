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
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const CssTreeShakingPlugin = require('../plugins/webpack-css-treeshaking-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// const WebpackMd5Hash = require('webpack-md5-hash')
const UglifyJsParallelPlugin = require('webpack-uglify-parallel')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
// 将文件名作为 chunkID 以支持多页面打包下的缓存机制
const config = require('../config/index.js')
const { getChunksObject } = require('./chunks.js')
const path = require('path')

var buildConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  bail: true,
  cache: true,
  performance: {
    hints: false
  },
  output: {
    path: config.prod.assetsRoot,
    filename: 'static/js/[name]-[chunkhash:16].js',
    chunkFilename: 'static/js/[id]-[chunkhash:16].js'
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
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'vue-style-loader', 'css-loader?minimize', 'postcss-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/, // ['css-loader?minimize&-autoprefixer!postcss-loader', 'less-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader?minimize', 'postcss-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    // 配置 Node 环境变量
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: config.prod.env
    //   }
    // }),
    // 清理目录
    new CleanWebpackPlugin(['static'], {
      root: path.resolve('./dist')
    }),
    // 抽取公共库
    // new webpack.DllReferencePlugin({
    //   name: 'vendor',
    //   manifest: require('../dist/assets/vendor-manifest.json')
    // }),
    // hash替换module id
    new webpack.HashedModuleIdsPlugin(),
    // chunk name替换chunk id
    new webpack.NamedChunksPlugin(),
    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    // new webpack.optimize.OccurrenceOrderPlugin(),
    //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
    new MiniCssExtractPlugin({
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
    })
    /**
     * 优化部分包括代码拆分
     * 且运行时（manifest）的代码拆分提取为了独立的 runtimeChunk 配置
     */
    // new BundleAnalyzerPlugin(),
    // 插入自定义文件插入到html中
    // new AddAssetHtmlPlugin([
    //   {
    //     filepath: 'dist/assets/dll/*.js',
    //     publicPath: '/assets/dll/',
    //     outputPath: '/assets/dll',
    //     includeSourcemap: false
    //   }
    // ])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        common: {
          // initial 设置提取同步代码中的公用代码
          chunks: 'initial',
          name: 'common',
          minSize: 0,
          minChunks: 2
        },
        'async-common': {
          // async 设置提取异步代码中的公用代码
          chunks: 'async',
          name: 'async-common',
          /**
           * minSize 默认为 30000
           * 想要使代码拆分真的按照我们的设置来
           * 需要减小 minSize
           */
          minSize: 0,
          // 至少为两个 chunks 的公用代码
          minChunks: 2
        }
      }
    },
    /**
     * 对应原来的 minchunks: Infinity
     * 提取 webpack 运行时代码
     * 直接置为 true 或设置 name
     */
    runtimeChunk: {
      name: 'manifest'
    }
  }
})
// 全都是为了打包html

let entries = baseWebpackConfig.entry
let chunksObject = getChunksObject(entries)

chunksObject.forEach(item => {
  let conf = {
    filename: './' + item.pathname + '.html', // 生成的html存放路径，相对于publicPath
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
    conf.chunks = ['manifest', 'vendors', item.pathname]
  }

  buildConfig.plugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = buildConfig
