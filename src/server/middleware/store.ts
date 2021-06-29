import Koa from 'koa'
import { configureStore } from '../../app/store'
import { REDUCER_G_PROFILE, SERVER_RENDER } from '../../app/store/gProfile/config'
import { createInitialState as createGProfileInitialState } from '../../app/store/gProfile/store'
import { routes } from '../../app/router'
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
				[REDUCER_G_PROFILE]: { ...createGProfileInitialState(SERVER_RENDER) },
			},
		})
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