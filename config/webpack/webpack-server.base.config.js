const nodeExternals = require('webpack-node-externals')
const paths = require('./webpack.paths')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')
const optimization = require('./webpack.optimization')

const webpackConfigBase = {
	name: `server`,
	target: `node`,
	// cache: {
	// 	type: `filesystem`,
	// },
	entry: {
		server: paths.server.entry.main,
	},
	module: {
		rules: rules(`server`),
	},
	resolve: paths.common.resolve,
	plugins: [...plugins.common],
	// optimization: { ...optimization.common },
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
	externals: [
		nodeExternals({
			allowlist: /\.css|less|.sass$/,
		}),
	],
}

module.exports = webpackConfigBase
