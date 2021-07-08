import { sleep } from '@/utils/utils'
import { ACTION_TYPE } from './config'

export const updateGlobalRunId = () => {
	return async (dispatch: Function) => {
		await sleep()
		dispatch({
			type: ACTION_TYPE.MODIFY_GLOBAL_RUNID,
			data: Math.random(),
		})
	}
}
