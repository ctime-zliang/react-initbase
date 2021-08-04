import Controller from '../../lib/Controller'
import { TResponse } from '../../lib/Response'
import { IExtendKoaContext } from '../../types/koa-context'

class RtestController extends Controller {
	constructor() {
		super({
			controllerName: 'Rtest Controller',
		})
	}

	async rtest(ctx: IExtendKoaContext, res: TResponse) {
		const query: { [key: string]: any } = ctx.query
		res.setData({
			...query,
			controllerKey: 'Key inserted by Controller',
		})
	}

	async imglist(ctx: IExtendKoaContext, res: TResponse) {
		const query: { [key: string]: any } = ctx.query
		res.setData({
			...query,
		})
	}
}

export default new RtestController()
