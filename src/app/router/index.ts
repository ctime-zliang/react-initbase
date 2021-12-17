import Layout from '@app/pages/Layout'
import { HomeRoute } from '@app/pages/$Home/route'
import { Error404Route } from '@app/pages/ErrorPage/route'
import { RecordMgrListRoute, RecordMgrDetailRoute, RecordMgrErrorRoute } from '@app/pages/RecordMgr/route'
import { EntryLinkListRoute } from '@app/pages/$EntryLinkList/route'
import { CssRenderTestRoute } from '@app/pages/CssRenderTest/route'
import { InfiniteScrollingRoute } from '@app/pages/InfiniteScrolling/route'
import { TestModulesRoute } from '@app/pages/TestModules/route'
import { D2GeometryCanvasRoute } from '@app/pages/2DGeometryCanvas/route'
import { D3GeometryCanvasRoute } from '@app/pages/3DGeometryCanvas/route'
import { IRouteItem } from './config'
import { IStore } from '@app/store/rootStore'

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
		D2GeometryCanvasRoute(),
		D3GeometryCanvasRoute(),
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
