import { IEntryList, KEYOF_ENTRYLINKLIST_REDUCER } from './config'

export function createInitialState(): IEntryList {
	return {
		list: [
			{
				path: `/record`,
				title: 'Record List',
			},
			{
				path: `/cssrender`,
				title: 'CSS Render Test',
			},
		],
	}
}
