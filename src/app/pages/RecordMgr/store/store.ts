import { IRecordMgr, KEY_RECORD_REDUCER } from './config'

export function createInitialState(): IRecordMgr {
	return {
		list: [],
		countTotal: 0,
	}
}

export function createDefaultState(): IRecordMgr {
	if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
		return {
			...window.__PRELOADED_STATE__[KEY_RECORD_REDUCER],
		}
	}
	return createInitialState()
}
