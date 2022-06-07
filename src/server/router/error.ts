import Response, { TResponse } from '@server/lib/Response'
import { TExtendKoaContext } from '@/server/types/koaContext'

export default {
	'404': async (ctx: TExtendKoaContext): Promise<void> => {
		ctx.status = 404
		const res: TResponse = new Response()
		res.setRetCode(-1).setStatus(ctx.status).setData(null).setMessage('API Not Found').flush(ctx)
	},
}
