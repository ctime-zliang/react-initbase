/*
	生成 CSR 生产包的构建脚本
 */
import webpack from 'webpack'
import rimraf from 'rimraf'
import prodClientWebpackConfig from '../../config/webpack/webpack-client.prod.config'
import { logger, compilerPromise, ICompilerPromise } from '../utils/utils'
import paths from '../../config/webpack/webpack.paths'

const prodClientWebpackCfg: { [key: string]: any } = prodClientWebpackConfig
const rimrafPaths = (): void => {
	try {
		rimraf.sync(paths.client.prodBuild.path())
	} catch (e) {
		logger.error(`Init Directory Fail.`)
	}
}

const handler = async (): Promise<void> => {
	logger.info(`Starting build...`)
	const startStamp: number = Date.now()

	const clientCompiler: any = webpack(prodClientWebpackCfg)
	const clientPromise: Promise<ICompilerPromise> = compilerPromise('client', clientCompiler)

	clientCompiler.watch({}, (error: any, stats: any) => {
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
		logger.error(`Build failed...`)
		//@ts-ignore
		console.log(error.stats.compilation.errors)
		return
	}
	logger.info(`Build Time Consuming ${(Date.now() - startStamp) / 1000}s`)
	logger.info(`Client(Production) Compiled Completed.`)
}

rimrafPaths()
handler()
