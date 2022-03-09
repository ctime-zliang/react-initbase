import { modulesInjectReducer } from '@app/store/rootReducer'
import { TStore } from '@app/store/rootStore'
import { TRouteItem } from '@app/router/config'
import List from './List'
import { KEYOF_ENTRYLINKLIST_REDUCER } from './store/config'
import { createReducer } from './store/reducer'

export const EntryLinkListRoute = (store: TStore): TRouteItem => {
	modulesInjectReducer(store, KEYOF_ENTRYLINKLIST_REDUCER, createReducer)
	return {
		path: '/link',
		component: List,
	}
}
