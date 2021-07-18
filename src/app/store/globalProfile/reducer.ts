import { ACTION_TYPE, IGProfile } from './config'
import { IAction } from './config'
import { createInitialState } from './store'

const LANGUAGE_TOGGLE_MAP = {
	zh_cn: 'en_us',
	en_us: 'zh_cn',
}

const actionTypeReducers: { [key: string]: any } = {
	[ACTION_TYPE.PROFILE_MODIFY_RUNID](state: IGProfile, actionData: any): IGProfile {
		const newState: IGProfile = JSON.parse(JSON.stringify(state))
		newState.g_globalId = actionData.g_globalId
		return newState
	},
	[ACTION_TYPE.PROFILE_MODIFY_LUNGAUGES](state: IGProfile, actionData: any): IGProfile {
		const newState: IGProfile = JSON.parse(JSON.stringify(state))
		// @ts-ignore
		newState.g_languageSet = LANGUAGE_TOGGLE_MAP[state.g_languageSet] || LANGUAGE_TOGGLE_MAP['zh-cn']
		return newState
	},
}

export const initialState: IGProfile = Object.freeze(createInitialState())
export default (state: IGProfile = initialState, action: IAction): IGProfile => {
	const func: any = actionTypeReducers[action.type] || null
	if (func) {
		return func(state, action.data)
	}
	return state
}
