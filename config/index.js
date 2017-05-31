const path = require('path');

module.exports = {
	dev: {
		env: require('./dev-env.js'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
	    cssSourceMap: false
	},

	build: {
		env: require('./prod-env.js'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
	    productionSourceMap: false
	}
}