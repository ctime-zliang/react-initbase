import webpack from 'webpack'
import rimraf from 'rimraf'
import prodClientWebpackConfig from '../config/webpack-client.prod.config'
import { logger, compilerPromise } from './utils/utils'
import paths from '../config/webpack.paths'

const clientPaths = paths.client

const rimrafPaths = () => {
	try {
		rimraf.sync(clientPaths.prodBuild.path())
	} catch (e) {
		logger.error(`[Error] Init Directory Fail.`)
	}
}

const handler = async () => {
	logger.info(`[Info] Starting build...`)
	const startStamp = Date.now()

	const clientCompiler: any = webpack(prodClientWebpackConfig as any)
	const clientPromise = compilerPromise('client', clientCompiler)

	clientCompiler.watch({}, (error: any, stats: any) => {
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
	} catch (error) {
		logger.error(`[Error] Build failed...`)
		logger.info(`[Build Time Consuming] ${(Date.now() - startStamp) / 1000}s`)
		console.error(error)
		return
	}
	logger.success(`[Success] Build successed.`)
	logger.info(`[Build Time Consuming] ${(Date.now() - startStamp) / 1000}s`)
}

rimrafPaths()
handler()
