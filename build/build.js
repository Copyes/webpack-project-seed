const rm = require('rimraf');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.config');
const path = require('path');
const utils = require('./utils');



const assetsRoot = path.resolve(__dirname, '../dist');
const assetsSubDirectory = 'static';

rm(path.join(assetsRoot, assetsSubDirectory), (err) => {
    if (err) throw err;
    webpack(webpackConfig, function(err, stats) {
        if (err) {
            throw err;
        }
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

    });
});
