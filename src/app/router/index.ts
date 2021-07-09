import HomeRoute from '@/pages/Home/route'
import Error404 from '@/pages/ErrorPage/route'
import Error404View from '@/pages/ErrorPage/404'
import RecordMgrList from '@/pages/RecordMgr/List/route'
import RecordMgrDetail from '@/pages/RecordMgr/Detail/route'
import RecordMgrError from '@/pages/RecordMgr/Error/route'
import EntryLinkList from '@/pages/EntryLinkList/List/route'
import { IRouteItem } from './config'
import { IStore } from 'store/store'

type TStore = IStore | any

export const createRoutes = (store: TStore): IRouteItem[] => {
	return [
		HomeRoute(),
		{
			...RecordMgrList(store),
			routes: [RecordMgrDetail(), RecordMgrError()],
		},
		EntryLinkList(store),
		{
			path: '*',
			exact: true,
			component: Error404View,
		},
	]
}

export const filterRoutes = (routes: IRouteItem[] = []): IRouteItem[] => {
	return exec(routes, ``), routes

	function exec(routes: IRouteItem[] = [], prefixPath: string = '') {
		let path = ``
		for (let i = 0; i < routes.length; i++) {
			// @ts-ignore
			if (routes[i].routes && routes[i].routes.length) {
				exec(routes[i].routes, routes[i].path)
				// continue
			}
			path = prefixPath + routes[i].path
			routes[i].path = path
		}
	}
}

export const noMatchComponent = Error404View
