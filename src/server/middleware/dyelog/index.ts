import koa from 'koa'
import dye from './dye'
import { IExtendKoaContext } from '@server/types/koa-context'

export default (options: { [key: string]: any } = {}) => {
	return async function (ctx: IExtendKoaContext, next: koa.Next): Promise<void> {
		ctx.res.on('finish', () => {
			dye.handleDyeLog(ctx, options.debug)
		})
		await next()
	}
}
