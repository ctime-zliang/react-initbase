import { TEntryList } from './types'
import { TStoreCommonAction } from '@app/store/types'
import { createInitialState } from './store'

const actionTypeReducers: { [key: string]: Function } = {
	/* ... */
}

export const initialState: TEntryList = Object.freeze(createInitialState())
export const createReducer = (initState: TEntryList): ((initState: TEntryList) => TEntryList) => {
	initState = initState || initialState
	return (state: TEntryList = initState, action: TStoreCommonAction<TEntryList> | any = {}): TEntryList => {
		const func: any = actionTypeReducers[action.type] || null
		if (func) {
			return func(state, action.data)
		}
		return state
	}
}
