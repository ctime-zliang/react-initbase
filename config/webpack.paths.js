const path = require('path')
const utils = require('./utils')

module.exports = {
	common: {
		buildRoot: utils.resolveDirectory(`./dist/`),
		i18n: {
			locales: utils.resolveDirectory(`./src/app/i18n/locales`),
		},
	},
	client: {
		base: {
			stylesSheetFilename: `styles/style.[name].[hash:8].css`,
			stylesSheetChunkFilename: `styles/chunk.[name].[chunkhash:8].css`,  // 异步导入(import)模块被打包后的文件路径定义
		},
		entry: {
			main: utils.resolveDirectory(`./src/client/index.tsx`),
		},
		output: {
			filename: `srcipts/srcipt.[name].[hash:8].js`,
			chunkFilename: `srcipts/chunk.[name].[chunkhash:8].js`,  // 异步导入(import)模块被打包后的文件路径定义
		},
		loader: {
			imagesFilename: `images/[name].[hash:8].[ext]`,
			fontsFilename: `fonts/[name].[hash:8].[ext]`,
		},
		devBuild: {
			publicPath: '/',
			pathTag: 'client-dev',
			path() {
				return utils.resolveDirectory(`./dist/${this.pathTag}`)
			},
			htmlWebpackPluginFilename: `./index.html`,
			htmlWebpackPluginTemplate: utils.resolveDirectory(`./src/app/template/index.ejs`),
			/* ... */
			pathTagForSSR: 'ssr-client-dev',
			pathForSSR() {
				return utils.resolveDirectory(`./dist/${this.pathTagForSSR}`)
			},
		},
		prodBuild: {
			publicPath: '/',
			pathTag: 'client-prod',
			path() {
				return utils.resolveDirectory(`./dist/${this.pathTag}`)
			},
			htmlWebpackPluginFilename: `./index.html`,
			htmlWebpackPluginTemplate: utils.resolveDirectory(`./src/app/template/index.ejs`),
			/* ... */
			pathTagForSSR: 'ssr-client-prod',
			pathForSSR() {
				return utils.resolveDirectory(`./dist/${this.pathTagForSSR}`)
			},
		},
		resolve: {
			extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
			alias: {
				'@': utils.resolveDirectory('./src/app/'),
			},
		},
	},
	server: {
		entry: {
			main: utils.resolveDirectory(`./src/server/index.ts`),
		},
		output: {
			filename: `server.js`,
		},
		devBuild: {
			pathTag: 'ssr-server-dev',
			publicPath: '/',
			path() {
				return utils.resolveDirectory(`./dist/${this.pathTag}`)
			},
		},
		prodBuild: {
			pathTag: 'ssr-server-prod',
			publicPath: '/',
			path() {
				return utils.resolveDirectory(`./dist/${this.pathTag}`)
			},
		},
	},
}
