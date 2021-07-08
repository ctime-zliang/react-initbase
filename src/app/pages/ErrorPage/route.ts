import Error404 from './404'

export default () => {
	return {
		path: '*',
		exact: true,
		component: Error404,
	}
}
