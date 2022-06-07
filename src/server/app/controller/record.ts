import { getRequest, TRquestResponse, postRequest } from '@/server/lib/requests'
import Controller from '@server/lib/Controller'
import { TResponse } from '@server/lib/Response'
import httpStatus from '@server/lib/httpStatus'
import { TExtendKoaContext } from '@/server/types/koaContext'
import { sleep } from '@/app/utils/utils'

const remotePrefixUrl: string = `http://127.0.0.1:12001`
const remoteCookie: string = `LOGIN_AUTH_TAG=${String(Date.now())}`

const commonPenetratRequest = async (ctx: TExtendKoaContext, res: TResponse, url: string, methods: string = 'get'): Promise<void> => {
	const fn: (url: string, a: any, b: any) => Promise<TRquestResponse> = methods.toLocaleLowerCase() == 'get' ? getRequest : postRequest
	await sleep(1000)
	const remoteRes: TRquestResponse = await fn(
		url,
		{ ...ctx.requestParams },
		{
			headers: { Cookie: remoteCookie },
		}
	)
	const { data, ret, msg } = remoteRes.data
	if (ret === 0) {
		res.setData({
			...ctx.requestParams,
			...data,
		})
		return
	}
	res.setStatus(httpStatus.Ok.status).setRetCode(ret).setData(null).setMessage(msg)
}

class RecordController extends Controller {
	constructor() {
		super({
			controllerName: 'Record Controller',
		})
	}

	async fetchList(ctx: TExtendKoaContext, res: TResponse) {
		await commonPenetratRequest(ctx, res, `${remotePrefixUrl}/record/fetchList`, 'get')
	}
}

export default new RecordController()
