import app from './app'
import envConfig from './config/env.export'
import logger from './lib/simple-logger'

const isDev = process.env.NODE_ENV === 'development'
const handler = app.callback()

if (isDev) {
	app.listen((envConfig as any).port, (envConfig as any).host, async () => {
		logger.trace(`App.running - http://${(envConfig as any).host}:${(envConfig as any).port}`)
	})
}

export default handler
