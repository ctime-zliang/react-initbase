import Controller from '@server/lib/Controller'
import { TResponse } from '@server/lib/Response'
import { TExtendKoaContext } from '@server/types/koa-context'

class RtestController extends Controller {
	constructor() {
		super({
			controllerName: 'Rtest Controller',
		})
	}

	async rtest(ctx: TExtendKoaContext, res: TResponse) {
		const query: { [key: string]: any } = ctx.query
		res.setData({
			...query,
			controllerKey: 'Key inserted by Controller',
		})
	}

	async imglist(ctx: TExtendKoaContext, res: TResponse) {
		const query: { [key: string]: any } = ctx.query
		res.setData({
			...query,
		})
	}
}

export default new RtestController()
