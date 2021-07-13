import Koa from 'koa'
import React from 'react'
import path from 'path'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { ServerStyleSheet } from 'styled-components'
import paths from '../../../config/webpack.paths'
import { getAssetsPathsList } from '../utils/utils'
import layout from '../utils/layout'
import { IExtendKoaContext } from '../types/koa-context'
/* ... */
import App from '../../app/App'

const helmetContext: any = {}
const serverRenderer = (params: { [key: string]: any } = {}) => {
	return async (ctx: IExtendKoaContext, next: Koa.Next) => {
		const stampCollection: any = {}
		if (params.filter(ctx) === true) {
			await next()
			return
		}
		try {
			stampCollection['startServerRender'] = new Date().getTime()
			const sheet = new ServerStyleSheet()
			const store = ctx.serverStore
			const state = JSON.stringify(store.getState())
			const content = renderToString(
				sheet.collectStyles(
					<Provider store={store}>
						<StaticRouter location={ctx.request.url} context={{}}>
							<HelmetProvider context={helmetContext}>
								<App store={store} />
							</HelmetProvider>
						</StaticRouter>
					</Provider>
				)
			)
			const styles = sheet.getStyleTags()
			const assets = getAssetsPathsList(path.join(paths.common.buildRoot, `./${paths.client.devBuild.pathTagForSSR}/manifest.json`))
			const htmlString = layout({
				styles,
				state,
				content,
				helmet: helmetContext.helmet,
				...assets
			})
			stampCollection['endServerRender'] = new Date().getTime()
			ctx.type = 'text/html'
			ctx.status = 200
			ctx.body = htmlString
			console.log('==============>>> SSR 渲染耗时: ', stampCollection['endServerRender'] - stampCollection['startServerRender'])
			return
		} catch (e) {
			params.onError(ctx, e)
		}
		await next()
	}
}

export default serverRenderer
