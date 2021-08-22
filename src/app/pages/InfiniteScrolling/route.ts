import Index from './'
import { IRouteItem } from 'router/config'

export const InfiniteScrolling = (): IRouteItem => {
	return {
		path: '/inf-scroll',
		component: Index
	}
}
