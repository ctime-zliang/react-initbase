const { merge } = require('webpack-merge')
const webpackInitConfig = require('./webpack-client.init.config')
const webpackPaths = require('./webpack.paths')
const webpackPlugins = require('./webpack.plugins')
const webpackDevServerConfig = require('./webpack.dev-server.config')

const webpackDevConfig = {
	mode: 'development',
	output: {
		publicPath: webpackPaths.client.devBuild.publicPath,
		path: webpackPaths.client.devBuild.path(),
		filename: webpackPaths.client.output.filename,
		chunkFilename: webpackPaths.client.output.chunkFilename,
	},
	plugins: [...webpackPlugins.client.devBuild()],
	devtool: 'source-map',
	devServer: webpackDevServerConfig.devServer,
}

module.exports = merge(webpackInitConfig, webpackDevConfig)
