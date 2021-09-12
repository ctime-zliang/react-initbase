const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { ESBuildPlugin } = require('esbuild-loader')
const paths = require('./webpack.paths')
const utils = require('./utils')

const clientPaths = paths.client
const serverPaths = paths.server
const pathOfClientPathAboutDevBuild = utils.clientOnly() ? clientPaths.devBuild.path() : clientPaths.devBuild.pathForSSR()
const pathOfClientPathAboutProdBuild = utils.clientOnly() ? clientPaths.prodBuild.path() : clientPaths.prodBuild.pathForSSR()
const pathOfServerPathAboutDevBuild = serverPaths.devBuild.path()
const pathOfServerPathAboutProdBuild = serverPaths.prodBuild.path()

module.exports = {
	common: [
		new WebpackManifestPlugin({ fileName: 'manifest.json' }),
		new ESBuildPlugin(),
		new MiniCssExtractPlugin({
			filename: clientPaths.base.stylesSheetFilename,
			chunkFilename: clientPaths.base.stylesSheetChunkFilename,
		}),
		new CaseSensitivePathsPlugin(),
		new TypedCssModulesPlugin({
			globPattern: 'src/**/*.(css|less|sass)',
		}),
		new webpack.ProgressPlugin(),
	],
	client: {
		devBuild: [
			new webpack.DefinePlugin({
				'process.env.__CLIENT_ONLY__': JSON.stringify(process.argv.includes('client-only=true')),
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('development'),
				IS_DEVELOPMETN: true,
			}),
			new ReactRefreshPlugin(),
			utils.clientOnly() &&
				new HtmlWebpackPlugin({
					filename: clientPaths.devBuild.htmlWebpackPluginFilename,
					template: clientPaths.devBuild.htmlWebpackPluginTemplate,
					inject: true,
				}),
			new webpack.HotModuleReplacementPlugin(),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: paths.common.i18n.locales,
						to: path.join(pathOfClientPathAboutDevBuild, '/locales'),
					},
				],
			}),
		].filter(Boolean),
		prodBuild: [
			new webpack.DefinePlugin({
				'process.env.__CLIENT_ONLY__': JSON.stringify(process.argv.includes('client-only=true')),
			}),
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
			new CopyWebpackPlugin({
				patterns: [
					{
						from: paths.common.i18n.locales,
						to: path.join(pathOfClientPathAboutProdBuild, 'locales'),
						globOptions: {
							ignore: ['*.missing.json'],
						},
					},
				],
			}),
		],
	},
	server: {
		devBuild: [
			new webpack.HotModuleReplacementPlugin(),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: paths.common.i18n.locales,
						to: path.join(pathOfServerPathAboutDevBuild, 'locales'),
						globOptions: {
							ignore: ['*.missing.json'],
						},
					},
				],
			}),
		],
		prodBuild: [
			new CopyWebpackPlugin({
				patterns: [
					{
						from: paths.common.i18n.locales,
						to: path.join(pathOfServerPathAboutProdBuild, 'locales'),
						globOptions: {
							ignore: ['*.missing.json'],
						},
					},
				],
			}),
		],
	},
}
