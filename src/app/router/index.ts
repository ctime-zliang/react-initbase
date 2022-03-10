import Layout from '@app/pages/Layout'
import { HomeRoute } from '@app/pages/$Home/route'
import { Error404Route } from '@/app/pages/$ErrorPage/route'
import { RecordMgrListRoute, RecordMgrDetailRoute, RecordMgrErrorRoute } from '@app/pages/RecordMgr/route'
import { EntryLinkListRoute } from '@/app/pages/EntryLinkList/route'
import { CssRenderTestRoute } from '@app/pages/CssRenderTest/route'
import { InfiniteScrollingRoute } from '@app/pages/InfiniteScrolling/route'
import { TestPageRoute } from '@/app/pages/TestPage/route'
import { TRouteItem } from './config'
import { TStore } from '@app/store/rootStore'

type TStoreLocal = TStore | any

export const createRoutes = (store: TStoreLocal): TRouteItem[] => {
	return [
		HomeRoute(),
		{
			...RecordMgrListRoute(store),
			routes: [RecordMgrDetailRoute(store), RecordMgrErrorRoute(store)],
		},
		CssRenderTestRoute(),
		EntryLinkListRoute(store),
		TestPageRoute(),
		InfiniteScrollingRoute(),
		Error404Route(),
	]
}

export const filterRoutes = (routes: TRouteItem[] = []): TRouteItem[] => {
	return exec(routes, ``), routes

	function exec(routes: TRouteItem[] = [], prefixPath: string = '') {
		let path = ``
		for (let i = 0; i < routes.length; i++) {
			const routeItem: TRouteItem = routes[i]
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

export const noMatchComponent = Error404Route()
