import webpack from 'webpack'
import rimraf from 'rimraf'
import prodClientWebpackConfig from '../config/webpack-client.prod.config'
import prodServerWebpackConfig from '../config/webpack-server.prod.config'
import paths from '../config/webpack.paths'
import { logger, compilerPromise } from './utils/utils'

const clientPaths = paths.client
const serverPaths = paths.server

const rimrafPaths = () => {
	try {
		rimraf.sync(clientPaths.prodBuild.pathForSSR())
		rimraf.sync(serverPaths.prodBuild.path())
	} catch (e) {
		logger.error(`[Error] Init Directory Fail.`)
	}
}

const handler = async () => {
	logger.info(`[Info] Starting build...`)
	const startStamp = Date.now()

	;(prodClientWebpackConfig as {[key: string]: any}).output.path = clientPaths.prodBuild.pathForSSR()

	const clientCompiler: any = webpack(prodClientWebpackConfig)
	const serverCompiler: any = webpack(prodServerWebpackConfig)
	const clientPromise = compilerPromise('client', clientCompiler)
	const serverPromise = compilerPromise('server', serverCompiler)

	const serverWatchOptions = {
		ignored: /node_modules/,
		stats: prodClientWebpackConfig.stats,
	}
	serverCompiler.watch(serverWatchOptions, (error: any, stats: any) => {
		if (!error && !stats.hasErrors()) {
			console.log(stats.toString(prodServerWebpackConfig.stats))
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

	const clientWatchOptions = {
		ignored: /node_modules/,
		stats: prodClientWebpackConfig.stats,
	}
	clientCompiler.watch(clientWatchOptions, (error: any, stats: any) => {
		if (!error && !stats.hasErrors()) {
			console.log(stats.toString(prodClientWebpackConfig.stats))
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
		logger.warn(`[Build Time Consuming] ${(Date.now() - startStamp) / 1000}s`)
		return
	}
	logger.warn(`[Build Time Consuming] ${(Date.now() - startStamp) / 1000}s`)
}

rimrafPaths()
handler()
