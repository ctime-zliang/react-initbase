import { injectReducer } from '@/store/reducer'
import List from './View'
import reducer from './Store/reducer'
import { REDUCER_RECORD_REDUCER } from './Store/config'
import { IStore } from 'store/store'

export default (store: IStore) => {
	injectReducer(store, REDUCER_RECORD_REDUCER, reducer)
	return {
		path: '/record',
		component: List,
	}
}
