import webpack from 'webpack'
import rimraf from 'rimraf'
import prodClientWebpackConfig from '../config/webpack-client.prod.config'
import { logger, compilerPromise } from './utils'
import paths from '../config/webpack.paths'

const clientPaths = paths.client

rimraf.sync(clientPaths.proBuild.path())

const handler = async () => {
	logger.info(`[Info] Starting build...`)

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
		console.error(error)
	}
	logger.success(`[Success] Build successed.`)
}

handler()
