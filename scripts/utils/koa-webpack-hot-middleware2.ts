import url from 'url'

const parse: any = url.parse

const pathMatch = (url: string, path: any) => {
	try {
		return parse(url).pathname === path
	} catch (e) {
		return false
	}
}
const createEventStream = (heartbeat: number) => {
	let clientId: number = 0
	let clients: { [key: string]: any } = {}
	const everyClient = (fn: Function) => {
		Object.keys(clients).forEach((id: string) => {
			fn(clients[id])
		})
	}
	const interval: number = (
		setInterval(() => {
			everyClient((client: any) => {
				// client.write('data: \uD83D\uDC93\n\n')
				if (!client.ctx.res.finished) {
				}
				client.ctx.res.write('data: \uD83D\uDC93\n\n')
			})
		}, heartbeat) as any
	).unref()

	return {
		close() {
			clearInterval(interval)
			everyClient((client: any) => {
				if (!client.finished) {
					client.end()
				}
			})
			clients = {}
		},
		handler(ctx: any) {
			const req = ctx.request
			const res = ctx.response
			const headers = {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'text/event-stream;charset=utf-8',
				'Cache-Control': 'no-cache, no-transform',
				// While behind nginx, event stream should not be buffered:
				// http://nginx.org/docs/http/ngx_http_proxy_module.html#proxy_buffering
				'X-Accel-Buffering': 'no',
			}
			const id = clientId++
			const isHttp1 = !(parseInt(req.httpVersion) >= 2)
			if (isHttp1) {
				req.socket.setKeepAlive(true)
				Object.assign(headers, {
					Connection: 'keep-alive',
				})
			}
			Object.keys(headers).forEach((item: string) => {
				// @ts-ignore
				res.set(item, headers[item])
			})
			// res.status = 200
			// res.headers = headers
			// res.body = `\n`
			// ctx.res.writeHeader(200, headers);
			// res.body = `\n`
			ctx.res.write(`\n`)
			ctx.res.writeHead(200, headers)
			clients[id] = res
			// delete clients[id]
			// req.on('close', () => {
			//     if (!res.finished) {
			//         res.end()
			//     }
			//     delete clients[id]
			// })
		},
		publish(payload: any) {
			everyClient((client: any) => {
				// client.write('data: ' + JSON.stringify(payload) + '\n\n')
				if (!client.ctx.res.finished) {
					client.ctx.res.write('data: ' + JSON.stringify(payload) + '\n\n')
				}
			})
		},
	}
}
const publishStats = (action: any, statsResult: any, eventStream: any) => {
	const stats = statsResult.toJson({
		all: false,
		cached: true,
		children: true,
		modules: true,
		timings: true,
		hash: true,
	})
	const bundles = extractBundles(stats)
	bundles.forEach((stats: any) => {
		let name = stats.name || ''
		if (bundles.length === 1 && !name && statsResult.compilation) {
			name = statsResult.compilation.name || ''
		}

		console.log('[[webpack built]] ' + (name ? name + ' ' : '') + stats.hash + ' in ' + stats.time + 'ms')

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

const extractBundles = (stats: any) => {
	if (stats.modules) {
		return [stats]
	}
	if (stats.children && stats.children.length) {
		return stats.children
	}
	return [stats]
}

const buildModuleMap = (modules: any[]) => {
	const map: { [key: string]: any } = {}
	modules.forEach((module: any) => {
		map[module.id] = module.name
	})
	return map
}

export default (compiler: any, opts: { [key: string]: any } = {}) => {
	opts = opts || {}
	opts.log = typeof opts.log == 'undefined' ? console.log.bind(console) : opts.log
	opts.path = opts.path || '/__webpack_hmr'
	opts.heartbeat = opts.heartbeat || 10 * 1000

	let eventStream: any = createEventStream(opts.heartbeat)
	let latestStats: any = null
	let closed: boolean = false

	const onInvalid = () => {
		if (closed) {
			return
		}
		latestStats = null
		if (opts.log) {
			opts.log('webpack building...')
		}
		eventStream.publish({ action: 'building' })
	}
	const onDone = (statsResult: any) => {
		if (closed) {
			return
		}
		latestStats = statsResult
		publishStats('built', latestStats, eventStream)
	}
	const middleware = (ctx: any, next: any) => {
		if (closed) {
			return next()
		}
		if (!pathMatch(ctx.req.url, opts.path)) {
			return next()
		}
		eventStream.handler(ctx)
		if (latestStats) {
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

	middleware.publish = (payload: any) => {
		if (closed) {
			return
		}
		eventStream.publish(payload)
	}
	middleware.close = () => {
		if (closed) {
			return
		}
		closed = true
		eventStream.close()
		eventStream = null
	}

	return middleware
}
