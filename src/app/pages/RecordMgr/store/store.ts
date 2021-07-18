import { IRecordMgr } from './config'

export function createInitialState(): IRecordMgr {
	return {
		list: [],
		countTotal: 0,
	}
}
