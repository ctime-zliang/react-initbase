const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const HappyPack = require('happypack')
const OS = require('os')
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { ESBuildPlugin } = require('esbuild-loader')
const paths = require('./webpack.paths')
const utils = require('./utils')

const clientPaths = paths.client
const serverPaths = paths.server
const HappyThreadPoolCase = HappyPack.ThreadPool({ size: OS.cpus().length })

module.exports = {
	common: [
		new ESBuildPlugin(),
		new MiniCssExtractPlugin({
			filename: clientPaths.base.stylesSheetFilename,
			chunkFilename: clientPaths.base.stylesSheetChunkFilename,
		}),
		new CaseSensitivePathsPlugin(),
		// new HappyPack({
		// 	id: 'happyBabelForJSX',
		// 	loaders: [
		// 		{
		// 			loader: 'babel-loader?cacheDirectory=true',
		// 		},
		// 	],
		// 	threadPool: HappyThreadPoolCase,
		// 	verbose: true,
		// }),
		// new HappyPack({
		// 	id: 'happyBabelForTSX',
		// 	loaders: [
		// 		{
		// 			loader: 'babel-loader?cacheDirectory=true',
		// 		},
		// 	],
		// 	threadPool: HappyThreadPoolCase,
		// 	verbose: true,
		// }),
		new TypedCssModulesPlugin({
			globPattern: 'src/**/*.(css|less|sass)',
		}),
		new WebpackManifestPlugin({ fileName: 'manifest.json' }),
		new webpack.ProgressPlugin(),
	],
	client: {
		base: [
			new webpack.DefinePlugin({
				'process.env.__CLIENT_ONLY__': JSON.stringify(process.argv.includes('--env.client-only')),
			}),
		],
		devBuild: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('development'),
				IS_DEVELOPMETN: true,
			}),
			!utils.clientOnly() && new WriteFileWebpackPlugin(),
			utils.clientOnly() &&
				new HtmlWebpackPlugin({
					filename: clientPaths.devBuild.htmlWebpackPluginFilename,
					template: clientPaths.devBuild.htmlWebpackPluginTemplate,
					inject: true,
				}),
			new webpack.HotModuleReplacementPlugin(),
		].filter(Boolean),
		prodBuild: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production'),
				IS_DEVELOPMETN: false,
			}),
			new HtmlWebpackPlugin({
				filename: clientPaths.prodBuild.htmlWebpackPluginFilename,
				template: clientPaths.prodBuild.htmlWebpackPluginTemplate,
				inject: true,
			}),
			new BundleAnalyzerPlugin({
				analyzerPort: 0,
			}),
		],
	},
	server: {
		base: [],
		devBuild: [new WriteFileWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
		prodBuild: [],
	},
}