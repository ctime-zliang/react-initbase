import koa from 'koa'
import { IExtendKoaContext } from '../types/koa-context'

export default () => {
	return async (ctx: IExtendKoaContext, next: koa.Next) => {
		if (['/favicon.ico'].includes(ctx.originalUrl)) {
			ctx.body = ``
			return
		}
		await next()
	}
}
