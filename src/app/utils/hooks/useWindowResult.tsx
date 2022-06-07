import React from 'react'

export const useWindowResult = (key: string) => {
	let __PRELOADED_RESULT__: { [key: string]: any } = {}
	if (typeof window !== 'undefined' && window.__PRELOADED_RESULT__) {
		__PRELOADED_RESULT__ = window.__PRELOADED_RESULT__ || {}
	}
	return [__PRELOADED_RESULT__[key] || null]
}
