const path = require('path');
const { getEntries } = require('./entry.js');
const GLOB_FILE_PATH = './src/pages/**/index.js';
const CUT_PATH = './src/pages/';
const vueLoader = require('./vue-loader.js');

var entries = getEntries(GLOB_FILE_PATH, CUT_PATH);

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
				exclude: /node_modules/
			}
		]
	},
	resolve: {
        mainFields: ['jsnext:main','main'],
        // 起个别名
        alias: {
            unit: path.resolve(__dirname, 'unit/libs'),
            src: path.resolve(__dirname, 'src')
        },
        //modules:  ["node_modules"]//path.resolve(__dirname, 'node_modules'),
        // 自动解析文件后缀名
		extensions: ['.js', '.vue', '.less']
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