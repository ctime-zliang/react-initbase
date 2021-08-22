import Layout from '@/pages/Layout'
import HomeRoute from '@/pages/$Home/route'
import Error404 from '@/pages/ErrorPage/route'
import { RecordMgrList, RecordMgrDetail, RecordMgrError } from '@/pages/RecordMgr/route'
import { EntryLinkList } from '@/pages/$EntryLinkList/route'
import { CssRenderTest } from '@/pages/CssRenderTest/route'
import { InfiniteScrolling } from '@/pages/InfiniteScrolling/route'
import { TestModules } from '@/pages/TestModules/route'
import { IRouteItem } from './config'
import { IStore } from 'store/rootStore'

type TStore = IStore | any

export const createRoutes = (store: TStore): IRouteItem[] => {
	return [
		HomeRoute(),
		{
			...RecordMgrList(store),
			routes: [RecordMgrDetail(store), RecordMgrError(store)],
		},
		CssRenderTest(),
		EntryLinkList(store),
		TestModules(),
		InfiniteScrolling(),
		Error404(),
	]
}

export const filterRoutes = (routes: IRouteItem[] = []): IRouteItem[] => {
	return exec(routes, ``), routes

	function exec(routes: IRouteItem[] = [], prefixPath: string = '') {
		let path = ``
		for (let i = 0; i < routes.length; i++) {
			const routeItem: IRouteItem = routes[i]
			// @ts-ignore
			if (routeItem.routes && routeItem.routes.length) {
				exec(routeItem.routes, routeItem.path)
			}
			path = prefixPath + routeItem.path
			routeItem.path = path
			routeItem.layout = Layout
		}
	}
}

export const noMatchComponent = Error404()
