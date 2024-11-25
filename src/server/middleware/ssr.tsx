import koa from 'koa'
import React from 'react'
import path from 'path'
import { StaticRouter } from 'react-router-dom/server'
import { renderToString } from 'react-dom/server'
import { Provider as ReduxProvider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { ServerStyleSheet } from 'styled-components'
import paths from '../../../config/webpack/webpack.paths'
import { getAssetsPathsList, TGetAssetsPathsList } from '@server/utils/utils'
import layout from '@server/utils/layout'
import { TExtendKoaContext } from '@/server/types/koaContext'
import I18nProvider from '@app/i18n/I18nProvider'
import App from '@app/App'

const helmetContext: { [key: string]: any } = {}
const serverRenderer = (params: { [key: string]: any } = {}): ((ctx: TExtendKoaContext, next: koa.Next) => Promise<void>) => {
	return async (ctx: TExtendKoaContext, next: koa.Next): Promise<void> => {
		const stampCollection: { [key: string]: any } = {}
		if (params.filter(ctx) === true) {
			await next()
			return
		}
		try {
			global.window['__PRELOADED_STATE__'] = ctx.usedState
			global.window['__PRELOADED_RESULT__'] = ctx.resultsOfGetInitialProps
			stampCollection['startServerRender'] = new Date().getTime()
			const sheet: ServerStyleSheet = new ServerStyleSheet()
			const store = ctx.serverStore
			const content = renderToString(
				sheet.collectStyles(
					<ReduxProvider store={store}>
						<StaticRouter location={ctx.request.url}>
							<I18nProvider>
								<HelmetProvider context={helmetContext}>
									<App reduxStore={store} />
								</HelmetProvider>
							</I18nProvider>
						</StaticRouter>
					</ReduxProvider>
				)
			)
			;(global.window as any)['__PRELOADED_STATE__'] = null
			;(global.window as any)['__PRELOADED_RESULT__'] = null
			const assetsChildPath: string =
				process.env.NODE_ENV === 'development' ? paths.client.devBuild.pathTagForSSR : paths.client.prodBuild.pathTagForSSR
			const styles = sheet.getStyleTags()
			const assets: TGetAssetsPathsList = getAssetsPathsList(path.join(__dirname, `../${assetsChildPath}/manifest.json`))
			const htmlString: string = layout({
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
		} catch (e: any) {
			params.onError(ctx, e)
		}
		await next()
	}
}

export default serverRenderer
