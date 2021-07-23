import { getLocalIP } from './utils/utils'
import app from './app'
import envConfig from './config/env.export'
import logger from './lib/simple-logger'

const isDev = process.env.NODE_ENV === 'development'
const handler = app.callback()

const startServer = (host: string = '127.0.0.1', port: number = 0, tag: string = 'Locale') => {
	const server: any = app.listen(port, host, async () => {
		const addressInfo = server.address()
		logger.trace(`App.running - ${tag} - http://${addressInfo.address}:${addressInfo.port}`)
	})
}

/*
	开启局域网服务
		如果出现跨域失败
		可以进入 chrome://flags/#block-insecure-private-network-requests 设置 Block insecure private network requests. 为 Disabled

	通常情况下无需开启局域网服务
 */
if (true) {
	startServer(envConfig?.host, envConfig?.port, 'Locale')
	const localIP = getLocalIP()
	// localIP && startServer(localIP, envConfig?.port, 'Net Work')
}

export default handler
