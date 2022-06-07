import { TCommonResponse } from '@app/api/types'
import { TStoreCommonAction } from '@app/store/types'
import { fetchList, TFetchRecordListRequestBody } from '@app/api/record'
import { ACTION_TYPE } from './types'

export const testAsyncTask = () => {
	return async (dispatch: Function) => {
		window.setTimeout(() => {
			/* ... */
		}, 750)
	}
}

export const fetchListRequestAction = (
	params: TFetchRecordListRequestBody
): ((dispatch: (params: TStoreCommonAction<ACTION_TYPE>) => void) => Promise<TCommonResponse>) => {
	return async (dispatch: (params: TStoreCommonAction<ACTION_TYPE>) => void): Promise<TCommonResponse> => {
		try {
			const res: TCommonResponse = await fetchList(params)
			dispatch({
				type: ACTION_TYPE.RECORD_MODIFY_LIST,
				data: { list: res.data.list },
			})
			dispatch({
				type: ACTION_TYPE.RECORD_MODIFY_COUNTTOTAL,
				data: { countTotal: res.data.countTotal || 0 },
			})
			return res
		} catch (e: any) {
			return Promise.reject(e)
		}
	}
}

export const handleToggleRowSelectAction = (selectedKeys: string[]): TStoreCommonAction<ACTION_TYPE> => {
	return {
		type: ACTION_TYPE.RECORD_TOGGLE_SELECT_KEYS,
		data: { selectedKeys },
	}
}
