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
		const query = ctx.query
		res.setData({
			...query,
			controllerKey: 'Key inserted by Controller',
		})
	}
}

export default new RtestController()
