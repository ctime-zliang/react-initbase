import { modulesInjectReducer } from '@/store/rootReducer'
import { IStore } from '@/store/rootStore'
import List, { getInitialProps as ListGetInitialProps } from './List'
import Detail, { getInitialProps as DetailGetInitialProps } from './Detail'
import ErrorView from './Error'
import { asyncComponent } from '@/utils/hoc/async-component'
import { KEYOF_RECORD_REDUCER } from './store/config'
import { createReducer } from './store/reducer'
import { IRouteItem } from 'router/config'
import { KEYOF_ENTRYLINKLIST_REDUCER } from '@/pages/$EntryLinkList/store/config'

export const RecordMgrList = (store: IStore): IRouteItem => {
	modulesInjectReducer(store, KEYOF_RECORD_REDUCER, createReducer)
	return {
		path: '/record',
		component: List,
		getInitialProps: ListGetInitialProps,
		asyncStoreKeys: [KEYOF_RECORD_REDUCER],
	}
}

export const RecordMgrDetail = (store: IStore): IRouteItem => {
	modulesInjectReducer(store, KEYOF_RECORD_REDUCER, createReducer)
	return {
		path: '/detail/:id',
		getInitialProps: DetailGetInitialProps,
		component: asyncComponent(() => {
			return import('./Detail')
		}),
		// component: Detail,
		asyncStoreKeys: [KEYOF_ENTRYLINKLIST_REDUCER],
	}
}

export const RecordMgrError = (store: IStore): IRouteItem => {
	modulesInjectReducer(store, KEYOF_RECORD_REDUCER, createReducer)
	return {
		path: '/*',
		component: ErrorView,
		asyncStoreKeys: [],
	}
}
