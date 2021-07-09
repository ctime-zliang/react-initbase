import { injectReducer } from '@/store/reducer'
import { IStore } from '@/store/store'
import { KEY_RECORD_REDUCER } from './config'
import reducer from './reducer'

export default (store: IStore) => {
	injectReducer(store, KEY_RECORD_REDUCER, reducer)
}
