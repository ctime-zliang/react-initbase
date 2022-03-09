import koa from 'koa'
import dye from './dye'
import { TExtendKoaContext } from '@server/types/koa-context'

export default (options: { [key: string]: any } = {}) => {
	return async function (ctx: TExtendKoaContext, next: koa.Next): Promise<void> {
		ctx.res.on('finish', () => {
			dye.handleDyeLog(ctx, options.debug)
		})
		await next()
	}
}
