/* 
	在部分 Windows 平台上以开发模式运行此中间件时可能存在某些不可预料的错误
		例如:
			- Cannot call write after a stream was destroyed
	因此基于 webpack-hot-middleware 源码做了部分修改
 */
import { parse } from 'url'

const pathMatch = (url: string, path: string): boolean => {
	try {
		return parse(url).pathname === path
	} catch (e: any) {
		return false
	}
}

const createEventStream = (heartbeat: number): { [key: string]: any } => {
	let clientId: number = 0
	let clients: { [key: string]: any } = {}
	let everyClient: Function = (fn: Function) => {
		Object.keys(clients).forEach((id: string | number) => {
			fn(clients[id])
		})
	}
	let intervalRes: any = setInterval((): void => {
		everyClient((client: any): void => {
			if (!client.stream.destroyed) {
				client.write('data: \uD83D\uDC93\n\n')
			}
		})
	}, heartbeat)
	let interval: number = intervalRes.unref()

	return {
		/* ... */
		close(): void {
			clearInterval(interval)
			everyClient((client: any): void => {
				if (!client.finished) {
					client.end()
				}
			})
			clients = {}
		},
		/* ... */
		handler(req: any, res: any): void {
			let headers: { [key: string]: any } = {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'text/event-stream;charset=utf-8',
				'Cache-Control': 'no-cache, no-transform',
				// While behind nginx, event stream should not be buffered:
				// http://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffering
				'X-Accel-Buffering': 'no',
			}
			let isHttp1: boolean = !(parseInt(req.httpVersion) >= 2)
			if (isHttp1) {
				req.socket.setKeepAlive(true)
				Object.assign(headers, {
					Connection: 'keep-alive',
				})
			}
			res.writeHead(200, headers)
			res.write('\n')
			let id: number = clientId++
			clients[id] = res
			req.on('close', (): void => {
				if (!res.finished) {
					res.end()
				}
				delete clients[id]
			})
		},
		/* ... */
		publish(payload: { [key: string]: any }): void {
			everyClient((client: any): void => {
				if (!client.stream.destroyed) {
					client.write('data: ' + JSON.stringify(payload) + '\n\n')
				}
			})
		},
	}
}

const publishStats = (action: any, statsResult: { [key: string]: any }, eventStream: any, log?: (a: any) => void) => {
	const stats: { [key: string]: any } = statsResult.toJson({
		all: false,
		cached: true,
		children: true,
		modules: true,
		timings: true,
		hash: true,
	})
	// For multi-compiler, stats will be an object with a 'children' array of stats
	const bundles: Array<object> = extractBundles(stats)
	bundles.forEach((stats: { [key: string]: any }): void => {
		let name: any | string = stats.name || ''
		// Fallback to compilation name in case of 1 bundle (if it exists)
		if (bundles.length === 1 && !name && statsResult.compilation) {
			name = statsResult.compilation.name || ''
		}
		if (log) {
			log('webpack built ' + (name ? name + ' ' : '') + stats.hash + ' in ' + stats.time + 'ms')
		}

		eventStream.publish({
			name: name,
			action: action,
			time: stats.time,
			hash: stats.hash,
			warnings: stats.warnings || [],
			errors: stats.errors || [],
			modules: buildModuleMap(stats.modules),
		})
	})
}

const extractBundles = (stats: { [key: string]: any }): Array<any> => {
	// Stats has modules, single bundle
	if (stats.modules) {
		return [stats]
	}
	// Stats has children, multiple bundles
	if (stats.children && stats.children.length) {
		return stats.children
	}
	// Not sure, assume single
	return [stats]
}

const buildModuleMap = (modules: any[]): { [key: string]: any } => {
	const map: { [key: string]: any } = {}
	modules.forEach((module: { [key: string]: any }): void => {
		map[module.id] = module.name
	})
	return map
}

const webpackHotMiddleware = (compiler: any, opts: { [key: string]: any } = {}): any => {
	opts = opts || {}
	opts.log = typeof opts.log == 'undefined' ? console.log.bind(console) : opts.log
	opts.path = opts.path || '/__webpack_hmr'
	opts.heartbeat = opts.heartbeat || 10 * 1000

	let eventStream: any = createEventStream(opts.heartbeat)
	let latestStats: any = null
	let closed: boolean = false

	const onInvalid = (): void => {
		if (closed) {
			return
		}
		latestStats = null
		if (opts.log) {
			opts.log('webpack building...')
		}
		eventStream.publish({ action: 'building' })
	}
	const onDone = (statsResult: string): void => {
		if (closed) {
			return
		}
		// Keep hold of latest stats so they can be propagated to new clients
		latestStats = statsResult
		publishStats('built', latestStats, eventStream, opts.log)
	}
	const middleware = (req: any, res: any, next: Function): any => {
		if (closed) {
			return next()
		}
		if (!pathMatch(req.url, opts.path)) {
			return next()
		}
		eventStream.handler(req, res)
		if (latestStats) {
			// Explicitly not passing in `log` fn as we don't want to log again on
			// the server
			publishStats('sync', latestStats, eventStream)
		}
	}

	if (compiler.hooks) {
		compiler.hooks.invalid.tap('webpack-hot-middleware', onInvalid)
		compiler.hooks.done.tap('webpack-hot-middleware', onDone)
	} else {
		compiler.plugin('invalid', onInvalid)
		compiler.plugin('done', onDone)
	}

	middleware.publish = (payload: any): void => {
		if (closed) {
			return
		}
		eventStream.publish(payload)
	}
	middleware.close = (): void => {
		if (closed) {
			return
		}
		// Can't remove compiler plugins, so we just set a flag and noop if closed
		// https://github.com/webpack/tapable/issues/32#issuecomment-350644466
		closed = true
		eventStream.close()
		eventStream = null
	}
	return middleware
}

export default webpackHotMiddleware
