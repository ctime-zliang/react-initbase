const TerserPlugin = require('terser-webpack-plugin')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const paths = require('./webpack.paths')

const clientPaths = paths.client
module.exports = {
	client: {
		base: {
			noEmitOnErrors: true,
			// splitChunks: {
			// 	cacheGroups: {
			// 		commons: {
			// 			test: /[\\/]node_modules[\\/]/,
			// 			name: 'vendor',
			// 			chunks: 'all',
			// 		},
			// 		// styles: {
			// 		// 	name: 'styles',
			// 		// 	test: /\.css$/,
			// 		// 	chunks: 'all',
			// 		// 	enforce: true,
			// 		// }
			// 	},
			// },
		},
		devBuild: {
			minimize: true,
			minimizer: [],
		},
		prodBuild: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						parse: {
							ecma: 8,
						},
						compress: {
							warnings: false,
							comparisons: false,
							inline: 2,
						},
						mangle: {
							safari10: true,
						},
						output: {
							ecma: 5,
							comments: false,
							ascii_only: true,
						},
					},
					parallel: true,
					cache: true,
					sourceMap: true,
				}),
				// new ESBuildMinifyPlugin({
				// 	target: 'es2015',
				// 	minifyWhitespace: true,
				// }),
			],
		},
	},
	server: {},
}
