import { getRequest, IRquestResponse, postRequest } from '../../lib/request'
import Controller from '../../lib/Controller'
import { TResponse } from '../../lib/Response'
import httpStatus from '../../lib/httpStatus'
import { IExtendKoaContext } from '../../types/koa-context'
import { sleep } from '../../utils/utils'

const remotePrefixUrl = `http://127.0.0.1:12001`
const remoteCookie = `LOGIN_AUTH_TAG=${String(Date.now())}`

const commonPenetratRequest = async (ctx: IExtendKoaContext, res: TResponse, url: string, methods: string = 'get') => {
	const fn = methods.toLocaleLowerCase() == 'get' ? getRequest : postRequest
	try {
		// await sleep(2000)
		const remoteRes: IRquestResponse = await fn(
			url,
			{ ...ctx.requestParams },
			{
				headers: { Cookie: remoteCookie },
			}
		)
		if (!remoteRes.data || typeof remoteRes.data != 'object') {
			res.setStatus(httpStatus.ServerError.status).setMessage(String(remoteRes.data) || 'Remote Request Error')
			return
		}
		const remoteData = remoteRes.data
		const { data, ret, msg } = remoteData
		if (ret === 0) {
			res.setData({
				...ctx.requestParams,
				...data,
			})
			return
		}
		res.setStatus(httpStatus.Ok.status).setRetCode(ret).setData(null).setMessage(msg)
	} catch (e) {
		throw e
	}
}

class RecordController extends Controller {
	constructor() {
		super({
			controllerName: 'Record Controller',
		})
	}

	async fetchList(ctx: IExtendKoaContext, res: TResponse) {
		try {
			return await commonPenetratRequest(ctx, res, `${remotePrefixUrl}/record/fetchList`, 'get')
		} catch (e) {
			throw e
		}
	}

	async addItem(ctx: IExtendKoaContext, res: TResponse) {
		try {
			return await commonPenetratRequest(ctx, res, `${remotePrefixUrl}/record/addItem`, 'post')
		} catch (e) {
			throw e
		}
	}

	async delItems(ctx: IExtendKoaContext, res: TResponse) {
		try {
			return await commonPenetratRequest(ctx, res, `${remotePrefixUrl}/record/delItems`, 'post')
		} catch (e) {
			throw e
		}
	}

	async fetchItem(ctx: IExtendKoaContext, res: TResponse) {
		try {
			return await commonPenetratRequest(ctx, res, `${remotePrefixUrl}/record/fetchItem`, 'get')
		} catch (e) {
			throw e
		}
	}

	async updateItem(ctx: IExtendKoaContext, res: TResponse) {
		try {
			return await commonPenetratRequest(ctx, res, `${remotePrefixUrl}/record/updateItem`, 'post')
		} catch (e) {
			throw e
		}
	}
}

export default new RecordController()