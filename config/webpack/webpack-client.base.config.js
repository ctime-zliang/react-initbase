const paths = require('./webpack.paths')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')
const optimization = require('./webpack.optimization')
const stats = require('./webpack.stats')

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
	stats: stats(`client`),
}

module.exports = webpackConfigBase
