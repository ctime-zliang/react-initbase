import koa from 'koa'
import { TExtendKoaContext } from '@/server/types/koaContext'

export default (): ((ctx: TExtendKoaContext, next: koa.Next) => Promise<void>) => {
	return async (ctx: TExtendKoaContext, next: koa.Next): Promise<void> => {
		if (['/favicon.ico'].includes(ctx.originalUrl)) {
			ctx.body = ``
			return
		}
		await next()
	}
}
