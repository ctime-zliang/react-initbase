import React from 'react'
import ReactDOM, { hydrate } from 'react-dom'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import I18nProvider from '../app/i18n/I18nProvider'
import { configureStore } from '../app/store/rootStore'
import App from '../app/App'

let store: any = null
if (process.env.CLIENT_ONLY) {
	store = configureStore()
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<I18nProvider CLIENT_ONLY={process.env.CLIENT_ONLY}>
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
		(window as any).__store__ ||
		configureStore({
			initialState: window.__PRELOADED_STATE__ || {},
		})
	hydrateRoot(
		document.getElementById('app') as HTMLElement,
		<Provider store={store}>
			<BrowserRouter>
				<I18nProvider CLIENT_ONLY={process.env.CLIENT_ONLY}>
					<HelmetProvider>
						<App store={store} />
					</HelmetProvider>
				</I18nProvider>
			</BrowserRouter>
		</Provider>
	)
}

Object.defineProperty(window, '__store__', {
	value: store,
})
Object.defineProperty(window, '__env__', {
	value: process.env.NODE_ENV,
})
