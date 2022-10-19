import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { TReduxStore } from './public/types'
import { createReducer as globalDefault_createReducer, initialState as globalDefault_initialState } from './globalDefault/reducer'
import { TStore as globalDefault_TStore } from './globalDefault/types'
import { moduleKey as globalDefault_moduleKey } from './globalDefault/config'

type TConfigureStoreParams = {
	initialState?: any
	middleware?: Array<any>
}

/**
 * 创建 reducer
 *      创建由静态 reducer 和动态传入的 async-reducer 组成的 reducers 对象
 */
function createCombineReducers(asyncReducers: { [key: string]: any } = {}) {
	const o: { [key: string]: any } = {
		[globalDefault_moduleKey]: globalDefault_createReducer(),
		...asyncReducers,
	}
	return {
		combinedReducer: combineReducers(o),
		syncReducerKeys: Object.keys(o),
	}
}

/**
 * 动态注入异步 reducer
 *      在注册路由的时候注册 reducer
 */
export function modulesInjectReducer(store: TReduxStore, key: string, createAsyncReducer: Function): TReduxStore {
	const concernedStoreKeys: Array<string> = Object.keys(store.asyncReducers || {})
	if (concernedStoreKeys.includes(key)) {
		return store
	}
	store.asyncReducers[key] = createAsyncReducer()
	const ccr = createCombineReducers(store.asyncReducers)
	store.replaceReducer(ccr.combinedReducer)
	return store
}

export const configureStore = (params: TConfigureStoreParams = {}): TReduxStore => {
	const { initialState, middleware } = params
	const devtools =
		typeof window !== 'undefined' &&
		typeof (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] })
	const composeEnhancers = devtools || compose
	const ccr = createCombineReducers()
	let store: TReduxStore = {} as TReduxStore
	/**
	 * 过滤掉与当前已存在的 reducer 不匹配的 state-key
	 **/
	let usedInitialState: { [key: string]: any } = {}
	Object.keys(initialState || {}).forEach((item: string) => {
		if (ccr.syncReducerKeys.includes(item)) {
			usedInitialState[item] = initialState[item]
		}
	})
	if (!Object.keys(usedInitialState).length) {
		store = createStore(ccr.combinedReducer, composeEnhancers(applyMiddleware(...[thunkMiddleware].concat(...(middleware || [])))))
	} else {
		store = createStore(
			ccr.combinedReducer,
			usedInitialState,
			composeEnhancers(applyMiddleware(...[thunkMiddleware].concat(...(middleware || []))))
		)
	}
	store.asyncReducers = {}
	store.syncInitialState = initialState

	return store
}

export type TCombineState = {
	[globalDefault_moduleKey]: globalDefault_TStore
	[key: string]: any
}
