import List from './List'
import Detail from './Detail'
import ErrorView from './Error'
import injectReducer from './$Store/inject'
import { IStore } from 'store/store'

export const RecordMgrList = (store: IStore) => {
	injectReducer(store)
	return {
		path: '/record',
		component: List,
	}
}

export const RecordMgrDetail = (store: IStore) => {
	injectReducer(store)
	return {
		path: '/detail/:id',
		component: Detail,
	}
}

export const RecordMgrError = (store: IStore) => {
	injectReducer(store)
	return {
		path: '/*',
		component: ErrorView,
	}
}
