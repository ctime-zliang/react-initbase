import Index from './'
import { IRouteItem } from '@app/router/config'

export const TestModulesRoute = (): IRouteItem => {
	return {
		path: '/tests',
		component: Index,
	}
}
