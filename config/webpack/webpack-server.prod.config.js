const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack-server.base.config')
const webpackPlugins = require('./webpack.plugins')
const webpackPaths = require('./webpack.paths')

const webpackProdConfig = {
	mode: 'production',
	output: {
		publicPath: webpackPaths.server.prodBuild.publicPath,
		path: webpackPaths.server.prodBuild.path(),
		filename: webpackPaths.server.output.filename,
		chunkFilename: webpackPaths.server.output.chunkFilename,
	},
	plugins: [...webpackPlugins.server.prodBuild],
}

module.exports = merge(webpackBaseConfig, webpackProdConfig)
