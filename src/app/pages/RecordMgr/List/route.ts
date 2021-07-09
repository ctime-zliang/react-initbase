import { injectReducer } from '@/store/reducer'
import List from './'
import reducer from '../$Store/reducer'
import { KEY_RECORD_REDUCER } from '../$Store/config'
import { IStore } from 'store/store'

export default (store: IStore) => {
	injectReducer(store, KEY_RECORD_REDUCER, reducer)
	return {
		path: '/record',
		component: List,
	}
}
