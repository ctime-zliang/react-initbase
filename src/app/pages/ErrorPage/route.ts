import { IRouteItem } from '@app/router/config'
import Error404 from './404'

export const Error404Route = (): IRouteItem => {
	return {
		path: '*',
		exact: true,
		component: Error404,
	}
}
