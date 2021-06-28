import webpack from 'webpack'
import nodemon from 'nodemon'
import Koa from 'koa'
import rimraf from 'rimraf'
const koaCors = require('koa-cors')
import devClientWebpackConfig from '../config/webpack-client.dev.config'
import devServerWebpackConfig from '../config/webpack-server.dev.config'
import paths from '../config/webpack.paths'
import { logger, compilerPromise } from './utils'
import { buildConfig } from './config'
// @ts-ignore
import { devMiddleware as webpackDevMiddleware, hotMiddleware as webpackHotMiddleware } from 'koa-webpack-middleware'

const clientPaths = paths.client
const serverPaths = paths.server 

rimraf.sync(clientPaths.devBuild.pathForSSR())
rimraf.sync(serverPaths.devBuild.path())

const app = new Koa()

app.use(
	koaCors({
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

const handler = async (app: Koa) => {
	logger.info(`[Info] Starting build...`)

	devClientWebpackConfig.output.path = clientPaths.devBuild.pathForSSR()	
	devClientWebpackConfig.entry.bundle = [
		`webpack-hot-middleware/client?path=http://${serverBuildHost}:${serverBuildPort}/__webpack_hmr`,
		devClientWebpackConfig.entry.client || '',
	]
	devClientWebpackConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json'
	devClientWebpackConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js'

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
	logger.info(`[Info] Build service has started.`)

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
		console.error(error)
	}

	logger.info(`[Info] Remote service will be start.`)
	const serverPath = paths.server.devBuild.path() + '/' + paths.server.output.filename
	const script = nodemon({
		script: serverPath,
		...buildConfig.ssr.nodemon,
	})
	script.on('start', () => {
		logger.info(`[Info] Remote service has been started.`)
	})
	script.on('restart', () => {
		logger.info(`[Info] Remote service has been restart.`)
	})
	script.on('quit', () => {
		logger.info(`[Info] Remote service has been quit.`)
		process.exit()
	})
	script.on('error', () => {
		logger.error(`[Info] An error occured. Exiting.`)
		process.exit(1)
	})
}

handler(app)
