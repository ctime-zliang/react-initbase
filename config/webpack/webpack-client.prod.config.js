const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack-client.base.config')
const paths = require('./webpack.paths')
const plugins = require('./webpack.plugins')

const webpackProdConfig = {
	mode: 'production',
	output: {
		publicPath: paths.client.prodBuild.publicPath,
		path: paths.client.prodBuild.path(),
		filename: paths.client.output.filename,
		chunkFilename: paths.client.output.chunkFilename,
	},
	plugins: [...plugins.client.prodBuild],
}

module.exports = merge(webpackBaseConfig, webpackProdConfig)