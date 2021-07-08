import React from 'react'
import ReactDOM, { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { configureStore } from '../app/store/store'
import App from '../app/App'

let store: any = null
if (process.env.__CLIENT_ONLY__) {
	store = configureStore()
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<HelmetProvider>
					<App store={store} />
				</HelmetProvider>
			</BrowserRouter>
		</Provider>,
		document.getElementById('app')
	)
} else {
	store = window.store || configureStore({ ...(window.__PRELOADED_STATE__ || {}) })
	hydrate(
		<Provider store={store}>
			<BrowserRouter>
				<HelmetProvider>
					<App store={store} />
				</HelmetProvider>
			</BrowserRouter>
		</Provider>,
		document.getElementById('app')
	)
}

// Object.defineProperty(window, 'store', {
// 	value: store,
// })
// Object.defineProperty(window, 'env', {
// 	value: process.env.NODE_ENV,
// })
