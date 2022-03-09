import { TRouteItem } from '@app/router/config'
import Home from './'

export const HomeRoute = (): TRouteItem => {
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
