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
	if (errRouterMap[String(ctx.status)]) {
		await errRouterMap[String(ctx.status)](ctx)
		return null
	}
	await next()
}
