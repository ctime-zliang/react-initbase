import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import gProfileReducer from './gProfile/reducer'
import recordReducer from './record/reducer'
import { REDUCER_G_PROFILE } from './gProfile/config'
import { REDUCER_RECORD_REDUCER } from './record/config'

interface IConfigureStoreParams {
	initialState?: any
	middleware?: any[]
}

function createCombineReducers() {
	return combineReducers({
		[REDUCER_G_PROFILE]: gProfileReducer,
		[REDUCER_RECORD_REDUCER]: recordReducer,
	})
}
export function configureStore(params: IConfigureStoreParams = {}) {
	const { initialState, middleware } = params
	const devtools =
		typeof window !== 'undefined' &&
		typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] })
	const composeEnhancers = devtools || compose
	let store: any = null
	if (typeof initialState == 'undefined') {
		store = createStore(createCombineReducers(), composeEnhancers(applyMiddleware(...[thunk].concat(...(middleware || [])))))
	} else {
		store = createStore(createCombineReducers(), initialState, composeEnhancers(applyMiddleware(...[thunk].concat(...(middleware || [])))))
	}
	// store.subscribe(() => {
	// 	console.log(`==> store.subscribe: `, store.getState())
	// })

	return store
}
