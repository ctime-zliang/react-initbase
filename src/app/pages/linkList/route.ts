import { TReduxStore } from '../../store/public/types'
import { TRouteItem } from '../../utils/hoc/renderRoutes/renderRoutes'
import Index from '.'

export const linkListRoute = (reduxStore: TReduxStore): TRouteItem => {
	return {
		path: '/link',
		exact: true,
		element: Index,
	}
}
