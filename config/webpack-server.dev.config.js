const WebpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack-server.base.config')
const plugins = require('./webpack.plugins')
const paths = require('./webpack.paths')

const serverPaths = paths.server
const clientPaths = paths.client
const serverPlugins = plugins.server
const webpackProdConfig = {
	mode: 'development',
	output: {
		publicPath: serverPaths.devBuild.publicPath,
		path: serverPaths.devBuild.path(),
		filename: serverPaths.output.filename,
		// libraryTarget: 'commonjs2'
	},
	plugins: [...serverPlugins.devBuild],
}

module.exports = WebpackMerge(webpackBaseConfig, webpackProdConfig)
