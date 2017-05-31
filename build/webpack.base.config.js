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
		filename: '[name].[hash].js',
		chunkFilename: '[id].[chunkhash].js'
	},
	// 解析模块
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader?cacheDirectory'
					}
				]
			}
		]
	},

	resolve: {
        //mainFields: ['jsnext:main','main'],
		extensions: ['.js', '.vue', '.less', '.css']
	}
}

module.exports = config;