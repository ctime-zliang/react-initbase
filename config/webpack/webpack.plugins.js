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
const webpackPaths = require('./webpack.paths')
const utils = require('../utils')

const pathOfClientPathAboutDevBuild = utils.clientOnly() ? webpackPaths.client.devBuild.path() : webpackPaths.client.devBuild.pathForSSR()
const pathOfClientPathAboutProdBuild = utils.clientOnly() ? webpackPaths.client.prodBuild.path() : webpackPaths.client.prodBuild.pathForSSR()
const pathOfServerPathAboutDevBuild = webpackPaths.server.devBuild.path()
const pathOfServerPathAboutProdBuild = webpackPaths.server.prodBuild.path()

const htmlWebpackPluginOptions = {
	title: `React Application`,
	inject: true,
	hash: false,
	cache: true,
	showErrors: true,
	minify: {
		minifyCSS: true,
		minifyJS: true,
	},
}

const miniCssExtractPluginOptions = {
	ignoreOrder: false,
	attributes: { id: `link${new Date().getTime()}` },
}

module.exports = {
	common() {
		return [
			new WebpackManifestPlugin({ fileName: 'manifest.json' }),
			new ESBuildPlugin(),
			new MiniCssExtractPlugin({
				...miniCssExtractPluginOptions,
				filename: webpackPaths.common.cssExtract.filename,
				chunkFilename: webpackPaths.common.cssExtract.stylesSheetChunkFilename,
			}),
			new CaseSensitivePathsPlugin(),
			new TypedCssModulesPlugin({
				globPattern: 'src/**/*.(css|less|sass)',
			}),
			new webpack.ProgressPlugin(),
			new webpack.DefinePlugin({
				'process.env.CLIENT_ONLY': JSON.stringify(utils.clientOnly()),
			}),
		]
	},
	client: {
		devBuild() {
			return [
				new webpack.DefinePlugin({
					'process.env.NODE_ENV': JSON.stringify('development'),
				}),
				new ReactRefreshPlugin(),
				utils.clientOnly() &&
					new HtmlWebpackPlugin({
						...htmlWebpackPluginOptions,
						filename: webpackPaths.client.devBuild.htmlWebpackPluginFilename,
						template: webpackPaths.client.devBuild.htmlWebpackPluginTemplate,
					}),
				new webpack.HotModuleReplacementPlugin(),
				new CopyWebpackPlugin({
					patterns: [
						{
							from: webpackPaths.common.i18n.locales,
							to: path.join(pathOfClientPathAboutDevBuild, '/locales'),
						},
					],
				}),
			].filter(Boolean)
		},
		prodBuild() {
			return [
				new webpack.DefinePlugin({
					'process.env.NODE_ENV': JSON.stringify('production'),
				}),
				new HtmlWebpackPlugin({
					...htmlWebpackPluginOptions,
					filename: webpackPaths.client.prodBuild.htmlWebpackPluginFilename,
					template: webpackPaths.client.prodBuild.htmlWebpackPluginTemplate,
				}),
				new BundleAnalyzerPlugin({
					analyzerPort: 0,
				}),
				new CopyWebpackPlugin({
					patterns: [
						{
							from: webpackPaths.common.i18n.locales,
							to: path.join(pathOfClientPathAboutProdBuild, 'locales'),
							globOptions: {
								ignore: ['*.missing.json'],
							},
						},
					],
				}),
			].filter(Boolean)
		},
	},
	server: {
		devBuild() {
			return [
				new webpack.DefinePlugin({
					'process.env.NODE_ENV': JSON.stringify('development'),
				}),
				new webpack.HotModuleReplacementPlugin(),
				new CopyWebpackPlugin({
					patterns: [
						{
							from: webpackPaths.common.i18n.locales,
							to: path.join(pathOfServerPathAboutDevBuild, 'locales'),
							globOptions: {
								ignore: ['*.missing.json'],
							},
						},
					],
				}),
			]
		},
		prodBuild() {
			return [
				new webpack.DefinePlugin({
					'process.env.NODE_ENV': JSON.stringify('production'),
				}),
				new CopyWebpackPlugin({
					patterns: [
						{
							from: webpackPaths.common.i18n.locales,
							to: path.join(pathOfServerPathAboutProdBuild, 'locales'),
							globOptions: {
								ignore: ['*.missing.json'],
							},
						},
					],
				}),
			]
		},
	},
}
