import Index from '.'
import { IRouteItem } from '@app/router/config'

export const TestPageRoute = (): IRouteItem => {
	return {
		path: '/testpage',
		component: Index,
	}
}
