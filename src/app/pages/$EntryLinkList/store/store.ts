import { IEntryList } from './config'

export function createInitialState(): IEntryList {
	return {
		list: [
			{
				path: `/tests`,
				title: 'Tests Modules',
			},
			{
				path: `/record`,
				title: 'Record List',
			},
			{
				path: `/cssrender`,
				title: 'CSS Render Test',
			},
			{
				path: `/inf-scroll`,
				title: 'Infinite Scrolling',
			},
		],
	}
}
