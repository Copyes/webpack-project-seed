const path = require('path');
const { getEntries } = require('./entry.js');
const GLOB_FILE_PATH = './src/pages/**/index.js';
const CUT_PATH = './src/pages/';
const vueLoader = require('./vue-loader.js');

var entries = getEntries(GLOB_FILE_PATH, CUT_PATH);

console.log(path.resolve(__dirname, '../src/'))

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
	// 解析模块
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader?cacheDirectory'
					}
				],
        		include: path.join(__dirname, '../src'),
				exclude: /node_modules/
			},
			{
	            test: /\.xtpl$/,
	            use: ['xtpl-loader']
	        }
		]
	},
	resolve: {

		extensions: ['.js', '.vue', '.less'],

        mainFields: ['jsnext:main','main'],
        // 使用别名，方便在引入的时候写路径方便点
        alias: {
            'libs': path.resolve(__dirname, '../src/units/libs'),
            'commons': path.resolve(__dirname, '../src/units/commons'),
            'components': path.resolve(__dirname, '../src/components'),
            'src': path.resolve(__dirname, '../src/')
        }
        //modules:  ["node_modules"]//path.resolve(__dirname, 'node_modules'),
        // 自动解析文件后缀名
	},
	performance: {
	  	hints: "warning"
	}
	// externals: {
    //     $: "$",
    //     'window.$': "$"
    // }
}

module.exports = config;