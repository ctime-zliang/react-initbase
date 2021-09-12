const paths = require('./webpack.paths')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

const webpackConfigBase = {
	name: 'client',
	target: 'web',
	entry: {
		client: paths.client.entry.main,
	},
	resolve: paths.client.resolve,
	module: {
		rules: rules('client'),
	},
	plugins: [...plugins.common],
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
