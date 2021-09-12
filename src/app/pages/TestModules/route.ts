import Index from './'
import { IRouteItem } from 'router/config'

export const TestModulesRoute = (): IRouteItem => {
	return {
		path: '/tests',
		component: Index,
	}
}
