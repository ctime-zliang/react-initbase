import { IStoreCommonAction } from '@/store/config'
import { ACTION_TYPE } from './config'

export const updateGRunId = () => {
	return async (dispatch: (__params: IStoreCommonAction<ACTION_TYPE>) => void) => {
		dispatch({
			type: ACTION_TYPE.PROFILE_MODIFY_RUNID,
			data: Math.random(),
		})
	}
}

export const updateGLanguageSet = (): IStoreCommonAction<ACTION_TYPE> => {
	return {
		type: ACTION_TYPE.PROFILE_MODIFY_LUNGAUGES,
		data: null,
	}
}
