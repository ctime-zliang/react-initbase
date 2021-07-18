import { modulesInjectReducer } from '@/store/rootReducer'
import { IStore } from '@/store/rootStore'
import List, { getInitialProps } from './List'
import ErrorView from './Error'
import { asyncComponent } from '@/utils/hoc/async-component'
import { KEYOF_RECORD_REDUCER } from './store/config'
import { createReducer } from './store/reducer'
import { IRouteItem } from 'router/config'

export const RecordMgrList = (store: IStore): IRouteItem => {
	modulesInjectReducer(store, KEYOF_RECORD_REDUCER, createReducer)
	return {
		path: '/record',
		component: List,
		getInitialProps,
		storeKeys: [KEYOF_RECORD_REDUCER],
	}
}

export const RecordMgrDetail = (store: IStore): IRouteItem => {
	modulesInjectReducer(store, KEYOF_RECORD_REDUCER, createReducer)
	return {
		path: '/detail/:id',
		component: asyncComponent(() => {
			return import('./Detail')
		}),
		storeKeys: [KEYOF_RECORD_REDUCER],
	}
}

export const RecordMgrError = (store: IStore): IRouteItem => {
	modulesInjectReducer(store, KEYOF_RECORD_REDUCER, createReducer)
	return {
		path: '/*',
		component: ErrorView,
		storeKeys: [KEYOF_RECORD_REDUCER],
	}
}
