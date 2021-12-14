import koa from 'koa'
import { IExtendKoaContext } from '@server/types/koa-context'

export default () => {
	return async (ctx: IExtendKoaContext, next: koa.Next): Promise<void> => {
		ctx.requestParams = {
			...(ctx.request.query || {}),
			...(ctx.request.body || {}),
		}
		await next()
	}
}
