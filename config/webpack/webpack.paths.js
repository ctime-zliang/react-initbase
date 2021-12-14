const path = require('path')
const utils = require('../utils')

module.exports = {
	common: {
		// buildRoot: utils.resolveDirectory(`./dist/`),
		i18n: {
			locales: utils.resolveDirectory(`./src/app/i18n/locales`),
		},
		resolve: {
			extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
			alias: {
				'@': utils.resolveDirectory('./src/'),
				'@app': utils.resolveDirectory('./src/app/'),
				'@server': utils.resolveDirectory('./src/server/'),
				'@client': utils.resolveDirectory('./src/client/'),
			},
		},
		loader: {
			imagesOutputPath: `images/`,
			imagesFilename: `[name].[hash:8].[ext]`,
			fileOutputPath: `assets/`,
			filename: `[name].[hash:8].[ext]`,
		},
		cssExtract: {
			filename: `styles/style.[name].[hash:8].css`,
			chunkFilename: `styles/chunks.[name].[chunkhash:8].css`,
		},
	},
	client: {
		entry: {
			main: utils.resolveDirectory(`./src/client/index.tsx`),
		},
		output: {
			filename: `srcipts/build.[name].[hash:8].js`,
			chunkFilename: `srcipts/chunks.[name].[chunkhash:8].js`, // 异步导入(import)模块被打包后的文件路径定义
		},
		devBuild: {
			publicPath: '/',
			pathTag: 'client-dev',
			htmlWebpackPluginFilename: `./index.html`,
			htmlWebpackPluginTemplate: utils.resolveDirectory(`./src/app/template/index.ejs`),
			/* ... */
			path() {
				return utils.resolveDirectory(`./dist/${this.pathTag}`)
			},
			/* ... */
			pathTagForSSR: 'ssr-client-dev',
			pathForSSR() {
				return utils.resolveDirectory(`./dist/${this.pathTagForSSR}`)
			},
		},
		prodBuild: {
			publicPath: '/',
			htmlWebpackPluginFilename: `./index.html`,
			htmlWebpackPluginTemplate: utils.resolveDirectory(`./src/app/template/index.ejs`),
			/* ... */
			pathTag: 'client-prod',
			path() {
				return utils.resolveDirectory(`./dist/${this.pathTag}`)
			},
			/* ... */
			pathTagForSSR: 'ssr-client-prod',
			pathForSSR() {
				return utils.resolveDirectory(`./dist/${this.pathTagForSSR}`)
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
			publicPath: '/',
			/* ... */
			pathTag: 'ssr-server-dev',
			path() {
				return utils.resolveDirectory(`./dist/${this.pathTag}`)
			},
		},
		prodBuild: {
			publicPath: '/',
			/* ... */
			pathTag: 'ssr-server-prod',
			path() {
				return utils.resolveDirectory(`./dist/${this.pathTag}`)
			},
		},
	},
}
