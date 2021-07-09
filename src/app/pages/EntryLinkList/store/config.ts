export enum ACTION_TYPE {}
/* ... */

export interface IAction {
	type: ACTION_TYPE
	data: any
}

export const KEY_ENTRYLINKLIST_REDUCER = 'ENTRYLINKLIST_REDUCER'

/********************************* *********************************/
/********************************* *********************************/

export interface IEntryListItem {
	path: string
	title: string
}
export interface IEntryList {
	list: IEntryListItem[]
}
