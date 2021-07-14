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
import { devMiddleware as webpackDevMiddleware, hotMiddleware as webpackHotMiddleware } from 'koa-webpack-middleware'

const clientPaths = paths.client
const serverPaths = paths.server

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
	if (['GET'].includes(ctx.request.method.toLocaleUpperCase())) {
		ctx.body = `Build Server`
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

	devClientWebpackConfig.output.path = clientPaths.devBuild.pathForSSR()
	devClientWebpackConfig.entry.bundle = [
		`webpack-hot-middleware/client?path=http://${serverBuildHost}:${serverBuildPort}/__webpack_hmr`,
		devClientWebpackConfig.entry.client || '',
	]
	devClientWebpackConfig.output.hotUpdateMainFilename = `updates/[hash].hot-update.json`
	devClientWebpackConfig.output.hotUpdateChunkFilename = `updates/[id].[hash].hot-update.js`

	const devClientPublicPath = devClientWebpackConfig.output.publicPath
	const devServerPublicPath = devServerWebpackConfig.output.publicPath

	devClientWebpackConfig.output.publicPath = `http://${serverBuildHost}:${serverBuildPort}${devClientPublicPath}`
	devServerWebpackConfig.output.publicPath = `http://${serverBuildHost}:${serverBuildPort}${devClientPublicPath}`

	const clientCompiler: any = webpack(devClientWebpackConfig)
	const serverCompiler: any = webpack(devServerWebpackConfig)
	const clientPromise = compilerPromise('client', clientCompiler)
	const serverPromise = compilerPromise('server', serverCompiler)

	const serverWatchOptions = {
		ignored: /node_modules/,
		stats: devClientWebpackConfig.stats,
	}

	app.use(
		webpackDevMiddleware(clientCompiler, {
			publicPath: devClientWebpackConfig.output.publicPath,
			stats: devClientWebpackConfig.stats,
			serverWatchOptions,
		})
	)
	app.use(webpackHotMiddleware(clientCompiler))

	app.listen(serverBuildPort)
	logger.info(`[Info] Build service Started - http://${serverBuildHost}:${serverBuildPort}`)

	serverCompiler.watch(serverWatchOptions, (error: any, stats: any) => {
		if (!error && !stats.hasErrors()) {
			console.log(stats.toString(devServerWebpackConfig.stats))
			return
		}
		if (error) {
			logger.error(error)
		}
		if (stats.hasErrors()) {
			const info = stats.toJson()
			const errors = info.errors[0].split('\n')
			errors.forEach((item: any) => {
				logger.error(item)
			})
		}
	})

	try {
		await clientPromise
		await serverPromise
	} catch (error) {
		logger.error(`[Error] Build failed...`)
		logger.warn(`[Info]  Build Time Consuming ${(Date.now() - startStamp) / 1000}s`)
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
