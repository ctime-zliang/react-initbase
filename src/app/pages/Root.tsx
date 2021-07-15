import React from 'react'
import { renderRoutes } from '../utils/hoc/render-routes'
import { createRoutes, filterRoutes, noMatchComponent } from '../router'

function Root(props: any, ctx: any) {
	console.log(`Root ☆☆☆`, props, ctx)
	const authPath = '/'
	const routes = filterRoutes(createRoutes(props.store))
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
