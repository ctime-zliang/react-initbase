import { sleep } from '@/utils/utils'
import { ACTION_TYPE } from './config'

export const updateGRunId = () => {
	return async (dispatch: Function) => {
		await sleep()
		dispatch({
			type: ACTION_TYPE.G_MODIFY_RUNID,
			data: Math.random(),
		})
	}
}

export const updateGLanguageSet = () => {
	return {
		type: ACTION_TYPE.G_MODIFY_LUNGAUGES,
		data: null,
	}
}
