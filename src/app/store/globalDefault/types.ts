export type TLinkListItem = {
	id: string
	title: string
	path: string
}

export type TStore = {
	g_languageSetting: string
	linkList: Array<TLinkListItem>
}

export enum ACTION_TYPE {
	MODIFY_GLOABL_LANG = 'MODIFY_GLOABL_LANG',
}
