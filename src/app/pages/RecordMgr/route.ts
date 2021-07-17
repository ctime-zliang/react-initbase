import List, { getInitialProps } from './List'
import ErrorView from './Error'
import injectReducer from './store/inject'
import { IStore } from 'store/store'
import { asyncComponent } from '@/utils/hoc/async-component'

export const RecordMgrList = (store: IStore) => {
	injectReducer(store)
	return {
		path: '/record',
		component: List,
		getInitialProps
	}
}

export const RecordMgrDetail = (store: IStore) => {
	injectReducer(store)
	return {
		path: '/detail/:id',
		component: asyncComponent(() => {
			return import('./Detail')
		}),
	}
}

export const RecordMgrError = (store: IStore) => {
	injectReducer(store)
	return {
		path: '/*',
		component: ErrorView,
	}
}
