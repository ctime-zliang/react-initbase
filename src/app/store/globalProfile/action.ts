import { TStoreCommonAction } from '@app/store/types'
import { ACTION_TYPE } from './config'

export const updateGRunId = () => {
	return async (dispatch: (__params: TStoreCommonAction<ACTION_TYPE>) => void) => {
		dispatch({
			type: ACTION_TYPE.PROFILE_MODIFY_RUNID,
			data: Math.random(),
		})
	}
}

export const updateGLanguageSet = (): TStoreCommonAction<ACTION_TYPE> => {
	return {
		type: ACTION_TYPE.PROFILE_MODIFY_LUNGAUGES,
		data: null,
	}
}
