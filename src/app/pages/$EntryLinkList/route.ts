import { modulesInjectReducer } from '@app/store/rootReducer'
import { IStore } from '@app/store/rootStore'
import { IRouteItem } from '@app/router/config'
import List from './List'
import { KEYOF_ENTRYLINKLIST_REDUCER } from './store/config'
import { createReducer } from './store/reducer'

export const EntryLinkListRoute = (store: IStore): IRouteItem => {
	modulesInjectReducer(store, KEYOF_ENTRYLINKLIST_REDUCER, createReducer)
	return {
		path: '/link',
		component: List,
	}
}
