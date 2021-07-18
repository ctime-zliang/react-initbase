export enum ACTION_TYPE {
	RECORD_MODIFY_LIST = 'RECORD_MODIFY_LIST',
	RECORD_SET_ROW_LOADING_STATUS = 'RECORD_SET_ROW_LOADING_STATUS',
	RECORD_REMOVE_RECORD_ITEM = 'RECORD_REMOVE_RECORD_ITEM',
	RECORD_TOGGLE_SELECT_KEYS = 'RECORD_TOGGLE_SELECT_KEYS',
	RECORD_MODIFY_COUNTTOTAL = 'RECORD_MODIFY_COUNTTOTAL',
}

export interface IAction {
	type: ACTION_TYPE
	data: any
}

export const KEYOF_RECORD_REDUCER = 'RECORD_REDUCER'

/********************************* *********************************/
/********************************* *********************************/

export interface IRecordMgrItem {
	isChecked: boolean
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
