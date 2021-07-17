import koa from 'koa'
import webpackHotMiddleware from 'webpack-hot-middleware'

const middleware = (doIt: any, ctx: koa.Context) => {
	const res: any = ctx.res
	const req: any = ctx.req
	const originalEnd: Function = res.end
	return function (done: any) {
		res.end = function (...args: any[]) {
			originalEnd.apply(this, args)
			done(null, 0)
		}
		res.writeHead = function (status: number, headers: { [key: string]: any } = {}) {
			ctx.status = status
			ctx.set(headers)
		}
		doIt(req, res, function () {
			done(null, 1)
		})
	}
}

export default (compiler: any, option: { [key: string]: any } = {}) => {
	const action: any = webpackHotMiddleware(compiler, option)
	return async function (ctx: koa.Context, next: koa.Next) {
		const nextStep: any = await middleware(action, ctx)
		if (nextStep) {
			await next()
		}
	}
}
