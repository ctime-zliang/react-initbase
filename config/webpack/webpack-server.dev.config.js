const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack-server.base.config')
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
	plugins: [...webpackPlugins.server.devBuild],
}

module.exports = merge(webpackBaseConfig, webpackProdConfig)
