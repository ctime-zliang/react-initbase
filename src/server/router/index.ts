import koa from 'koa'
import apiRouter from './api'
import errRouterMap from './error'
import logger from '../lib/simple-logger'
import { IExtendKoaContext } from '../types/koa-context'

const routerList = [apiRouter]

export default (app: koa) => {
	logger.trace(`==========================> Registe Routes <==========================`)
	routerList.forEach((router: any, index: number) => {
		app.use(router.routes())
		app.use(router.allowedMethods())
	})
}

export const errorRouterHanler = async (ctx: IExtendKoaContext, next: koa.Next) => {
	const handler: any = (errRouterMap as { [key: string]: any })[String(ctx.status)]
	if (handler) {
		await handler(ctx)
		return null
	}
	await next()
}
