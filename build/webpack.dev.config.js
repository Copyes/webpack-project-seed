const path = require('path');
const { getEntries } = require('./entry.js');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const GLOB_FILE_PATH = './src/pages/**/index.js';
const CUT_PATH = './src/pages/';
const PWD = process.env.PWD || process.cwd(); // 兼容windows

var entries = getEntries(GLOB_FILE_PATH, CUT_PATH);

// 初始自带热更新插件
let plugins = [
	// new webpack.optimize.OccurenceOrderPlugin(),
 //    new webpack.HotModuleReplacementPlugin(),
 //    new webpack.NoErrorsPlugin()
];
// html打包
const chunksObject = Object.keys(entries).map(pathname => {
    var templatePath = '!!ejs-full-loader!unit/layout/webpack_layout.html';
    try{
        let stat = fs.statSync(path.join(PWD, 'src/pages', pathname) + '/index.html');
        if(stat && stat.isFile()){
            templatePath = `!!ejs-full-loader!src/pages/${pathname}/index.html`
        }
    }catch(e){
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
        filename: './' + item.pathname + '.html',  // 生成的html存放路径，相对于publicPath
        template: item.templatePath, // html模板路径,
        inject: false   //js插入的位置，true/'head'/'body'/false
    }
    if (item.pathname in entries) {
        conf.inject = 'body'
        conf.chunks = [item.pathname]
    }
    plugins.push(new HtmlWebpackPlugin(conf))
});

var config = {
	devtool: '#source-map',
    cache: true,
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
				test: /\.vue$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'vue-loader'
					}
				]
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader'
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'less-loader'
					}
				]
			},
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
        mainFields: ['jsnext:main','main'],

		extensions: ['.js', '.vue', '.less', '.css']
	},
	plugins: plugins
}

module.exports = config;