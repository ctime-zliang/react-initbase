import Response, { TResponse } from '@server/lib/Response'
import { IExtendKoaContext } from '@server/types/koa-context'

export default {
	'404': async (ctx: IExtendKoaContext): Promise<null> => {
		ctx.status = 404
		const res: TResponse = new Response()
		res.setRetCode(-1).setStatus(ctx.status).setData(null).setMessage('API Not Found').flush(ctx)
		return null
	},
}
