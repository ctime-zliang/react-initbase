import webpack from 'webpack'
import rimraf from 'rimraf'
import prodClientWebpackConfig from '../config/webpack-client.prod.config'
import { logger, compilerPromise } from './utils/utils'
import paths from '../config/webpack.paths'

const clientPaths: { [key: string]: any } = paths.client

const prodClientWebpackCfg: { [key: string]: any } = prodClientWebpackConfig

const rimrafPaths = () => {
	try {
		rimraf.sync(clientPaths.prodBuild.path())
	} catch (e) {
		logger.error(`[Error] Init Directory Fail.`)
	}
}

const handler = async () => {
	logger.info(`[Info] Starting build...`)
	const startStamp: number = Date.now()

	const clientCompiler: any = webpack(prodClientWebpackCfg)
	const clientPromise = compilerPromise('client', clientCompiler)

	clientCompiler.watch({}, (error: any, stats: any) => {
		if (!error && !stats.hasErrors()) {
			logger.error(stats.toString(prodClientWebpackCfg.stats))
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
		await clientPromise
	} catch (error) {
		logger.error(`[Error] Build failed...`)
		console.error(error)
		return
	}
	logger.success(`[Success] Build successed.`)
	logger.warn(`[Build Time Consuming] ${(Date.now() - startStamp) / 1000}s`)
	logger.info(`[Info]: Client(Production) Compiled Completed.`)
}

rimrafPaths()
handler()
