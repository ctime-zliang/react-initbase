import koa from 'koa'
import { configureStore } from '@app/store/rootStore'
import { KEYOF_G_PROFILE_REDUCER, SERVER_RENDER } from '@app/store/globalProfile/config'
import { createInitialState as createGProfileInitialState } from '@app/store/globalProfile/store'
import { createRoutes, filterRoutes } from '@app/router'
import { matchRoutes } from 'react-router-config'
import { TExtendKoaContext } from '@/server/types/koaContext'

export default (params: { [key: string]: any } = {}): ((ctx: TExtendKoaContext, next: koa.Next) => Promise<void>) => {
	return async (ctx: TExtendKoaContext, next: koa.Next): Promise<void> => {
		if (params.filter(ctx) === true) {
			await next()
			return
		}
		const stampCollection: { [key: string]: any } = {}
		stampCollection['startHandleStore'] = new Date().getTime()
		let storeKeys: Array<string> = []
		const store: any = configureStore({
			initialState: {
				[KEYOF_G_PROFILE_REDUCER]: { ...createGProfileInitialState(SERVER_RENDER, 'zh_cn') },
			},
		})
		const nowStoreKeys: Array<string> = Object.keys(store.getState() || {})
		const routes = filterRoutes(createRoutes(store))
		const branch = matchRoutes(routes, ctx.request.path)
		const matchItems = branch && branch.length >= 2 ? [branch[branch.length - 1]] : branch
		const promises: Array<Promise<any | null>> = matchItems.map((item: any): any | null => {
			storeKeys = [...(item.route.asyncStoreKeys || []), ...storeKeys]
			const Component = item.route.component
			const routerGetInitialProps = typeof item.route.getInitialProps == 'function' ? item.route.getInitialProps : null
			const comptGetInitialProps = typeof Component.getInitialProps == 'function' ? Component.getInitialProps : null
			const getInitialProps = routerGetInitialProps || comptGetInitialProps
			return getInitialProps ? getInitialProps(store, ctx) : Promise.resolve(null)
		})
		const concernedStoreKeys: Array<string> = Array.from(new Set([...nowStoreKeys, ...storeKeys]))
		// const concernedStoreKeys: Array<string> = []
		let resultsOfGetInitialProps: { [key: string]: any } = {}
		await Promise.all(promises)
			.then((rs: any[]) => {
				rs.forEach((value: any, index: number) => {
					if (Object.prototype.toString.call(value) === '[object Object]') {
						resultsOfGetInitialProps = { ...resultsOfGetInitialProps, ...value }
					}
				})
			})
			.catch((err: any) => {
				console.log(`=======================>[Store 处理出错]<=======================`)
				console.log(err)
			})
		const allStoreData = store.getState() || {}
		const usedState: { [key: string]: any } = {}
		Object.keys(allStoreData).forEach((item: string): void => {
			if (concernedStoreKeys.includes(item)) {
				usedState[item] = allStoreData[item]
			}
		})
		ctx.serverStore = store
		ctx.usedState = usedState
		ctx.concernedStoreKeys = concernedStoreKeys
		ctx.resultsOfGetInitialProps = resultsOfGetInitialProps
		console.log(resultsOfGetInitialProps)
		stampCollection['endHandleStore'] = new Date().getTime()
		const v = stampCollection['endHandleStore'] - stampCollection['startHandleStore']
		console.log(`=======================>[Store 处理耗时] ${v}ms <=======================`)
		await next()
	}
}
