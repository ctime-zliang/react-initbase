import { injectReducer } from '@/store/reducer'
import List from './'
import reducer from '../$Store/reducer'
import { KEY_ENTRYLINKLIST_REDUCER } from '../$Store/config'
import { IStore } from 'store/store'

export default (store: IStore) => {
	injectReducer(store, KEY_ENTRYLINKLIST_REDUCER, reducer)
	return {
		path: '/linklist',
		component: List,
	}
}
