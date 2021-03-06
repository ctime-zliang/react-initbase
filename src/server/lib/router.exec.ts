import koa from 'koa'
import koaRouter from 'koa-router'
import { TRoute } from '@server/types/route'

type TMethods = 'get' | 'post'

export default function routerExec(routes: Array<TRoute>): koaRouter {
	const kRouter: koaRouter = new koaRouter()
	routes.forEach((routeItem: TRoute): void => {
		const m: TMethods = routeItem.method.toLowerCase() as TMethods
		kRouter[m](routeItem.path, async (ctx: any, next: koa.Next): Promise<void> => {
			try {
				ctx.status = 200
				ctx.routerMatched = true
				await next()
				await routeItem.action.call(kRouter, ctx, next)
			} catch (e: any) {
				ctx.app.emit('error', e, ctx)
			}
		})
	})
	return kRouter
}
