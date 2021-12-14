const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack-server.base.config')
const plugins = require('./webpack.plugins')
const paths = require('./webpack.paths')

const webpackProdConfig = {
	mode: 'development',
	output: {
		publicPath: paths.server.devBuild.publicPath,
		path: paths.server.devBuild.path(),
		filename: paths.server.output.filename,
		chunkFilename: paths.server.output.chunkFilename,
	},
	plugins: [...plugins.server.devBuild],
}

module.exports = merge(webpackBaseConfig, webpackProdConfig)
