/*
	生成 SSR 生产包的构建脚本
 */
import webpack from 'webpack'
import rimraf from 'rimraf'
import prodClientWebpackConfig from '../../config/webpack/webpack-client.prod.config'
import prodServerWebpackConfig from '../../config/webpack/webpack-server.prod.config'
import paths from '../../config/webpack/webpack.paths'
import { logger, compilerPromise, ICompilerPromise } from '../utils/utils'

const prodClientWebpackCfg: { [key: string]: any } = prodClientWebpackConfig
const prodServerWebpackCfg: { [key: string]: any } = prodServerWebpackConfig
const rimrafPaths = (): void => {
	try {
		rimraf.sync(paths.client.prodBuild.pathForSSR())
		rimraf.sync(paths.server.prodBuild.path())
	} catch (e) {
		logger.error(`Init Directory Fail.`)
	}
}

const handler = async (): Promise<void> => {
	logger.info(`Starting build...`)
	const startStamp: number = Date.now()

	prodClientWebpackCfg.output.publicPath = paths.client.prodBuild.publicPathForSSR
	prodClientWebpackCfg.output.path = paths.client.prodBuild.pathForSSR()

	const clientCompiler: any = webpack(prodClientWebpackCfg)
	const serverCompiler: any = webpack(prodServerWebpackCfg)
	const clientPromise: Promise<ICompilerPromise> = compilerPromise('client', clientCompiler)
	const serverPromise: Promise<ICompilerPromise> = compilerPromise('server', serverCompiler)

	const serverWatchOptions: { [key: string]: any } = {
		ignored: /node_modules/,
		stats: prodClientWebpackCfg.stats,
	}
	serverCompiler.watch(serverWatchOptions, (error: any, stats: any) => {
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
		logger.error(`Build failed...`)
		//@ts-ignore
		console.log(error.stats.compilation.errors)
		return
	}
	logger.info(`Build Time Consuming ${(Date.now() - startStamp) / 1000}s`)
	logger.info(`SSR(Production) Compiled Completed.`)
}

rimrafPaths()
handler()
