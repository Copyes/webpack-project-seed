/**
 * lip.fan
 * 预编译
 */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
	output: {
		path: path.resolve(__dirname, '../dist/assets/dll'),
		filename: '[name].dll.js',
		library: '[name].lib'  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
	},
	entry: {
		vendor: [
			'xtemplate',
			'bluebird'
		]
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, '../dist/assets', '[name]-manifest.json'),
			name: '[name].lib'
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
}
