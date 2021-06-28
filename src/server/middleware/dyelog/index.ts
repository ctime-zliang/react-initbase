import koa from 'koa'
import dye from './dye'
import utils from '../../utils/utils'
import { IExtendKoaContext } from '../types/koa-context'

export default (options: any) => {
	return async function (ctx: IExtendKoaContext, next: koa.Next) {
		ctx.res.on('finish', () => {
			dye.handleDyeLog(ctx, options.debug)
		})
		await next()
	}
}
