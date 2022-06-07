import { TRecordMgr } from './types'

export function createInitialState(): TRecordMgr {
	return {
		list: [],
		countTotal: 0,
	}
}
