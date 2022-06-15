import { modulesInjectReducer } from '@app/store/rootReducer'
import { TStore } from '@app/store/rootStore'
import List, { getInitialProps as ListGetInitialProps } from './List'
import ErrorView from './Error'
import { KEYOF_RECORD_REDUCER } from './store/config'
import { createReducer } from './store/reducer'
import { TRouteItem } from '@app/router/config'
import { asyncComponent } from '@/app/utils/hoc/asyncComponent'

export const RecordMgrListRoute = (store: TStore): TRouteItem => {
	modulesInjectReducer(store, KEYOF_RECORD_REDUCER, createReducer)
	return {
		path: '/record',
		// component: List,
		component: asyncComponent(() => {
			return import('./List/list')
		}),
		getInitialProps: ListGetInitialProps,
		asyncStoreKeys: [KEYOF_RECORD_REDUCER],
	}
}

export const RecordMgrErrorRoute = (store: TStore): TRouteItem => {
	modulesInjectReducer(store, KEYOF_RECORD_REDUCER, createReducer)
	return {
		path: '/*',
		component: ErrorView,
	}
}
