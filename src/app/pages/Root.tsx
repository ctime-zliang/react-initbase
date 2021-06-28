import React from 'react'
import { renderRoutes } from '../utils/hoc/render-routes'
import { routes, _routes, noMatchComponent } from '../router'

function Root(props: any) {
	const authPath = '/'
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
