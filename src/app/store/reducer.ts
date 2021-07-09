import { combineReducers } from 'redux'
import { IStore } from './store'
/* ... */
import profileReducer from './profile/reducer'
import { KEY_G_PROFILE_REDUCER } from './profile/config'

export function createCombineReducers(asyncReducers: { [key: string]: any } = {}) {
	return combineReducers({
		[KEY_G_PROFILE_REDUCER]: profileReducer,
		...asyncReducers,
	})
}

export function injectReducer(store: IStore, key: string, reducer: Function) {
	if (store.asyncReducers && store.replaceReducer) {
		store.asyncReducers[key] = reducer
		store.replaceReducer(createCombineReducers(store.asyncReducers))
	}
}
