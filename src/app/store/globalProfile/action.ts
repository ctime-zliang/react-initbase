import { ACTION_TYPE } from './config'

export const updateGRunId = () => {
	return async (dispatch: Function) => {
		dispatch({
			type: ACTION_TYPE.PROFILE_MODIFY_RUNID,
			data: Math.random(),
		})
	}
}

export const updateGLanguageSet = () => {
	return {
		type: ACTION_TYPE.PROFILE_MODIFY_LUNGAUGES,
		data: null,
	}
}
