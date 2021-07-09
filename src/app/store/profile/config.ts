export enum ACTION_TYPE {
	MODIFY_GLOBAL_RUNID = 'MODIFY_GLOBAL_RUNID',
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
}
