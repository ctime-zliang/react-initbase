import { IEntryList } from './config'
import { IAction } from './config'
import { createInitialState } from './store'

const actionTypeReducers: { [key: string]: Function } = {
	/* ... */
}

export const initialState: IEntryList = Object.freeze(createInitialState())
export const createReducer = (initState: IEntryList = initialState) => {
	return (state: IEntryList = initState, action: IAction | any = {}): IEntryList => {
		const func: any = actionTypeReducers[action.type] || null
		if (func) {
			return func(state, action.data)
		}
		return state
	}
}
