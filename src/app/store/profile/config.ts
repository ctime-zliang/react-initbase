export enum ACTION_TYPE {
	G_MODIFY_RUNID = 'G_MODIFY_RUNID',
	G_MODIFY_LUNGAUGES = 'G_MODIFY_LUNGAUGES',
}

export interface IAction {
	type: ACTION_TYPE
	data: any
}

export const KEY_G_PROFILE_REDUCER = 'G_PROFILE_REDUCER'

/********************************* *********************************/
/********************************* *********************************/

export const CLIENT_RENDER = `CLIENT_RENDER`
export const SERVER_RENDER = `SERVER_RENDER`

export interface IGProfile {
	g_RENDER_WAY: string
	g_globalId: string
	g_languageSet: string
}
