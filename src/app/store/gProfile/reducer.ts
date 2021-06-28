import { ACTION_TYPE, IGProfile } from './config'
import { IAction } from './config'
import { createDefaultState } from './store'

const actionTypeReducers = {
	[ACTION_TYPE.MODIFY_GLOBAL_RUNID](state: IGProfile, actionData: any): IGProfile {
		const newState: IGProfile = JSON.parse(JSON.stringify(state))
		newState.g_globalId = actionData.g_globalId
		return newState
	},
}

export default (state: IGProfile = createDefaultState(), action: IAction): IGProfile => {
	if (action.data && actionTypeReducers[action.type]) {
		return actionTypeReducers[action.type](state, action.data)
	}
	return state
}
