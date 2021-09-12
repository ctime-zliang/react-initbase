const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack-server.base.config')
const plugins = require('./webpack.plugins')
const paths = require('./webpack.paths')

const webpackProdConfig = {
	mode: 'production',
	output: {
		publicPath: paths.server.prodBuild.publicPath,
		path: paths.server.prodBuild.path(),
		filename: paths.server.output.filename,
		// libraryTarget: 'commonjs2'
	},
	plugins: [...plugins.server.prodBuild],
}

module.exports = merge(webpackBaseConfig, webpackProdConfig)
