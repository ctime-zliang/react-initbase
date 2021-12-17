import Index from './'
import { IRouteItem } from '@app/router/config'

export const D3GeometryCanvasRoute = (): IRouteItem => {
	return {
		path: '/3d-geometry-canvas',
		component: Index,
	}
}
