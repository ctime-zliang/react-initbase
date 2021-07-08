import { createStore, StoreCreator, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { createCombineReducers } from './reducer'

interface IConfigureStoreParams {
	initialState?: any
	middleware?: any[]
}

export interface IStore extends StoreCreator {
    asyncReducers?: any
    replaceReducer?: Function
}

export function configureStore(params: IConfigureStoreParams = {}) {
	const { initialState, middleware } = params
	const devtools =
		typeof window !== 'undefined' &&
		typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] })
	const composeEnhancers = devtools || compose
	let store: IStore = () => {}
	if (typeof initialState == 'undefined') {
		store = createStore(createCombineReducers(), composeEnhancers(applyMiddleware(...[thunk].concat(...(middleware || [])))))
	} else {
		store = createStore(createCombineReducers(), initialState, composeEnhancers(applyMiddleware(...[thunk].concat(...(middleware || [])))))
	}
    store.asyncReducers = {}
	// store.subscribe(() => {
	// 	console.log(`==> store.subscribe: `, store.getState())
	// })

	return store
}
