const nodeExternals = require('webpack-node-externals')
const paths = require('./webpack.paths')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

const serverPaths = paths.server
const clientPaths = paths.client
const commonPlugins = plugins.common
const serverPlugins = plugins.server
const webpackConfigBase = {
	name: 'server',
	target: 'node',
	entry: {
		server: serverPaths.entry.main,
	},	
	module: {
		rules: rules('server'),
	},
	externals: [
		nodeExternals({
			allowlist: /\.css|less$/,
		}),
	],
	resolve: clientPaths.resolve,
	plugins: [...commonPlugins, ...serverPlugins.base],
	stats: {
		assets: false,
		cached: false,
		cachedAssets: false,
		chunks: false,
		chunkModules: false,
		children: false,
		colors: true,
		hash: false,
		modules: false,
		performance: false,
		reasons: false,
		timings: true,
		version: false,
	},
}

module.exports = webpackConfigBase
