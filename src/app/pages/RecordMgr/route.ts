import { modulesInjectReducer } from '@app/store/rootReducer'
import { TStore } from '@app/store/rootStore'
import List, { getInitialProps as ListGetInitialProps } from './List'
import Detail, { getInitialProps as DetailGetInitialProps } from './Detail'
import ErrorView from './Error'
import { asyncComponent } from '@app/utils/hoc/async-component'
import { KEYOF_RECORD_REDUCER } from './store/config'
import { createReducer } from './store/reducer'
import { TRouteItem } from '@app/router/config'
import { KEYOF_ENTRYLINKLIST_REDUCER } from '@app/pages/$EntryLinkList/store/config'

export const RecordMgrListRoute = (store: TStore): TRouteItem => {
	modulesInjectReducer(store, KEYOF_RECORD_REDUCER, createReducer)
	return {
		path: '/record',
		component: List,
		getInitialProps: ListGetInitialProps,
		asyncStoreKeys: [KEYOF_RECORD_REDUCER],
	}
}

export const RecordMgrDetailRoute = (store: TStore): TRouteItem => {
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

export const RecordMgrErrorRoute = (store: TStore): TRouteItem => {
	modulesInjectReducer(store, KEYOF_RECORD_REDUCER, createReducer)
	return {
		path: '/*',
		component: ErrorView,
	}
}
