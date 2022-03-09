import Index from './'
import { TRouteItem } from '@app/router/config'

export const InfiniteScrollingRoute = (): TRouteItem => {
	return {
		path: '/inf-scroll',
		component: Index,
	}
}
