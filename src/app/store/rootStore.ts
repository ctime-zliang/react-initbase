import { createStore, StoreCreator, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createCombineReducers } from './rootReducer'

type TConfigureStoreParams = {
	initialState?: any
	middleware?: any[]
}

export type TStore = {
	syncInitialState?: any
	asyncReducers?: any
	replaceReducer?: Function
} & StoreCreator

export function configureStore(params: TConfigureStoreParams = {}) {
	const { initialState, middleware } = params
	const devtools =
		typeof window !== 'undefined' &&
		typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] })
	const composeEnhancers = devtools || compose
	const ccr = createCombineReducers()
	let store: TStore = () => {}
	/* 
		过滤掉与当前已存在的 reducer 不匹配的 state-key
	 */
	let usedInitialState: { [key: string]: any } = {}
	Object.keys(initialState || {}).forEach((item: string) => {
		if (ccr.syncReducerKeys.includes(item)) {
			usedInitialState[item] = initialState[item]
		}
	})
	if (!Object.keys(usedInitialState).length) {
		store = createStore(ccr.combinedReducer, composeEnhancers(applyMiddleware(...[thunk].concat(...(middleware || [])))))
	} else {
		store = createStore(ccr.combinedReducer, usedInitialState, composeEnhancers(applyMiddleware(...[thunk].concat(...(middleware || [])))))
	}
	store.asyncReducers = {}
	store.syncInitialState = initialState

	return store
}
