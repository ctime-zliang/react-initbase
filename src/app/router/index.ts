import Layout from '@/pages/Layout'
import { HomeRoute } from '@/pages/$Home/route'
import { Error404Route } from '@/pages/ErrorPage/route'
import { RecordMgrListRoute, RecordMgrDetailRoute, RecordMgrErrorRoute } from '@/pages/RecordMgr/route'
import { EntryLinkListRoute } from '@/pages/$EntryLinkList/route'
import { CssRenderTestRoute } from '@/pages/CssRenderTest/route'
import { InfiniteScrollingRoute } from '@/pages/InfiniteScrolling/route'
import { TestModulesRoute } from '@/pages/TestModules/route'
import { IRouteItem } from './config'
import { IStore } from 'store/rootStore'

type TStore = IStore | any

export const createRoutes = (store: TStore): IRouteItem[] => {
	return [
		HomeRoute(),
		{
			...RecordMgrListRoute(store),
			routes: [RecordMgrDetailRoute(store), RecordMgrErrorRoute(store)],
		},
		CssRenderTestRoute(),
		EntryLinkListRoute(store),
		TestModulesRoute(),
		InfiniteScrollingRoute(),
		Error404Route(),
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

export const noMatchComponent = Error404Route()
