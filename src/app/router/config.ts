import React from 'react'

export interface IRouteItem {
	path: string
	component: React.ReactElement | React.FC | any
	requiresAuth?: boolean
	routes?: IRouteItem[]
	children?: IRouteItem[]
	exact?: boolean
	noMatch?: boolean
	strict?: boolean
	sensitive?: boolean
	getInitialProps?: Function
	[key: string]: any
}
