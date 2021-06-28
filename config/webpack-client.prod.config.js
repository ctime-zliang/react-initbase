const WebpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack-client.base.config')
const paths = require('./webpack.paths')
const plugins = require('./webpack.plugins')
const optimization = require('./webpack.optimization')

const clientPaths = paths.client
const clientPlugins = plugins.client
const clientOptimization = optimization.client
const webpackProdConfig = {
	mode: 'production',
	output: {
		publicPath: clientPaths.prodBuild.publicPath,
		path: clientPaths.prodBuild.path(),
		filename: clientPaths.output.filename,
		chunkFilename: clientPaths.output.chunkFilename,
	},
	plugins: [...clientPlugins.prodBuild],
	optimization: {
		...clientOptimization.base,
		...clientOptimization.prodBuild,
	},
}

module.exports = WebpackMerge(webpackBaseConfig, webpackProdConfig)
