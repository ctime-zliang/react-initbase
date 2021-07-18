import { IRouteItem } from '@/router/config'
import Error404 from './404'

export default (): IRouteItem => {
	return {
		path: '*',
		exact: true,
		component: Error404,
	}
}
