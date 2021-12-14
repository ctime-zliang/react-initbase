import { getLocalIP } from '@server/utils/utils'
import app from '@server/app'
import envConfig from '@server/config/env.export'
import logger from '@server/lib/simple-logger'

const isDev: boolean = process.env.NODE_ENV === 'development'
const handler: any = app.callback()

const startServer = (host: string = '127.0.0.1', port: number = 0, tag: string = 'Locale'): void => {
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
startServer(envConfig?.host, envConfig?.port, 'Locale')
const localIP: string | null = getLocalIP()
// localIP && startServer(localIP as string, envConfig?.port, 'Net Work')

export default handler
