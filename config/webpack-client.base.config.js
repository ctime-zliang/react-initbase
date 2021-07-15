const paths = require('./webpack.paths')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

const clientPaths = paths.client
const commonPlugins = plugins.common
const clientPlugins = plugins.client
const webpackConfigBase = {
	name: 'client',
	target: 'web',
	entry: {
		client: clientPaths.entry.main,
	},
	resolve: clientPaths.resolve,
	module: {
		rules: rules('client'),
	},
	plugins: [...commonPlugins, ...clientPlugins.base],
	stats: {
		cached: false,
		cachedAssets: false,
		chunks: false,
		chunkModules: false,
		children: false,
		colors: true,
		hash: false,
		modules: false,
		reasons: false,
		timings: true,
		version: false,
	},
}

module.exports = webpackConfigBase
