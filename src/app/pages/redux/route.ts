import { TReduxStore } from '../../store/public/types'
import { modulesInjectReducer } from '../../store/redux'
import { TRouteItem } from '../../utils/hoc/renderRoutes/renderRoutes'
/* ... */
import { createReducer as counter_createReducer, initialState as counter_initialState } from '../../store/redux-counter/reducer'
import { TStore as counter_TStore } from '../../store/redux-counter/types'
import { moduleKey as counter_moduleKey } from '../../store/redux-counter/config'
/* ... */
import { createReducer as timeStamp_createReducer, initialState as timeStamp_initialState } from '../../store/redux-timeStamp/reducer'
import { TStore as timeStamp_TStore } from '../../store/redux-timeStamp/types'
import { moduleKey as timeStamp_moduleKey } from '../../store/redux-timeStamp/config'

import Index from '.'

export const reduxContainerRoute = (reduxStore: TReduxStore): TRouteItem => {
	modulesInjectReducer(reduxStore, counter_moduleKey, counter_createReducer)
	modulesInjectReducer(reduxStore, timeStamp_moduleKey, timeStamp_createReducer)
	return {
		path: '/redux',
		exact: true,
		element: Index,
	}
}
