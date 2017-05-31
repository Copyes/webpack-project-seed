var express = require('express');
var webpack = require('webpack');

var webpackDevConfig = require('./build/webpack.dev.config.js');
var config = '';

var app = express();
// webpack 编译下。
var compiler = webpack(webpackDevConfig);
// 使用 webpack-dev-middleware 中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: webpackDevConfig.output.publicPath,
	noInfo: true,
    stats: {
        colors: true,
        chunks: false,
        children: false,
        hash: false,
        assets: false,
        version: false,
        time: false
    }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);

// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function(compilation){
	compilation.plugin('html-webpack-plugin-after-emit', function(data, cb){
		// 发布事件
        hotMiddleware.publish({ action: 'reload' });
        cb();
	});
});
// 注册中间件
app.use(devMiddleware);
app.use(hotMiddleware)


app.listen(8888, function(err){
	if(err){
		console.log(err);
		return;
	}

	console.log('Listening at http://localhost:8888');
})
