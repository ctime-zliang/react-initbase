import React, { useEffect, useState } from 'react'
import i18next from 'i18next'
import i18nextXHRBackend from 'i18next-xhr-backend'
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import { I18nextProvider } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getLanguageSet } from '@/store/globalProfile/selectors'

/* ... */
import zhCN from './locales/zh_cn/translation.json'
import enUS from './locales/en_us/translation.json'

const DEFAULT_NAMESPACE = 'dTranslation'
i18next
	.use(i18nextXHRBackend)
	.use(i18nextBrowserLanguageDetector)
	.init({
		backend: {
			// for all available options read the backend's repository readme file
			loadPath: '/locales/{{lng}}/{{ns}}.json',
			// crossDomain: true
		},
		react: {
			// Must be false until Suspense is supported on the server side
			useSuspense: false,
			wait: true,
		},
		debug: false,
		lng: 'en_us',
		fallbackLng: 'en_us',
		defaultNS: DEFAULT_NAMESPACE,
		ns: [DEFAULT_NAMESPACE],
		partialBundledLanguages: true,
		resources: {
			zh_cn: { [DEFAULT_NAMESPACE]: zhCN },
			en_us: { [DEFAULT_NAMESPACE]: enUS },
		},
		parseMissingKeyHandler(missing: any) {
			// console.warn('MISSING TRANSLATION:', missing)
			return missing
		},
	})

i18next.languages = ['zh_cn', 'en_us']

export const i18Next = i18next

/************************************ ************************************/
/************************************ ************************************/
/************************************ ************************************/

function I18nProvider(props: any) {
	const { __CLIENT_ONLY__, children } = props
	const languageSet = useSelector(getLanguageSet)
	const [isInitial, setIsInitial] = useState(true)
	// console.log(`I18nProvider 🌙🌙🌙`, props, languageSet)
	useEffect(() => {
		i18next.changeLanguage(languageSet)
	}, [languageSet])
	if (isInitial && !__CLIENT_ONLY__) {
		setIsInitial(false)
		i18next.changeLanguage(languageSet)
	}
	return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
}

export default React.memo(I18nProvider)
