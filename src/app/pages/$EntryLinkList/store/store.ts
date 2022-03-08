import { IEntryList } from './config'

export function createInitialState(): IEntryList {
	return {
		list: [
			{
				path: `/testpage`,
				title: 'Test Page',
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
