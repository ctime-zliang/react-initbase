import { CLIENT_RENDER, TGProfile } from './config'

export function createInitialState(g_RENDER_WAY: string = CLIENT_RENDER, languageSet: string = 'en_us'): TGProfile {
	const g_globalId = String(new Date().getTime())
	return {
		g_RENDER_WAY,
		g_languageSet: languageSet,
		g_globalId,
	}
}
