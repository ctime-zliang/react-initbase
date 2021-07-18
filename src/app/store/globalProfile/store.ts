import { CLIENT_RENDER, IGProfile } from './config'

export function createInitialState(g_RENDER_WAY: string = CLIENT_RENDER, languageSet: string = 'en_us'): IGProfile {
	const g_globalId = String(new Date().getTime())
	return {
		g_RENDER_WAY,
		g_languageSet: languageSet,
		g_globalId,
	}
}
