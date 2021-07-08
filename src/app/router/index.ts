import Error404View from '@/pages/ErrorPage/404'
/* ... */
import HomeRoute from '@/pages/Home/route'
import RecordMgrList from '@/pages/RecordMgr/List/route'
import RecordMgrDetail from '@/pages/RecordMgr/Detail/route'
import RecordMgrError from '@/pages/RecordMgr/Error/route'
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
		{
			path: '*',
			component: Error404View,
		},
	]
}

export const filterRoutes = (routes: IRouteItem[] = [], prefixPath: string = ''): IRouteItem[] => {
	let path = ``
	for (let i = 0; i < routes.length; i++) {
		// @ts-ignore
		if (routes[i].routes && routes[i].routes.length) {
			filterRoutes(routes[i].routes, routes[i].path)
			continue
		}
		path += prefixPath + routes[i].path
		routes[i].path = path
	}
	return routes
}

export const noMatchComponent = Error404View
