const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PWD = process.env.PWD || process.cwd(); // 兼容windows
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const config = merge(baseWebpackConfig, {
	output: {
        filename: 'dist/static/[name]-[chunkhash:16].js',
        chunkFilename: 'dist/static/[id]-[chunkhash:16].js'
    },
    module: {
    	rules: [
    		{
    			test: '/\.css$/',
    			exclude: /node_modules/,
    			use: ExtractTextPlugin.extract({
    				{
    					loader: 'css-loader',
    					options: {
    						minimize: true,
        					'-autoprefixer': true,
    					}
    				},
    				{
    					loader: 'postcss-loader'
    				}
    			})
    		},
    		{
    			test: '/\.vue$/',
    			

    		}
    	]
    },
    resolve: {
    	extensions: ['.js']
    },
    plugins: []
});

module.exports = config;