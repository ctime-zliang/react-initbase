import { ACTION_TYPE, IRecordMgr, IRecordMgrItem } from './config'
import { findResults, IFindResults } from '@/utils/utils'
import { IAction } from './config'
import { createDefaultState } from './store'

const actionTypeReducers: { [key: string]: Function } = {
	[ACTION_TYPE.MODIFY_RECORD_LIST](state: IRecordMgr, actionData: any): IRecordMgr {
		const newState: IRecordMgr = JSON.parse(JSON.stringify(state))
		newState.list = [].concat(actionData.list)
		return newState
	},
	[ACTION_TYPE.SET_ROW_LOADING_STATUS](state: IRecordMgr, actionData: any): IRecordMgr {
		const newState: IRecordMgr = JSON.parse(JSON.stringify(state))
		const ids = actionData.ids || []
		newState.list.forEach((item: IRecordMgrItem, index: number) => {
			if (ids.includes(item.id)) {
				item.isLoading = !!actionData.loading
			}
		})
		return newState
	},
	[ACTION_TYPE.REMOVE_RECORD_ITEM](state: IRecordMgr, actionData: any): IRecordMgr {
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
	[ACTION_TYPE.TOGGLE_SELECT_KEYS](state: IRecordMgr, acionData: any): IRecordMgr {
		const newState: IRecordMgr = JSON.parse(JSON.stringify(state))
		const selectedKeys: number[] = acionData.selectedKeys
		newState.list.forEach((item: IRecordMgrItem, index: number) => {
			if (item.key) {
				item.isChcked = !!selectedKeys.includes(+item.key)
			}
		})
		return newState
	},
	/* ... */
	[ACTION_TYPE.MODIFY_COUNTTOTAL](state: IRecordMgr, acionData: any): IRecordMgr {
		const newState: IRecordMgr = JSON.parse(JSON.stringify(state))
		newState.countTotal = acionData.countTotal
		return newState
	},
}

export default (state: IRecordMgr = createDefaultState(), action: IAction): IRecordMgr => {
	const func: any = actionTypeReducers[action.type] || null
	if (action.data && func) {
		return func(state, action.data)
	}
	return state
}