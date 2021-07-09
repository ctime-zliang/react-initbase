import List from './List'
import injectReducer from './store/inject'
import { IStore } from 'store/store'

export const EntryLinkList = (store: IStore) => {
	injectReducer(store)
	return {
		path: '/link',
		component: List,
	}
}
