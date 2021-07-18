import React from 'react'
import ReactDOM, { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import I18nProvider from '../app/i18n/I18nProvider'
import { configureStore } from '../app/store/rootStore'
import App from '../app/App'

let store: any = null
if (process.env.__CLIENT_ONLY__) {
	store = configureStore()
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<I18nProvider __CLIENT_ONLY__={process.env.__CLIENT_ONLY__}>
					<HelmetProvider>
						<App store={store} />
					</HelmetProvider>
				</I18nProvider>
			</BrowserRouter>
		</Provider>,
		document.getElementById('app')
	)
} else {
	store =
		(window as any).__store ||
		configureStore({
			initialState: window.__PRELOADED_STATE__ || {},
		})
	hydrate(
		<Provider store={store}>
			<BrowserRouter>
				<I18nProvider __CLIENT_ONLY__={process.env.__CLIENT_ONLY__}>
					<HelmetProvider>
						<App store={store} />
					</HelmetProvider>
				</I18nProvider>
			</BrowserRouter>
		</Provider>,
		document.getElementById('app')
	)
}

Object.defineProperty(window, '__store', {
	value: store,
})
Object.defineProperty(window, '__env', {
	value: process.env.NODE_ENV,
})
