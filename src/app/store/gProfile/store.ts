import { CLIENT_RENDER, IGProfile, REDUCER_G_PROFILE } from './config'

export function createInitialState(g_RENDER_WAY: string = CLIENT_RENDER): IGProfile {
	return {
		g_RENDER_WAY,
		g_globalId: String(new Date().getTime()),
	}
}

export function createDefaultState(): IGProfile {
	if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
		return {
			...window.__PRELOADED_STATE__[REDUCER_G_PROFILE],
		}
	}
	return createInitialState()
}
