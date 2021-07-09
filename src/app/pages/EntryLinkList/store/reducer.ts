import { ACTION_TYPE, IEntryList, IEntryListItem } from './config'
import { IAction } from './config'
import { createDefaultState } from './store'

const actionTypeReducers: { [key: string]: Function } = {
	/* ... */
}

export default (state: IEntryList = createDefaultState(), action: IAction): IEntryList => {
	const func: any = actionTypeReducers[action.type] || null
	if (action.data && func) {
		return func(state, action.data)
	}
	return state
}
