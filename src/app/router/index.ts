import HomeRoute from '@/pages/Home/route'
import Error404 from '@/pages/ErrorPage/route'
import { RecordMgrList, RecordMgrDetail, RecordMgrError } from '@/pages/RecordMgr/route'
import { EntryLinkList } from '@/pages/EntryLinkList/route'
import { IRouteItem } from './config'
import { IStore } from 'store/store'

type TStore = IStore | any

export const createRoutes = (store: TStore): IRouteItem[] => {
	console.log(`createRoutes ☆☆☆`, store)
	return [
		HomeRoute(),
		{
			...RecordMgrList(store),
			routes: [RecordMgrDetail(store), RecordMgrError(store)],
		},
		EntryLinkList(store),
		Error404(),
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
			}
			path = prefixPath + routes[i].path
			routes[i].path = path
		}
	}
}

export const noMatchComponent = Error404()
