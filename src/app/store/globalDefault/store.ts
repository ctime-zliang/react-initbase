import { globalConfig } from '../../config/config'
import { v4 as uuidv4 } from 'uuid'
import { TStore } from './types'

export const createInitialState = (): TStore => {
	return {
		g_languageSetting: globalConfig.lang,
		linkList: [
			{ id: uuidv4(), title: 'Article', path: '/article' },
			{ id: uuidv4(), title: 'Redux State Manager', path: '/redux' },
			{ id: uuidv4(), title: 'Test Page', path: '/testpage' },
		],
	}
}
