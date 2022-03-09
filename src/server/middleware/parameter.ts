import koa from 'koa'
import { TExtendKoaContext } from '@server/types/koa-context'

export default () => {
	return async (ctx: TExtendKoaContext, next: koa.Next): Promise<void> => {
		ctx.requestParams = {
			...(ctx.request.query || {}),
			...(ctx.request.body || {}),
		}
		await next()
	}
}
