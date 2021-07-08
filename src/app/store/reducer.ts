import { combineReducers } from 'redux'
import { IStore } from './store'
/* ... */
import profileReducer from './profile/reducer'
import { REDUCER_G_PROFILE } from './profile/config'

export function createCombineReducers(asyncReducers: { [key: string]: any } = {}) {
	return combineReducers({
		[REDUCER_G_PROFILE]: profileReducer,
		...asyncReducers,
	})
}

export function injectReducer(store: IStore, key: string, reducer: Function) {
	if (store.asyncReducers && store.replaceReducer) {
		store.asyncReducers[key] = reducer
		store.replaceReducer(createCombineReducers(store.asyncReducers))
	}
}
