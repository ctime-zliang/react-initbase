import { TRecordMgr } from './config'

export function createInitialState(): TRecordMgr {
	return {
		list: [],
		countTotal: 0,
	}
}
