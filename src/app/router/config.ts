import React from 'react'

export type TRouteItem = {
	path: string
	component: React.ReactElement | React.FC | any
	layout?: React.ReactElement | React.FC | any
	render?: (...r: any[]) => {}
	requiresAuth?: boolean
	routes?: TRouteItem[]
	exact?: boolean
	noMatch?: boolean
	strict?: boolean
	sensitive?: boolean
	meta?: any
	getInitialProps?: (...r: any[]) => {}
	asyncStoreKeys?: string[]
	[key: string]: any
}
