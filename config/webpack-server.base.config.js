const nodeExternals = require('webpack-node-externals')
const paths = require('./webpack.paths')
const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')

const webpackConfigBase = {
	name: 'server',
	target: 'node',
	entry: {
		server: paths.server.entry.main,
	},
	module: {
		rules: rules('server'),
	},
	externals: [
		nodeExternals({
			allowlist: /\.css|less$/,
		}),
	],
	resolve: paths.client.resolve,
	plugins: [...plugins.common],
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
