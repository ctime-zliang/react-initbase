import axios from 'axios'
import { createDefaultErrorResponse, createDefaultSuccessResponse } from '@app/utils/utils'
import { BaseConfig } from '../config/config'
import { TCommonResponse } from './config'
import { TRecordMgrItem } from '@app/pages/RecordMgr/store/config'

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const remoteRequestUrlPrefix: string = BaseConfig.remoteRequestUrlPrefix()

export type TFetchRecordListRequestBody = {
	keywords?: string
	pageIndex?: number
	pageSize?: number
}

export type TAddRecordItemRequestBody = {
	title: string
	content?: string
	extra?: string
}

function filterList(list: Array<TRecordMgrItem>, params: { [key: string]: any } = {}): Array<TRecordMgrItem> {
	const pageIndex: number = +params.pageIndex || 1
	const pageSize: number = +params.pageSize || 0
	return list.map((item: TRecordMgrItem, index: number): TRecordMgrItem => {
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
export async function fetchList(data: TFetchRecordListRequestBody): Promise<TCommonResponse<TRecordMgrItem[]>> {
	try {
		const axiosResponse = await axios.get(fetchListUrl, {
			params: { ...data },
		})
		const res: TCommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		const list: TRecordMgrItem[] = filterList(res.data.list, { ...data })
		return createDefaultSuccessResponse({ ...res.data, list })
	} catch (e: any) {
		return Promise.reject(createDefaultErrorResponse(-1, '[fetchList] Request Remote Error', null, e))
	}
}

export const addItemUrl: string = `${remoteRequestUrlPrefix}/record/addItem`
export async function addItem(data: TAddRecordItemRequestBody): Promise<TCommonResponse<TRecordMgrItem>> {
	try {
		const axiosResponse = await axios.post(addItemUrl, { ...data })
		const res: TCommonResponse<any> = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		const itemData: TRecordMgrItem = filterList([{ ...res.data }])[0]
		return createDefaultSuccessResponse({ ...itemData })
	} catch (e: any) {
		return Promise.reject(createDefaultErrorResponse(-1, '[addItem] Request Remote Error', null, e))
	}
}

export const delItemsUrl: string = `${remoteRequestUrlPrefix}/record/delItems`
export async function delItems(data: Array<string>): Promise<TCommonResponse<any>> {
	try {
		const axiosResponse = await axios.post(delItemsUrl, { ids: data })
		const res: TCommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		return createDefaultSuccessResponse(res.data)
	} catch (e: any) {
		return Promise.reject(createDefaultErrorResponse(-1, '[delItems] Request Remote Error', null, e))
	}
}

export const fetchItemUrl: string = `${remoteRequestUrlPrefix}/record/fetchItem`
export async function fetchItem(id: string): Promise<TCommonResponse<TRecordMgrItem>> {
	try {
		const axiosResponse = await axios.get(fetchItemUrl, {
			params: { id },
		})
		const res: TCommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		return createDefaultSuccessResponse(res.data)
	} catch (e: any) {
		return Promise.reject(createDefaultErrorResponse(-1, '[fetchItem] Request Remote Error', null, e))
	}
}

export const updateItemUrl: string = `${remoteRequestUrlPrefix}/record/updateItem`
export async function updateItem(id: string, data: TAddRecordItemRequestBody): Promise<TCommonResponse<any>> {
	try {
		const axiosResponse = await axios.post(updateItemUrl, { id, ...data })
		const res: TCommonResponse = axiosResponse.data
		if (res.ret !== 0) {
			return Promise.reject(createDefaultErrorResponse(res.ret, res.msg, res.data, res))
		}
		return createDefaultSuccessResponse(res.data)
	} catch (e: any) {
		return Promise.reject(createDefaultErrorResponse(-1, '[updateItem] Request Remote Error', null, e))
	}
}
