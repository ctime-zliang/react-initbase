import { ACTION_TYPE, IRecordMgr, IRecordMgrItem } from './config'
import { findResults, IFindResults } from '@/utils/utils'
import { createInitialState } from './store'
import { IStoreCommonAction } from '@/store/config'

const actionTypeReducers: { [key: string]: Function } = {
	[ACTION_TYPE.RECORD_MODIFY_LIST](state: IRecordMgr, actionData: any): IRecordMgr {
		const newState: IRecordMgr = JSON.parse(JSON.stringify(state))
		newState.list = [].concat(actionData.list)
		return newState
	},
	[ACTION_TYPE.RECORD_SET_ROW_LOADING_STATUS](state: IRecordMgr, actionData: any): IRecordMgr {
		const newState: IRecordMgr = JSON.parse(JSON.stringify(state))
		const ids = actionData.ids || []
		newState.list.forEach((item: IRecordMgrItem, index: number) => {
			if (ids.includes(item.id)) {
				item.isLoading = !!actionData.loading
			}
		})
		return newState
	},
	[ACTION_TYPE.RECORD_REMOVE_RECORD_ITEM](state: IRecordMgr, actionData: any): IRecordMgr {
		const newState: IRecordMgr = JSON.parse(JSON.stringify(state))
		const ids = actionData.ids || []
		ids.forEach((item: number, index: number) => {
			const findRes: IFindResults = findResults(newState.list, 'id', item)
			if (findRes.index <= -1) {
				return
			}
			newState.list.splice(findRes.index, 1)
		})
		return newState
	},
	[ACTION_TYPE.RECORD_TOGGLE_SELECT_KEYS](state: IRecordMgr, acionData: any): IRecordMgr {
		const newState: IRecordMgr = JSON.parse(JSON.stringify(state))
		const selectedKeys: number[] = acionData.selectedKeys
		newState.list.forEach((item: IRecordMgrItem, index: number) => {
			if (item.key) {
				item.isChecked = !!selectedKeys.includes(+item.key)
			}
		})
		return newState
	},
	/* ... */
	[ACTION_TYPE.RECORD_MODIFY_COUNTTOTAL](state: IRecordMgr, acionData: any): IRecordMgr {
		const newState: IRecordMgr = JSON.parse(JSON.stringify(state))
		newState.countTotal = acionData.countTotal
		return newState
	},
}

export const initialState: IRecordMgr = Object.freeze(createInitialState())
export const createReducer = (initState: IRecordMgr = initialState) => {
	return (state: IRecordMgr = initState, action: IStoreCommonAction<ACTION_TYPE> | any = {}): IRecordMgr => {
		const func: any = actionTypeReducers[action.type] || null
		if (func) {
			return func(state, action.data)
		}
		return state
	}
}
