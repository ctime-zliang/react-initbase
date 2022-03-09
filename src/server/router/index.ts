import koa from 'koa'
import apiRouter from './api'
import errRouterMap from './error'
import logger from '@server/lib/simple-logger'
import { TExtendKoaContext } from '@server/types/koa-context'

const routerList = [apiRouter]

export default (app: koa): void => {
	logger.trace(`==========================> Registe Routes <==========================`)
	routerList.forEach((router: any, index: number) => {
		app.use(router.routes())
		app.use(router.allowedMethods())
	})
}

export const errorRouterHanler = async (ctx: TExtendKoaContext, next: koa.Next): Promise<null> => {
	const handler: any = (errRouterMap as { [key: string]: any })[String(ctx.status)]
	if (handler) {
		await handler(ctx)
		return null
	}
	await next()
	return null
}
