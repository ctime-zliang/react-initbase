import { ACTION_TYPE, TRecordMgr, TRecordMgrItem } from './types'
import { findResults, TFindResults } from '@app/utils/utils'
import { createInitialState } from './store'
import { TStoreCommonAction } from '@app/store/types'

const actionTypeReducers: { [key: string]: Function } = {
	[ACTION_TYPE.RECORD_MODIFY_LIST](state: TRecordMgr, actionData: any): TRecordMgr {
		const newState: TRecordMgr = JSON.parse(JSON.stringify(state))
		newState.list = [].concat(actionData.list)
		return newState
	},
	[ACTION_TYPE.RECORD_SET_ROW_LOADING_STATUS](state: TRecordMgr, actionData: any): TRecordMgr {
		const newState: TRecordMgr = JSON.parse(JSON.stringify(state))
		const ids = actionData.ids || []
		newState.list.forEach((item: TRecordMgrItem, index: number) => {
			if (ids.includes(item.id)) {
				item.isLoading = !!actionData.loading
			}
		})
		return newState
	},
	[ACTION_TYPE.RECORD_REMOVE_RECORD_ITEM](state: TRecordMgr, actionData: any): TRecordMgr {
		const newState: TRecordMgr = JSON.parse(JSON.stringify(state))
		const ids = actionData.ids || []
		ids.forEach((item: number, index: number) => {
			const findRes: TFindResults = findResults(newState.list, 'id', item)
			if (findRes.index <= -1) {
				return
			}
			newState.list.splice(findRes.index, 1)
		})
		return newState
	},
	[ACTION_TYPE.RECORD_TOGGLE_SELECT_KEYS](state: TRecordMgr, acionData: any): TRecordMgr {
		const newState: TRecordMgr = JSON.parse(JSON.stringify(state))
		const selectedKeys: number[] = acionData.selectedKeys
		newState.list.forEach((item: TRecordMgrItem, index: number) => {
			if (item.key) {
				item.isChecked = !!selectedKeys.includes(+item.key)
			}
		})
		return newState
	},
	/* ... */
	[ACTION_TYPE.RECORD_MODIFY_COUNTTOTAL](state: TRecordMgr, acionData: any): TRecordMgr {
		const newState: TRecordMgr = JSON.parse(JSON.stringify(state))
		newState.countTotal = acionData.countTotal
		return newState
	},
}

export const initialState: TRecordMgr = Object.freeze(createInitialState())
export const createReducer = (initState: TRecordMgr = initialState) => {
	return (state: TRecordMgr = initState, action: TStoreCommonAction<ACTION_TYPE> | any = {}): TRecordMgr => {
		const func: any = actionTypeReducers[action.type] || null
		if (func) {
			return func(state, action.data)
		}
		return state
	}
}
