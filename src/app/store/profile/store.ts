import { CLIENT_RENDER, IGProfile, KEY_G_PROFILE_REDUCER } from './config'

export function createInitialState(g_RENDER_WAY: string = CLIENT_RENDER): IGProfile {
	return {
		g_RENDER_WAY,
		g_languageSet: 'en_us',
		g_globalId: String(new Date().getTime()),
	}
}

export function createDefaultState(): IGProfile {
	if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
		return {
			...window.__PRELOADED_STATE__[KEY_G_PROFILE_REDUCER],
		}
	}
	return createInitialState()
}
