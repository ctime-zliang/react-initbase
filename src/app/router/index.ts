import Home from '@/pages/Home'
import Error404View from '@/pages/ErrorPage/404'
import RecordMgrList from '@/pages/RecordMgr/List'
import RecordMgrDetail from '@/pages/RecordMgr/Detail'
import RecordMgrError from '@/pages/RecordMgr/Error'
import { IRouteItem } from './config'

export const routes: IRouteItem[] = [
	{
		path: '/',
		exact: true,
		component: Home,
	},
	{
		path: '/record',
		component: RecordMgrList,
		routes: [
			{
				path: '/record/detail/:id',
				component: RecordMgrDetail,
			},
			{
				path: '/record/*',
				component: RecordMgrError,
			},
		],
	},
	{
		path: '*',
		component: Error404View,
	},
]

export const noMatchComponent = Error404View
