import Koa from 'koa'
import { configureStore } from '../../app/store/store'
import { KEY_G_PROFILE_REDUCER, SERVER_RENDER } from '../../app/store/profile/config'
import { createInitialState as createGProfileInitialState } from '../../app/store/profile/store'
import { createRoutes, filterRoutes } from '../../app/router'
import { matchRoutes } from 'react-router-config'
import { IExtendKoaContext } from '../types/koa-context'

export default (params: { [key: string]: any } = {}) => {
	return async (ctx: IExtendKoaContext, next: Koa.Next) => {
		if (params.filter(ctx) === true) {
			await next()
			return
		}
		const store = configureStore({
			initialState: {
				[KEY_G_PROFILE_REDUCER]: { ...createGProfileInitialState(SERVER_RENDER) },
			},
		})
		const routes = filterRoutes(createRoutes(store))
		const branch = matchRoutes(routes, ctx.request.path)
		const matchItems = branch && branch.length >= 2 ? [branch[branch.length - 1]] : branch
		const promises = matchItems.map((item: any) => {
			const Component = item.route.component
			return Component.getInitialProps instanceof Function ? Component.getInitialProps(store, ctx.request) : Promise.resolve(null)
		})
		await Promise.all(promises).catch(err => {
			console.log(err)
		})
		ctx.serverStore = store
		await next()
	}
}
