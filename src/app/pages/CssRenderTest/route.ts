import Index from './'
import { IRouteItem } from 'router/config'

export const CssRenderTest = (): IRouteItem => {
	return {
		path: '/cssrender',
		component: Index,
	}
}
