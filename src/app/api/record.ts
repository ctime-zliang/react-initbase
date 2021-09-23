import axios from 'axios'
import { createDefaultErrorResponse, createDefaultSuccessResponse } from '../utils/utils'
import { BaseConfig } from '../config/config'
import { ICommonResponse } from './config'
import { IRecordMgrItem } from '@/pages/RecordMgr/store/config'

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const remoteRequestUrlPrefix: string = BaseConfig.remoteRequestUrlPrefix()

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
	return list.map((item: IRecordMgrItem, index: number): IRecordMgrItem => {
		return {
			...item,
			isChecked: false,
			rowIndex: (pageIndex - 1) * pageSize + index + 1,
			key: item.id,
			isLoading: false,
		}
	})
}

export const fetchListUrl: string = `${remoteRequestUrlPrefix}/record/fetchList`
export async function fetchList(data: IFetchRecordListRequestBody): Promise<ICommonResponse> {
	try {
		const axiosResponse = await axios.get(fetchListUrl, {
			params: { ...data },
		})
		const res: ICommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		const list: Array<IRecordMgrItem> = filterList(res.data.list, { ...data })
		return createDefaultSuccessResponse({ ...res.data, list })
	} catch (e: any) {
		return Promise.reject(createDefaultErrorResponse(-1, '[fetchList] Request Remote Error', null, e))
	}
}

export const addItemUrl: string = `${remoteRequestUrlPrefix}/record/addItem`
export async function addItem(data: IAddRecordItemRequestBody): Promise<ICommonResponse> {
	try {
		const axiosResponse = await axios.post(addItemUrl, { ...data })
		const res: ICommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		const itemData: IRecordMgrItem = filterList([{ ...res.data }])[0]
		return createDefaultSuccessResponse({ ...itemData })
	} catch (e: any) {
		return Promise.reject(createDefaultErrorResponse(-1, '[addItem] Request Remote Error', null, e))
	}
}

export const delItemsUrl: string = `${remoteRequestUrlPrefix}/record/delItems`
export async function delItems(data: Array<string>): Promise<ICommonResponse> {
	try {
		const axiosResponse = await axios.post(delItemsUrl, { ids: data })
		const res: ICommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		return createDefaultSuccessResponse(res.data)
	} catch (e: any) {
		return Promise.reject(createDefaultErrorResponse(-1, '[delItems] Request Remote Error', null, e))
	}
}

export const fetchItemUrl: string = `${remoteRequestUrlPrefix}/record/fetchItem`
export async function fetchItem(id: string): Promise<ICommonResponse> {
	try {
		const axiosResponse = await axios.get(fetchItemUrl, {
			params: { id },
		})
		const res: ICommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		return createDefaultSuccessResponse(res.data)
	} catch (e: any) {
		return Promise.reject(createDefaultErrorResponse(-1, '[fetchItem] Request Remote Error', null, e))
	}
}

export const updateItemUrl: string = `${remoteRequestUrlPrefix}/record/updateItem`
export async function updateItem(id: string, data: IAddRecordItemRequestBody): Promise<ICommonResponse> {
	try {
		const axiosResponse = await axios.post(updateItemUrl, { id, ...data })
		const res: ICommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		return createDefaultSuccessResponse(res.data)
	} catch (e: any) {
		return Promise.reject(createDefaultErrorResponse(-1, '[updateItem] Request Remote Error', null, e))
	}
}
