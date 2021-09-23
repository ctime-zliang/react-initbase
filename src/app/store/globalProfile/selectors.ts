import { createSelector } from 'reselect'
import { IGProfile, KEYOF_G_PROFILE_REDUCER } from './config'

const profile = (state: any): any => {
	return state[KEYOF_G_PROFILE_REDUCER]
}

export const getLanguageSet = createSelector([profile], (profile: IGProfile): string => {
	return profile.g_languageSet
})
