import Index from './'
import { IRouteItem } from '@app/router/config'

export const InfiniteScrollingRoute = (): IRouteItem => {
	return {
		path: '/inf-scroll',
		component: Index,
	}
}
