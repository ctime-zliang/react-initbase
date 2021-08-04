import Index from './'
import { IRouteItem } from 'router/config'

export const TestModules = (): IRouteItem => {
	return {
		path: '/tests',
		component: Index,
		asyncStoreKeys: [],
	}
}
