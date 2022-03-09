import Index from '.'
import { TRouteItem } from '@app/router/config'

export const TestPageRoute = (): TRouteItem => {
	return {
		path: '/testpage',
		component: Index,
	}
}
