/*
	生成 SSR 生产包的构建脚本
 */
import webpack from 'webpack'
import rimraf from 'rimraf'
import prodClientWebpackConfig from '../config/webpack-client.prod.config'
import prodServerWebpackConfig from '../config/webpack-server.prod.config'
import paths from '../config/webpack.paths'
import { logger, compilerPromise, ICompilerPromise } from './utils/utils'

const clientPaths: { [key: string]: any } = paths.client
const serverPaths: { [key: string]: any } = paths.server
const prodClientWebpackCfg: { [key: string]: any } = prodClientWebpackConfig
const prodServerWebpackCfg: { [key: string]: any } = prodServerWebpackConfig

const rimrafPaths = (): void => {
	try {
		rimraf.sync(clientPaths.prodBuild.pathForSSR())
		rimraf.sync(serverPaths.prodBuild.path())
	} catch (e) {
		logger.error(`[Error] Init Directory Fail.`)
	}
}

const handler = async (): Promise<void> => {
	logger.info(`[Info] Starting build...`)
	const startStamp: number = Date.now()

	prodClientWebpackCfg.output.path = clientPaths.prodBuild.pathForSSR()

	const clientCompiler: any = webpack(prodClientWebpackCfg)
	const serverCompiler: any = webpack(prodServerWebpackCfg)
	const clientPromise: Promise<ICompilerPromise> = compilerPromise('client', clientCompiler)
	const serverPromise: Promise<ICompilerPromise> = compilerPromise('server', serverCompiler)

	const serverWatchOptions: { [key: string]: any } = {
		ignored: /node_modules/,
		stats: prodClientWebpackCfg.stats,
	}
	serverCompiler.watch(serverWatchOptions, (error: any, stats: any) => {
		if (!error && !stats.hasErrors()) {
			logger.error(stats.toString(prodServerWebpackCfg.stats))
			return
		}
		if (error) {
			logger.error(error)
		}
		if (stats.hasErrors()) {
			const info: any = stats.toJson()
			info.errors.forEach((item: any) => {
				logger.error(item)
			})
		}
	})

	const clientWatchOptions: { [key: string]: any } = {
		ignored: /node_modules/,
		stats: prodClientWebpackCfg.stats,
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
