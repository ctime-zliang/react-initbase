import Index from './'
import { IRouteItem } from 'router/config'

export const CssRenderTestRoute = (): IRouteItem => {
	return {
		path: '/cssrender',
		component: Index,
	}
}
