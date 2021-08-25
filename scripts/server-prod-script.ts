/*
	生成仅 Server 生产包的构建脚本
 */
import webpack from 'webpack'
import rimraf from 'rimraf'
import prodServerWebpackConfig from '../config/webpack-server.prod.config'
import paths from '../config/webpack.paths'
import { logger, compilerPromise, ICompilerPromise } from './utils/utils'

const serverPaths: { [key: string]: any } = paths.server
const prodServerWebpackCfg: { [key: string]: any } = prodServerWebpackConfig

const rimrafPaths = (): void => {
	try {
		rimraf.sync(serverPaths.prodBuild.path())
	} catch (e) {
		logger.error(`[Error] Init Directory Fail.`)
	}
}

const handler = async (): Promise<void> => {
	logger.info(`[Info] Starting build...`)
	const startStamp: number = Date.now()

	const serverCompiler: any = webpack(prodServerWebpackCfg)
	const serverPromise: Promise<ICompilerPromise> = compilerPromise('server', serverCompiler)

	const serverWatchOptions: { [key: string]: any } = {
		ignored: /node_modules/,
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
			const info = stats.toJson()
			info.errors.forEach((item: any) => {
				logger.error(item)
			})
		}
	})

	try {
		await serverPromise
	} catch (error) {
		logger.error(`[Error] Build failed...`)
		console.error(error)
		logger.warn(`[Build Time Consuming] ${(Date.now() - startStamp) / 1000}s`)
		return
	}
	logger.warn(`[Build Time Consuming] ${(Date.now() - startStamp) / 1000}s`)
	logger.info(`[Info]: Server(Production) Compiled Completed.`)
}

rimrafPaths()
handler()
