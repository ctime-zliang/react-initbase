import React from 'react'
import { renderRoutes } from '../utils/hoc/render-routes'
import { createRoutes, filterRoutes, noMatchComponent } from '@app/router'
import { IRouteItem } from '@app/router/config'
/* ... */
// import RouteViewTests from '@/pages/__route-view.tests'

function Root(props: any, ctx: any) {
	const { store } = props
	console.log(`Root ☆☆☆`, props, ctx, store.getState())
	const authPath: string = '/'
	const routes: IRouteItem[] = filterRoutes(createRoutes(store))
	return (
		<>
			{renderRoutes(
				routes,
				{
					authPath,
					noMatch: noMatchComponent,
				},
				{ ...props }
			)}
		</>
	)
	// return <RouteViewTests />
}

export default Root
