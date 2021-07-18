import React from 'react'
import { renderRoutes } from '../utils/hoc/render-routes'
import { createRoutes, filterRoutes, noMatchComponent } from '../router'

function Root(props: any, ctx: any) {
	const { store } = props
	console.log(`Root ☆☆☆`, props, ctx, store.getState())
	const authPath = '/'
	const routes = filterRoutes(createRoutes(store))
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
}

export default Root
