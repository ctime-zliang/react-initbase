const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack-client.base.config')
const paths = require('./webpack.paths')
const plugins = require('./webpack.plugins')
const devServerConfig = require('./webpack.dev-server.config')

const webpackDevConfig = {
	mode: 'development',
	output: {
		publicPath: paths.client.devBuild.publicPath,
		path: paths.client.devBuild.path(),
		filename: paths.client.output.filename,
		chunkFilename: paths.client.output.chunkFilename,
	},
	plugins: [...plugins.client.devBuild],
	devtool: 'source-map',
	devServer: devServerConfig,
}

module.exports = merge(webpackBaseConfig, webpackDevConfig)
