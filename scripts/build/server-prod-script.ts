/*
	生成仅 Server 生产包的构建脚本
 */
import webpack from 'webpack'
import rimraf from 'rimraf'
import prodServerWebpackConfig from '../../config/webpack/webpack-server.prod.config'
import paths from '../../config/webpack/webpack.paths'
import { logger, compilerPromise, ICompilerPromise } from '../utils/utils'

const prodServerWebpackCfg: { [key: string]: any } = prodServerWebpackConfig
const rimrafPaths = (): void => {
	try {
		rimraf.sync(paths.server.prodBuild.path())
	} catch (e) {
		logger.error(`Init Directory Fail.`)
	}
}

const handler = async (): Promise<void> => {
	logger.info(`Starting build...`)
	const startStamp: number = Date.now()

	const serverCompiler: any = webpack(prodServerWebpackCfg)
	const serverPromise: Promise<ICompilerPromise> = compilerPromise('server', serverCompiler)

	const serverWatchOptions: { [key: string]: any } = {
		ignored: /node_modules/,
	}
	serverCompiler.watch(serverWatchOptions, (error: any, stats: any) => {
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
		logger.error(`Build failed...`)
		//@ts-ignore
		console.log(error.stats.compilation.errors)
		return
	}
	logger.info(`Build Time Consuming ${(Date.now() - startStamp) / 1000}s`)
	logger.info(`Server(Production) Compiled Completed.`)
}

rimrafPaths()
handler()
