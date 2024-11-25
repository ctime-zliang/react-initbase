import React from 'react'
import { renderRoutes, TRouteItem } from '../utils/hoc/renderRoutes/renderRoutes'
import { createRoutes, filterRoutes } from './router'
import { TCommonComponentBaseProps } from '../types/comm.types'

function Root(props: TCommonComponentBaseProps): React.ReactElement {
	console.log(`Root ☆☆☆`, props)
	const { reduxStore } = props
	const authPath: string = '/'
	const routes: Array<TRouteItem> = filterRoutes(createRoutes(props.reduxStore))
	return renderRoutes(
		routes,
		{
			authPath,
		},
		{ ...props }
	)
}

export default React.memo(Root)
