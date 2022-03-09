import { ACTION_TYPE, TGProfile } from './config'
import { TStoreCommonAction } from '../config'
import { createInitialState } from './store'

const LANGUAGE_TOGGLE_MAP: { [key: string]: any } = {
	zh_cn: 'en_us',
	en_us: 'zh_cn',
}

const actionTypeReducers: { [key: string]: any } = {
	[ACTION_TYPE.PROFILE_MODIFY_RUNID](state: TGProfile, actionData: any): TGProfile {
		const newState: TGProfile = JSON.parse(JSON.stringify(state))
		newState.g_globalId = actionData.g_globalId
		return newState
	},
	[ACTION_TYPE.PROFILE_MODIFY_LUNGAUGES](state: TGProfile, actionData: any): TGProfile {
		const newState: TGProfile = JSON.parse(JSON.stringify(state))
		// @ts-ignore
		newState.g_languageSet = LANGUAGE_TOGGLE_MAP[state.g_languageSet] || LANGUAGE_TOGGLE_MAP['zh-cn']
		return newState
	},
}

export const initialState: TGProfile = Object.freeze(createInitialState())
export default (state: TGProfile = initialState, action: TStoreCommonAction<ACTION_TYPE>): TGProfile => {
	const func: any = actionTypeReducers[action.type] || null
	if (func) {
		return func(state, action.data)
	}
	return state
}
