const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack-client.base.config')
const paths = require('./webpack.paths')
const devServerConfig = require('./webpack.dev-server.config')
const plugins = require('./webpack.plugins')
const optimization = require('./webpack.optimization')

const clientPaths = paths.client
const clientPlugins = plugins.client
const clientOptimization = optimization.client
const webpackDevConfig = {
	mode: 'development',
	output: {
		publicPath: clientPaths.devBuild.publicPath,
		path: clientPaths.devBuild.path(),
		filename: clientPaths.output.filename,
		chunkFilename: clientPaths.output.chunkFilename,
	},
	plugins: [...clientPlugins.devBuild],
	optimization: {
		...clientOptimization.base,
		...clientOptimization.devBuild,
	},
	devtool: 'source-map',
	devServer: devServerConfig,
	performance: {
		hints: false,
	},
}

module.exports = merge(webpackBaseConfig, webpackDevConfig)
