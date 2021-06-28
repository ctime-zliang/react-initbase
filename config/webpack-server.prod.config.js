const WebpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack-server.base.config')
const plugins = require('./webpack.plugins')
const paths = require('./webpack.paths')

const serverPaths = paths.server
const clientPaths = paths.client
const serverPlugins = plugins.server
const webpackProdConfig = {
	mode: 'production',
	output: {
		publicPath: serverPaths.devBuild.publicPath,
		path: serverPaths.prodBuild.path(),
		filename: serverPaths.output.filename,
		// libraryTarget: 'commonjs2'
	},
	plugins: [...serverPlugins.prodBuild],
}

module.exports = WebpackMerge(webpackBaseConfig, webpackProdConfig)
