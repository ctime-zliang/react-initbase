import { ICommonResponse } from '@app/api/config'
import { IStoreCommonAction } from '@app/store/config'
import { addItem, fetchItem, delItems, fetchList, IAddRecordItemRequestBody, updateItem, IFetchRecordListRequestBody } from '@app/api/record'
import { ACTION_TYPE } from './config'

export const testAsyncTask = () => {
	return async (dispatch: Function) => {
		window.setTimeout(() => {
			/* ... */
		}, 750)
	}
}

export const fetchListRequestAction = (params: IFetchRecordListRequestBody) => {
	return async (dispatch: (__params: IStoreCommonAction<ACTION_TYPE>) => void) => {
		try {
			const res: ICommonResponse = await fetchList(params)
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

export const addItemRequestAction = (params: IAddRecordItemRequestBody) => {
	return async (dispatch: (__params: IStoreCommonAction<ACTION_TYPE>) => void) => {
		try {
			const res: ICommonResponse = await addItem(params)
			return res
		} catch (e: any) {
			return Promise.reject(e)
		}
	}
}

export const deleteItemsRequestAction = (ids: Array<string>) => {
	return async (dispatch: (__params: IStoreCommonAction<ACTION_TYPE>) => void) => {
		try {
			dispatch({
				type: ACTION_TYPE.RECORD_SET_ROW_LOADING_STATUS,
				data: { ids, loading: true },
			})
			const res: ICommonResponse = await delItems(ids)
			dispatch({
				type: ACTION_TYPE.RECORD_REMOVE_RECORD_ITEM,
				data: { ids },
			})
			return res
		} catch (e: any) {
			dispatch({
				type: ACTION_TYPE.RECORD_SET_ROW_LOADING_STATUS,
				data: { ids, loading: false },
			})
			return Promise.reject(e)
		}
	}
}

export const fetchItemRequestAction = (id: string) => {
	return async (dispatch: (__params: IStoreCommonAction<ACTION_TYPE>) => void) => {
		try {
			const res: ICommonResponse = await fetchItem(id)
			return res
		} catch (e: any) {
			return Promise.reject(e)
		}
	}
}

export const updateItemRequestAction = (id: string, params: IAddRecordItemRequestBody) => {
	return async (dispatch: (__params: IStoreCommonAction<ACTION_TYPE>) => void) => {
		try {
			const res: ICommonResponse = await updateItem(id, params)
			return res
		} catch (e: any) {
			return Promise.reject(e)
		}
	}
}

export const handleToggleRowSelectAction = (selectedKeys: string[]): IStoreCommonAction<ACTION_TYPE> => {
	return {
		type: ACTION_TYPE.RECORD_TOGGLE_SELECT_KEYS,
		data: { selectedKeys },
	}
}
