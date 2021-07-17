import webpack from 'webpack'
import nodemon, { restart } from 'nodemon'
import { exec } from 'child_process'
import Koa from 'koa'
import rimraf from 'rimraf'
import koaCors from 'koa-cors'
import devClientWebpackConfig from '../config/webpack-client.dev.config'
import devServerWebpackConfig from '../config/webpack-server.dev.config'
import paths from '../config/webpack.paths'
import { logger, compilerPromise } from './utils/utils'
import { buildConfig } from './config'
// @ts-ignore
import webpackDevMiddleware from './utils/koa-webpack-dev-middleware'
import webpackHotMiddleware from './utils/koa-webpack-hot-middleware3'

const clientPaths = paths.client
const serverPaths = paths.server

const devClientWebpackCfg: any = devClientWebpackConfig
const devServerWebpackCfg: any = devServerWebpackConfig

const app = new Koa()
app.use(
	koaCors({
		// @ts-ignore
		origin(ctx: Koa.Context) {
			return ctx.header.origin
		},
		exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
		credentials: true,
		allowMethods: ['GET', 'POST', 'DELETE'],
		allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
	})
)
app.use(async (ctx: Koa.Context, next: Koa.Next) => {
	if (['/', '/favicon.ico'].includes(ctx.request.path)) {
		ctx.body = `This is Build Server, No Content Body`
	}
	await next()
})

const serverBuildPort = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : buildConfig.ssr.defaultPort
const serverBuildHost = buildConfig.ssr.defaultHost

const serverEntryPath = paths.server.devBuild.path() + '/' + paths.server.output.filename

const rimrafPaths = () => {
	try {
		rimraf.sync(clientPaths.devBuild.pathForSSR())
		rimraf.sync(serverPaths.devBuild.path())
	} catch (e) {
		logger.error(`[Error] Init Directory Fail.`)
	}
}

const handler = async (app: any) => {
	logger.info(`[Info] Starting build...`)
	const startStamp = Date.now()

	devClientWebpackCfg.output.path = clientPaths.devBuild.pathForSSR()
	devClientWebpackCfg.entry.client = [
		`webpack-hot-middleware/client?path=http://${serverBuildHost}:${serverBuildPort}/__webpack_hmr&timeout=10000&reload=true`,
		devClientWebpackCfg.entry.client,
	]

	devClientWebpackCfg.output.hotUpdateMainFilename = `updates/[hash].hot-update.json`
	devClientWebpackCfg.output.hotUpdateChunkFilename = `updates/[id].[hash].hot-update.js`

	const devClientPublicPath = devClientWebpackCfg.output.publicPath
	const devServerPublicPath = devServerWebpackCfg.output.publicPath

	devClientWebpackCfg.output.publicPath = `http://${serverBuildHost}:${serverBuildPort}${devClientPublicPath}`
	devServerWebpackCfg.output.publicPath = `http://${serverBuildHost}:${serverBuildPort}${devClientPublicPath}`

	const clientCompiler: any = webpack(devClientWebpackCfg)
	const serverCompiler: any = webpack(devServerWebpackCfg)
	const clientPromise = compilerPromise('client', clientCompiler)
	const serverPromise = compilerPromise('server', serverCompiler)

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

	// const clientWatchOptions = {
	// 	ignored: /node_modules/,
	// 	stats: devClientWebpackCfg.stats,
	// }
	// clientCompiler.watch(clientWatchOptions, (error: any, stats: any) => {
	// 	if (error) {
	// 		logger.error(error)
	// 	}
	// 	if (stats && stats && stats.hasErrors()) {
	// 		const info = stats.toJson()
	// 		const errors = info.errors[0].split('\n')
	// 		errors.forEach((item: any) => {
	// 			logger.error(item)
	// 		})
	// 	}
	// })

	const serverWatchOptions = {
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

	serverExecer()
}

const serverExecer = () => {
	logger.info(`[Info] Render Server Starting.`)
	const serverHandler = nodemon({
		script: serverEntryPath,
		...buildConfig.ssr.nodemon,
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
