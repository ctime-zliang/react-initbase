import { injectReducer } from '@/store/reducer'
import { IStore } from '@/store/store'
import { KEY_ENTRYLINKLIST_REDUCER } from './config'
import reducer from './reducer'

export default (store: IStore) => {
	injectReducer(store, KEY_ENTRYLINKLIST_REDUCER, reducer)
}
