import { IEntryList, KEY_ENTRYLINKLIST_REDUCER } from './config'

export function createInitialState(): IEntryList {
	return {
		list: [
			{
				path: `/record`,
				title: 'Record List',
			},
		],
	}
}

export function createDefaultState(): IEntryList {
	if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
		return {
			...window.__PRELOADED_STATE__[KEY_ENTRYLINKLIST_REDUCER],
		}
	}
	return createInitialState()
}
