const { merge } = require('webpack-merge')
const webpackInitConfig = require('./webpack-server.init.config')
const webpackPlugins = require('./webpack.plugins')
const webpackPaths = require('./webpack.paths')

const webpackProdConfig = {
	mode: 'development',
	output: {
		publicPath: webpackPaths.server.devBuild.publicPath,
		path: webpackPaths.server.devBuild.path(),
		filename: webpackPaths.server.output.filename,
		chunkFilename: webpackPaths.server.output.chunkFilename,
	},
	plugins: [...webpackPlugins.server.devBuild()],
}

module.exports = merge(webpackInitConfig, webpackProdConfig)
