import webpack from 'webpack'
import rimraf from 'rimraf'
import prodClientWebpackConfig from '../config/webpack-client.prod.config'
import prodServerWebpackConfig from '../config/webpack-server.prod.config'
import paths from '../config/webpack.paths'
import { logger, compilerPromise } from './utils/utils'

const clientPaths = paths.client
const serverPaths = paths.server

const prodClientWebpackCfg: any = prodClientWebpackConfig
const prodServerWebpackCfg: any = prodServerWebpackConfig

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

	prodClientWebpackCfg.output.path = clientPaths.prodBuild.pathForSSR()

	const clientCompiler: any = webpack(prodClientWebpackCfg)
	const serverCompiler: any = webpack(prodServerWebpackCfg)
	const clientPromise = compilerPromise('client', clientCompiler)
	const serverPromise = compilerPromise('server', serverCompiler)

	const serverWatchOptions = {
		ignored: /node_modules/,
		stats: prodClientWebpackCfg.stats,
	}
	serverCompiler.watch(serverWatchOptions, (error: any, stats: any) => {
		if (!error && !stats.hasErrors()) {
			console.log(stats.toString(prodServerWebpackCfg.stats))
			return
		}
		if (error) {
			logger.error(error)
		}
		if (stats.hasErrors()) {
			const info = stats.toJson()
			info.errors.forEach((item: any) => {
				logger.error(item)
			})
		}
	})

	const clientWatchOptions = {
		ignored: /node_modules/,
		stats: prodClientWebpackCfg.stats,
	}
	clientCompiler.watch(clientWatchOptions, (error: any, stats: any) => {
		if (error) {
			logger.error(error)
		}
		if (stats && stats.hasErrors()) {
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
		return
	}
	logger.warn(`[Build Time Consuming] ${(Date.now() - startStamp) / 1000}s`)
	logger.info(`[Info]: SSR(Production) Compiled Completed.`)
}

rimrafPaths()
handler()
