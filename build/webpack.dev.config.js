const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PWD = process.env.PWD || process.cwd(); // 兼容windows

let plugins = [
	
];

let entries = baseWebpackConfig.entry;
let devClient = './build/dev-client.js'
// 热更新
Object.keys(entries).forEach(function (name) {
    baseWebpackConfig.entry[name] = [devClient].concat(baseWebpackConfig.entry[name])
});
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

plugins = plugins.concat([
	new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    }),
    //new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
])

module.exports = merge(baseWebpackConfig, {
  	devtool: '#eval-source-map',
    cache: true,
    plugins: plugins
});
