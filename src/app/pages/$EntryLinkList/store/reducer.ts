import { IEntryList } from './config'
import { IStoreCommonAction } from '@app/store/config'
import { createInitialState } from './store'

const actionTypeReducers: { [key: string]: Function } = {
	/* ... */
}

export const initialState: IEntryList = Object.freeze(createInitialState())
export const createReducer = (initState: IEntryList): ((initState: IEntryList) => IEntryList) => {
	initState = initState || initialState
	return (state: IEntryList = initState, action: IStoreCommonAction<IEntryList> | any = {}): IEntryList => {
		const func: any = actionTypeReducers[action.type] || null
		if (func) {
			return func(state, action.data)
		}
		return state
	}
}
