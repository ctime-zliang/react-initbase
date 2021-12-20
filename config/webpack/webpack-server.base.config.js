const webpackPaths = require('./webpack.paths')
const webpackRules = require('./webpack.rules')
const webpackPlugins = require('./webpack.plugins')
const webpackOptimization = require('./webpack.optimization')
const webpackStats = require('./webpack.stats')
const webpackExternals = require('./webpack.externals')

const webpackConfigBase = {
	name: `server`,
	target: `node`,
	cache: {
		type: `filesystem`,
	},
	entry: {
		server: webpackPaths.server.entry.main,
	},
	module: {
		rules: webpackRules(`server`),
	},
	resolve: webpackPaths.common.resolve,
	plugins: [...webpackPlugins.common],
	// optimization: { ...webpackOptimization.common },
	stats: webpackStats(`server`),
	externals: webpackExternals(`server`),
}

module.exports = webpackConfigBase
