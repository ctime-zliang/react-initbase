const nodeExternals = require('webpack-node-externals')
const paths = require('./webpack.paths')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')
const optimization = require('./webpack.optimization')
const stats = require('./webpack.stats')

const webpackConfigBase = {
	name: `server`,
	target: `node`,
	cache: {
		type: `filesystem`,
	},
	entry: {
		server: paths.server.entry.main,
	},
	module: {
		rules: rules(`server`),
	},
	resolve: paths.common.resolve,
	plugins: [...plugins.common],
	// optimization: { ...optimization.common },
	stats: stats(`server`),
	externals: [
		nodeExternals({
			allowlist: /\.css|less|.sass$/,
		}),
	],
}

module.exports = webpackConfigBase
