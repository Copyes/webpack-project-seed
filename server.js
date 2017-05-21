var express = require('express');
var webpack = require('webpack');

var config = require('./build/webpack.dev.config.js');


var app = express();
// webpack 编译下。
var compiler = webpack(config);
// 使用 webpack-dev-middleware 中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath,
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
// 注册中间件
app.use(devMiddleware);

app.listen(8888, function(err){
	if(err){
		console.log(err);
		return;
	}

	console.log('Listening at http://localhost:8888');
})
