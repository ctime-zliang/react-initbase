import { IRouteItem } from 'router/config'
import Home from './'

export const HomeRoute = (): IRouteItem => {
	return {
		path: '/',
		exact: true,
		component: Home,
		meta: {
			isSetPageHeaderHidder: true,
			isSetPageFooterHidder: true,
		},
	}
}
