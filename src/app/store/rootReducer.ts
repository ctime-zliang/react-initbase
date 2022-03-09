import { combineReducers } from 'redux'
import { TStore } from './rootStore'
import profileReducer from './globalProfile/reducer'
import { KEYOF_G_PROFILE_REDUCER } from './globalProfile/config'

export function createCombineReducers(asyncReducers: { [key: string]: any } = {}) {
	const o = {
		[KEYOF_G_PROFILE_REDUCER]: profileReducer,
		...asyncReducers,
	}
	return {
		combinedReducer: combineReducers(o),
		syncReducerKeys: Object.keys(o),
	}
}

export function injectReducer(store: TStore, key: string, createReducer: Function) {
	if (store.asyncReducers && store.replaceReducer) {
		let __PRELOADED_STATE__: { [key: string]: any } = {}
		if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
			__PRELOADED_STATE__ = window.__PRELOADED_STATE__ || {}
		}
		const reducer = createReducer(__PRELOADED_STATE__[key])
		store.asyncReducers[key] = reducer
		const ccr = createCombineReducers(store.asyncReducers)
		store.replaceReducer(ccr.combinedReducer)
	}
	return store
}

export function modulesInjectReducer(store: TStore, key: string, createReducer: Function) {
	const concernedStoreKeys = Object.keys(store.asyncReducers || {})
	if (concernedStoreKeys.includes(key)) {
		return store
	}
	return injectReducer(store, key, createReducer)
}
