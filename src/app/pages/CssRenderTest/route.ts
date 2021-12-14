import Index from './'
import { IRouteItem } from '@app/router/config'

export const CssRenderTestRoute = (): IRouteItem => {
	return {
		path: '/cssrender',
		component: Index,
	}
}
