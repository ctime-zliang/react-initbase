import koa from 'koa'
import { IExtendKoaContext } from '../types/koa-context'

export default () => {
	return async (ctx: IExtendKoaContext, next: koa.Next) => {
		ctx.requestParams = {
			...(ctx.request.query || {}),
			...(ctx.request.body || {}),
		}
		await next()
	}
}
