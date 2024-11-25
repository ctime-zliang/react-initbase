import koa from 'koa'
import { TExtendKoaContext } from '@/server/types/koaContext'

export default (): ((ctx: TExtendKoaContext, next: koa.Next) => Promise<void>) => {
	return async (ctx: TExtendKoaContext, next: koa.Next): Promise<void> => {
		ctx.requestParams = {
			...(ctx.request.query || {}),
			...(ctx.request.body || {}),
		}
		await next()
	}
}
