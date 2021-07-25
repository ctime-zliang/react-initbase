import { combineReducers } from 'redux'
import { IStore } from './rootStore'
import profileReducer from './globalProfile/reducer'
import { KEYOF_G_PROFILE_REDUCER } from './globalProfile/config'
import { getWindowAttribute } from '@/utils/utils'

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

export function injectReducer(store: IStore, key: string, createReducer: Function) {
	if (store.asyncReducers && store.replaceReducer) {
		let __PRELOADED_STATE__DATA: { [key: string]: any } = getWindowAttribute('__PRELOADED_STATE__') || {}
		const reducer = createReducer(__PRELOADED_STATE__DATA[key])
		store.asyncReducers[key] = reducer
		store.replaceReducer(createCombineReducers(store.asyncReducers).combinedReducer)
	}
	return store
}

export function modulesInjectReducer(store: IStore, key: string, createReducer: Function) {
	const concernedStoreKeys = Object.keys(store.asyncReducers || {})
	if (concernedStoreKeys.includes(key)) {
		return store
	}
	return injectReducer(store, key, createReducer)
}
