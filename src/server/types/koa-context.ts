import koa from 'koa'

export interface IExtendKoaContext extends koa.Context {
	routerMatched: boolean
	status: number
	requestParams: any
	request: any
	noMatchClientRoute: boolean
	usedState?: any
	serverStore?: any
	concernedStoreKeys?: string[]
	resultsOfGetInitialProps?: any
	[key: string]: any
}
