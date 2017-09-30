/**
 * lip.fan
 * 预编译
 */
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist/assets/dll'),
        filename: '[name].dll-[hash].js',
        library: '[name]'
    },
    entry: {
        vendor: ['xtemplate', 'es6-promise']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new CleanWebpackPlugin(['assets/dll'], {
            root: path.resolve('./dist')
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, '../dist/assets', '[name]-manifest.json'),
            name: '[name]'
        })
    ]
}
