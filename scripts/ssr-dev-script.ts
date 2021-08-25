/*
	生成 SSR 开发包的构建脚本
 */
import webpack from 'webpack'
import nodemon from 'nodemon'
import koa from 'koa'
import rimraf from 'rimraf'
import koaCors from 'koa-cors'
import devClientWebpackConfig from '../config/webpack-client.dev.config'
import devServerWebpackConfig from '../config/webpack-server.dev.config'
import paths from '../config/webpack.paths'
import { logger, compilerPromise, ICompilerPromise } from './utils/utils'
import { buildConfig } from './config'
import webpackDevMiddleware from './middleware/koa-webpack-dev-middleware'
import webpackHotMiddleware from './middleware/koa-webpack-hot-middleware'

const clientPaths: { [key: string]: any } = paths.client
const serverPaths: { [key: string]: any } = paths.server
const devClientWebpackCfg: { [key: string]: any } = devClientWebpackConfig
const devServerWebpackCfg: { [key: string]: any } = devServerWebpackConfig

const app: koa = new koa()
app.use(
	koaCors({
		// @ts-ignore
		origin(ctx: koa.Context) {
			return '*'
		},
		exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
		credentials: true,
		allowMethods: ['GET', 'POST', 'DELETE'],
		allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
	})
)
app.use(async (ctx: koa.Context, next: koa.Next) => {
	if (['/', '/favicon.ico'].includes(ctx.request.path)) {
		ctx.body = `This is Build Server, No Content Body`
	}
	await next()
})

const serverBuildPort: number = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : buildConfig.ssr.defaultPort
const serverBuildHost: string = buildConfig.ssr.defaultHost

const rimrafPaths = (): void => {
	try {
		rimraf.sync(clientPaths.devBuild.pathForSSR())
		rimraf.sync(serverPaths.devBuild.path())
	} catch (e) {
		logger.error(`[Error] Init Directory Fail.`)
	}
}

let serverHandler: any = null
const handler = async (app: koa): Promise<void> => {
	logger.info(`[Info] Starting build...`)
	const startStamp: number = Date.now()

	devClientWebpackCfg.output.path = clientPaths.devBuild.pathForSSR()
	devClientWebpackCfg.entry.client = [
		`webpack-hot-middleware/client?path=http://${serverBuildHost}:${serverBuildPort}/__webpack_hmr&timeout=10000&reload=true`,
		devClientWebpackCfg.entry.client,
	]

	devClientWebpackCfg.output.hotUpdateMainFilename = `updates/[hash].hot-update.json`
	devClientWebpackCfg.output.hotUpdateChunkFilename = `updates/[id].[hash].hot-update.js`
	devServerWebpackCfg.output.hotUpdateMainFilename = `updates/[hash].hot-update.json`
	devServerWebpackCfg.output.hotUpdateChunkFilename = `updates/[id].[hash].hot-update.js`

	const devClientPublicPath: string = devClientWebpackCfg.output.publicPath
	const devServerPublicPath: string = devServerWebpackCfg.output.publicPath

	devClientWebpackCfg.output.publicPath = `http://${serverBuildHost}:${serverBuildPort}${devClientPublicPath}`
	devServerWebpackCfg.output.publicPath = `http://${serverBuildHost}:${serverBuildPort}${devClientPublicPath}`

	const clientCompiler: any = webpack(devClientWebpackCfg)
	const serverCompiler: any = webpack(devServerWebpackCfg)
	const clientPromise: Promise<ICompilerPromise> = compilerPromise('client', clientCompiler)
	const serverPromise: Promise<ICompilerPromise> = compilerPromise('server', serverCompiler)

	app.use(
		webpackDevMiddleware(clientCompiler, {
			publicPath: devClientWebpackCfg.output.publicPath,
			stats: devClientWebpackCfg.stats,
			writeToDisk: true,
		})
	)
	app.use(webpackHotMiddleware(clientCompiler))

	app.listen(serverBuildPort)
	logger.info(`[Info] Build service Started - http://${serverBuildHost}:${serverBuildPort}`)

	const clientWatchOptions: { [key: string]: any } = {
		ignored: /node_modules/,
		stats: devClientWebpackCfg.stats,
	}
	clientCompiler.watch(clientWatchOptions, (error: any, stats: any) => {
		if (error) {
			logger.error(error)
		}
		if (stats && stats.hasErrors()) {
			const info: any = stats.toJson()
			info.errors.forEach((item: any) => {
				logger.error(item)
			})
		}
	})

	const serverWatchOptions: { [key: string]: any } = {
		ignored: /node_modules/,
		stats: devClientWebpackCfg.stats,
	}
	serverCompiler.watch(serverWatchOptions, (error: any, stats: any) => {
		if (error) {
			logger.error(error)
		}
		if (stats && stats.hasErrors()) {
			const info = stats.toJson()
			info.errors.forEach((item: any) => {
				logger.error(item)
			})
		}
	})

	try {
		await clientPromise
		await serverPromise
	} catch (error) {
		logger.error(`[Error] Build failed...`)
		console.error(error)
		return
	}
	logger.warn(`[Info] Build Time Consuming ${(Date.now() - startStamp) / 1000}s`)

	logger.info(`[Info] Render Server Starting.`)
	const serverEntryPath: string = paths.server.devBuild.path() + '/' + paths.server.output.filename
	const ignore: string[] = [
		...buildConfig.ssr.nodemon.ignore,
		`./dist/${clientPaths.devBuild.pathTag}`,
		`./dist/${clientPaths.devBuild.pathTagForSSR}`,
		`./dist/${clientPaths.prodBuild.pathTag}`,
		`./dist/${clientPaths.prodBuild.pathTagForSSR}`,
		`./dist/${serverPaths.prodBuild.pathTag}`,
	]
	serverHandler = nodemon({
		script: serverEntryPath,
		...buildConfig.ssr.nodemon,
		ignore,
		watch: [`./dist/${serverPaths.devBuild.pathTag}`],
	})
	serverHandler.on('start', () => {
		logger.warn(`[Info] Render Server Started.`)
	})
	serverHandler.on('restart', () => {
		logger.warn(`[Info] Render Server Restart.`)
	})
	serverHandler.on('quit', () => {
		logger.info(`[Info] Render Server Quit.`)
		process.exit()
	})
	serverHandler.on('error', () => {
		logger.error(`[Info] An error occured. Exiting.`)
		process.exit(1)
	})
}

rimrafPaths()
handler(app)
