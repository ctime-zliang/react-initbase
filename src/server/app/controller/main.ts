import Controller from '@server/lib/Controller'
import { TResponse } from '@server/lib/Response'
import { TExtendKoaContext } from '@/server/types/koaContext'

class RtestController extends Controller {
	constructor() {
		super({
			controllerName: 'Rtest Controller',
		})
	}

	async rtest(ctx: TExtendKoaContext, res: TResponse): Promise<void> {
		const query: { [key: string]: any } = ctx.query
		res.setData({
			...query,
			controllerKey: 'Key inserted by Controller',
		})
	}
}

export default new RtestController()
