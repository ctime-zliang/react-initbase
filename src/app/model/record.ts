import axios from 'axios'
import { createDefaultErrorResponse, createDefaultSuccessResponse, sleep } from '../utils/utils'
import { BaseConfig } from '../config/config'
import { ICommonResponse } from './config'
import { IRecordMgrItem } from '../store/record/config'

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const remoteRequestUrlPrefix = BaseConfig.remoteRequestUrlPrefix()

export interface IFetchRecordListRequestBody {
	keywords?: string
	pageIndex?: number
	pageSize?: number
}

export interface IAddRecordItemRequestBody {
	title: string
	content?: string
	extra?: string
}

function filterList(list: Array<IRecordMgrItem>, params: { [key: string]: any } = {}): Array<IRecordMgrItem> {
	const pageIndex: number = +params.pageIndex || 1
	const pageSize: number = +params.pageSize || 0
	return list.map((item: IRecordMgrItem, index: number) => {
		return {
			...item,
			isChcked: false,
			rowIndex: (pageIndex - 1) * pageSize + index + 1,
			key: item.id,
			isLoading: false,
		}
	})
}

export async function fetchList(data: IFetchRecordListRequestBody): Promise<ICommonResponse> {
	try {
		const axiosResponse = await axios.get(`${remoteRequestUrlPrefix}/record/fetchList`, {
			params: { ...data },
		})
		const res: ICommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		const list: Array<IRecordMgrItem> = filterList(res.data.list, { ...data })
		return createDefaultSuccessResponse({ ...res.data, list })
	} catch (e) {
		return Promise.reject(createDefaultErrorResponse(-1, '[fetchList] Request Remote Error', null, e))
	}
}

export async function addItem(data: IAddRecordItemRequestBody): Promise<ICommonResponse> {
	try {
		await sleep(500)
		const axiosResponse = await axios.post(`${remoteRequestUrlPrefix}/record/addItem`, { ...data })
		const res: ICommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		const itemData: IRecordMgrItem = filterList([{ ...res.data }])[0]
		return createDefaultSuccessResponse({ ...itemData })
	} catch (e) {
		return Promise.reject(createDefaultErrorResponse(-1, '[addItem] Request Remote Error', null, e))
	}
}

export async function delItems(data: Array<string>): Promise<ICommonResponse> {
	try {
		await sleep(500)
		const axiosResponse = await axios.post(`${remoteRequestUrlPrefix}/record/delItems`, { ids: data })
		const res: ICommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		return createDefaultSuccessResponse(res.data)
	} catch (e) {
		return Promise.reject(createDefaultErrorResponse(-1, '[delItems] Request Remote Error', null, e))
	}
}

export async function fetchItem(id: string): Promise<ICommonResponse> {
	try {
		await sleep(500)
		const axiosResponse = await axios.get(`${remoteRequestUrlPrefix}/record/fetchItem`, {
			params: { id },
		})
		const res: ICommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		return createDefaultSuccessResponse(res.data)
	} catch (e) {
		return Promise.reject(createDefaultErrorResponse(-1, '[fetchItem] Request Remote Error', null, e))
	}
}

export async function updateItem(id: string, data: IAddRecordItemRequestBody): Promise<ICommonResponse> {
	try {
		await sleep(500)
		const axiosResponse = await axios.post(`${remoteRequestUrlPrefix}/record/updateItem`, { id, ...data })
		const res: ICommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		return createDefaultSuccessResponse(res.data)
	} catch (e) {
		return Promise.reject(createDefaultErrorResponse(-1, '[updateItem] Request Remote Error', null, e))
	}
}
