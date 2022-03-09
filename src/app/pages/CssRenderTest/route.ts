import Index from './'
import { TRouteItem } from '@app/router/config'

export const CssRenderTestRoute = (): TRouteItem => {
	return {
		path: '/cssrender',
		component: Index,
	}
}
