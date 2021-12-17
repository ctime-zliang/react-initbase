import Index from './'
import { IRouteItem } from '@app/router/config'

export const D2GeometryCanvasRoute = (): IRouteItem => {
	return {
		path: '/2d-geometry-canvas',
		component: Index,
	}
}
