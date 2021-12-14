const paths = require('./webpack.paths')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')
const optimization = require('./webpack.optimization')

const webpackConfigBase = {
	name: `client`,
	target: `web`,
	cache: {
		type: `filesystem`,
	},
	entry: {
		client: paths.client.entry.main,
	},
	module: {
		rules: rules(`client`),
	},
	resolve: paths.common.resolve,
	plugins: [...plugins.common],
	optimization: { ...optimization.common },
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
