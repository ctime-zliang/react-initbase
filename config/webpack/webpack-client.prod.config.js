const { merge } = require('webpack-merge')
const webpackInitConfig = require('./webpack-client.init.config')
const webpackPaths = require('./webpack.paths')
const webpackPlugins = require('./webpack.plugins')

const webpackProdConfig = {
	mode: 'production',
	output: {
		publicPath: webpackPaths.client.prodBuild.publicPath,
		path: webpackPaths.client.prodBuild.path(),
		filename: webpackPaths.client.output.filename,
		chunkFilename: webpackPaths.client.output.chunkFilename,
	},
	plugins: [...webpackPlugins.client.prodBuild()],
}

module.exports = merge(webpackInitConfig, webpackProdConfig)
