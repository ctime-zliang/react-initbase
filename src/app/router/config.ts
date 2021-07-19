import React from 'react'

export interface IRouteItem {
	path: string
	component: React.ReactElement | React.FC | any
	layout?: React.ReactElement | React.FC | any
	render?: Function
	requiresAuth?: boolean
	routes?: IRouteItem[]
	exact?: boolean
	noMatch?: boolean
	strict?: boolean
	sensitive?: boolean
	meta?: any
	getInitialProps?: Function
	asyncStoreKeys?: string[]
	[key: string]: any
}
