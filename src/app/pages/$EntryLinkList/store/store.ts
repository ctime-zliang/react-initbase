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
			{
				path: `/2d-geometry-canvas`,
				title: '2D Geometry Canvas',
			},
			{
				path: `/3d-geometry-canvas`,
				title: '3D Geometry Canvas',
			},
		],
	}
}
