import axios from 'axios'
import { createDefaultErrorResponse, createDefaultSuccessResponse } from '@app/utils/utils'
import { BaseConfig } from '../config/config'
import { TCommonResponse } from './types'
import { TRecordMgrItem } from '@app/pages/RecordMgr/store/types'

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const remoteRequestUrlPrefix: string = BaseConfig.remoteRequestUrlPrefix()

export type TFetchRecordListRequestBody = {
	keywords?: string
	pageIndex?: number
	pageSize?: number
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
export async function fetchList(data: TFetchRecordListRequestBody): Promise<TCommonResponse<Array<TRecordMgrItem>>> {
	try {
		const axiosResponse: { data: any } = await axios.get(fetchListUrl, {
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
