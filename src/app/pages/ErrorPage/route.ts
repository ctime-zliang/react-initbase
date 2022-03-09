import { TRouteItem } from '@app/router/config'
import Error404 from './404'

export const Error404Route = (): TRouteItem => {
	return {
		path: '*',
		exact: true,
		component: Error404,
	}
}
