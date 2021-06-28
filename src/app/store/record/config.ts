export enum ACTION_TYPE {
	MODIFY_RECORD_LIST = 'MODIFY_RECORD_LIST',
	SET_ROW_LOADING_STATUS = 'SET_ROW_LOADING_STATUS',
	REMOVE_RECORD_ITEM = 'REMOVE_RECORD_ITEM',
	TOGGLE_SELECT_KEYS = 'TOGGLE_SELECT_KEYS',
	/* ... */
	MODIFY_COUNTTOTAL = 'MODIFY_COUNTTOTAL',
}

export interface IAction {
	type: ACTION_TYPE
	data: any
}

export const REDUCER_RECORD_REDUCER = 'RECORD_REDUCER'

/********************************* *********************************/
/********************************* *********************************/

export interface IRecordMgrItem {
	isChcked: boolean
	id: string
	title: string
	content: string
	rowIndex: number
	isShow?: boolean
	key?: string
	isLoading?: boolean
}
export interface IRecordMgr {
	list: IRecordMgrItem[]
	countTotal: number
}
