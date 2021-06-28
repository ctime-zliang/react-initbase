import koa from 'koa'
import koaRouter from 'koa-router'
import { IRoute } from '../types/route'
import { IExtendKoaContext } from '../types/koa-context'

export default function routerExec(routes: Array<IRoute>) {
	const kRouter = new koaRouter()
	routes.forEach((routeItem: IRoute, index: number) => {
		kRouter[routeItem.method.toLowerCase()](routeItem.path, async (ctx: IExtendKoaContext, next: koa.Next) => {
			try {
				ctx.status = 200
				ctx.routerMatched = true
				await next()
				await routeItem.action.call(kRouter, ctx, next)
			} catch (e) {
				ctx.app.emit('error', e, ctx)
			}
		})
	})
	return kRouter
}
