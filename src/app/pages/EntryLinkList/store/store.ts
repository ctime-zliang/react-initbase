import { TEntryList } from './types'

export function createInitialState(): TEntryList {
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
