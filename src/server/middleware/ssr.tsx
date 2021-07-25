import Koa from 'koa'
import React from 'react'
import path from 'path'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Provider as ReduxProvider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { ServerStyleSheet } from 'styled-components'
import paths from '../../../config/webpack.paths'
import { getAssetsPathsList } from '../utils/utils'
import layout from '../utils/layout'
import { IExtendKoaContext } from '../types/koa-context'
import I18nProvider from '../../app/i18n/I18nProvider'
import App from '../../app/App'

const helmetContext: any = {}
const serverRenderer = (params: { [key: string]: any } = {}) => {
	return async (ctx: IExtendKoaContext, next: Koa.Next) => {
		const stampCollection: { [key: string]: any } = {}
		if (params.filter(ctx) === true) {
			await next()
			return
		}
		try {
			;(global.window as any)['__PRELOADED_STATE__'] = ctx.usedState
			;(global.window as any)['__PRELOADED_RESULT__'] = ctx.resultsOfGetInitialProps
			stampCollection['startServerRender'] = new Date().getTime()
			const sheet = new ServerStyleSheet()
			const store = ctx.serverStore
			const content = renderToString(
				sheet.collectStyles(
					<ReduxProvider store={store}>
						<StaticRouter location={ctx.request.url} context={{}}>
							<I18nProvider>
								<HelmetProvider context={helmetContext}>
									<App store={store} />
								</HelmetProvider>
							</I18nProvider>
						</StaticRouter>
					</ReduxProvider>
				)
			)
			const assetsChildPath =
				process.env.NODE_ENV === 'development' ? paths.client.devBuild.pathTagForSSR : paths.client.prodBuild.pathTagForSSR
			const styles = sheet.getStyleTags()
			const assets = getAssetsPathsList(path.join(__dirname, `../${assetsChildPath}/manifest.json`))
			const htmlString = layout({
				styles,
				state: JSON.stringify(ctx.usedState),
				initialResult: JSON.stringify(ctx.resultsOfGetInitialProps),
				content,
				helmet: helmetContext.helmet,
				...assets,
			})
			stampCollection['endServerRender'] = new Date().getTime()
			ctx.type = 'text/html'
			ctx.status = 200
			ctx.body = htmlString
			const v = stampCollection['endServerRender'] - stampCollection['startServerRender']
			console.log(`=======================>[SSR 渲染耗时] ${v}ms <=======================`)
			return
		} catch (e) {
			params.onError(ctx, e)
		}
		await next()
	}
}

export default serverRenderer
