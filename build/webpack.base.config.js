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
        alias: {
            unit: path.resolve('./unit'),
            src: path.resolve('./src')
        },
		extensions: ['.js', '.vue', '.less', '.css']
	},
	// externals: {
    //     $: "$",
    //     'window.$': "$"
    // }
}

module.exports = config;