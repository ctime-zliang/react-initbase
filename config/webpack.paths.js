const path = require('path')
const utils = require('./utils')

module.exports = {
	common: {
		buildRoot: utils.resolveDirectory(`./dist/`),
	},
	client: {
		base: {
			stylesSheetFilename: `styles/style.[hash:8].css`,
			stylesSheetChunkFilename: `styles/chunk.[hash:8].css`,
		},
		entry: {
			main: utils.resolveDirectory(`./src/client/index.tsx`),
		},
		output: {
			filename: `srcipts/srcipt.[hash:8].js`,
			chunkFilename: `srcipts/chunk.[chunkhash:8].js`,
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
