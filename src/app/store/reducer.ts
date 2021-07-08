import { combineReducers } from 'redux'
import { IStore } from './store'
/* ... */
import gProfileReducer from './gProfile/reducer'
import recordReducer from './record/reducer'
import { REDUCER_G_PROFILE } from './gProfile/config'
import { REDUCER_RECORD_REDUCER } from './record/config'

// export function createCombineReducers(asyncReducers: {[key: string]: any} = {}) {
//     return combineReducers({
//         [REDUCER_G_PROFILE]: gProfileReducer,
//         ...asyncReducers
//     })
// }
export function createCombineReducers(asyncReducers: {[key: string]: any} = {}) {
    return combineReducers({
        [REDUCER_G_PROFILE]: gProfileReducer,
		[REDUCER_RECORD_REDUCER]: recordReducer,
        ...asyncReducers
    })
}

export function injectReducer(store: IStore, key: string, reducer: Function) {
    if (store.asyncReducers && store.replaceReducer) {
        store.asyncReducers[key] = reducer
        store.replaceReducer(createCombineReducers(store.asyncReducers))
    }    
}