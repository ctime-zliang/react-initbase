export enum ACTION_TYPE {
	RECORD_MODIFY_LIST = 'RECORD_MODIFY_LIST',
	RECORD_SET_ROW_LOADING_STATUS = 'RECORD_SET_ROW_LOADING_STATUS',
	RECORD_TOGGLE_SELECT_KEYS = 'RECORD_TOGGLE_SELECT_KEYS',
	RECORD_MODIFY_COUNTTOTAL = 'RECORD_MODIFY_COUNTTOTAL',
}

export type TRecordMgrItem = {
	isChecked: boolean
	id: string
	title: string
	content: string
	rowIndex: number
	isShow?: boolean
	key?: string
	isLoading?: boolean
}
export type TRecordMgr = {
	list: TRecordMgrItem[]
	countTotal: number
}
