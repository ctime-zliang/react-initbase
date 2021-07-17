const { ESBuildMinifyPlugin } = require('esbuild-loader')
const paths = require('./webpack.paths')

const clientPaths = paths.client
module.exports = {
	client: {
		base: {
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						chunks: 'all',
					},
					// styles: {
					// 	name: 'styles',
					// 	test: /\.css$/,
					// 	chunks: 'all',
					// 	enforce: true,
					// }
				},
			},
		},
		devBuild: {
			minimize: true,
			minimizer: [],
		},
		prodBuild: {
			minimize: true,
			minimizer: [
				// new ESBuildMinifyPlugin({
				// 	target: 'es2015',
				// 	minifyWhitespace: true,
				// }),
			],
		},
	},
	server: {},
}
