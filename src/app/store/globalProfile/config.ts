export const KEYOF_G_PROFILE_REDUCER = 'G_PROFILE_REDUCER'

export enum ACTION_TYPE {
	PROFILE_MODIFY_RUNID = 'PROFILE_MODIFY_RUNID',
	PROFILE_MODIFY_LUNGAUGES = 'PROFILE_MODIFY_LUNGAUGES',
}

export type TGProfile = {
	g_RENDER_WAY: string
	g_globalId: string
	g_languageSet: string
}

/********************************* *********************************/
/********************************* *********************************/
/********************************* *********************************/

export const CLIENT_RENDER = `CLIENT_RENDER`
export const SERVER_RENDER = `SERVER_RENDER`
