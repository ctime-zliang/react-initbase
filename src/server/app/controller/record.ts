import { getRequest, TRquestResponse, postRequest } from '@/server/lib/requests'
import Controller from '@server/lib/Controller'
import { TResponse } from '@server/lib/Response'
import httpStatus from '@server/lib/httpStatus'
import { TExtendKoaContext } from '@server/types/koa-context'

const remotePrefixUrl: string = `http://127.0.0.1:12001`
const remoteCookie: string = `LOGIN_AUTH_TAG=${String(Date.now())}`

const commonPenetratRequest = async (ctx: TExtendKoaContext, res: TResponse, url: string, methods: string = 'get') => {
	const fn = methods.toLocaleLowerCase() == 'get' ? getRequest : postRequest
	// await sleep(1000)
	const remoteRes: TRquestResponse = await fn(
		url,
		{ ...ctx.requestParams },
		{
			headers: { Cookie: remoteCookie },
		}
	)
	if (remoteRes.error || !remoteRes.data || typeof remoteRes.data != 'object') {
		if (ctx.path == '/api/record/fetchList') {
			res.setData({
				...ctx.requestParams,
				list: [
					{
						id: 1,
						title: 'Test Default Title',
						content: 'Test Default Content',
						extra: '',
					},
				],
			})
			return
		}
		if (ctx.path == '/api/record/fetchItem') {
			res.setData({
				...ctx.requestParams,
				id: 1,
				title: 'Test Default Title',
				content: 'Test Default Content',
				extra: '',
			})
			return
		}
		res.setStatus(httpStatus.ServerError.status).setMessage(String(remoteRes.data || 'Remote Request Error'))
		return
	}
	const remoteData: { [key: string]: any } = remoteRes.data
	const { data, ret, msg } = remoteData
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

	async addItem(ctx: TExtendKoaContext, res: TResponse) {
		await commonPenetratRequest(ctx, res, `${remotePrefixUrl}/record/addItem`, 'post')
	}

	async delItems(ctx: TExtendKoaContext, res: TResponse) {
		await commonPenetratRequest(ctx, res, `${remotePrefixUrl}/record/delItems`, 'post')
	}

	async fetchItem(ctx: TExtendKoaContext, res: TResponse) {
		await commonPenetratRequest(ctx, res, `${remotePrefixUrl}/record/fetchItem`, 'get')
	}

	async updateItem(ctx: TExtendKoaContext, res: TResponse) {
		await commonPenetratRequest(ctx, res, `${remotePrefixUrl}/record/updateItem`, 'post')
	}
}

export default new RecordController()
