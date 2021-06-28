import koa from 'koa'

export interface IExtendKoaContext extends koa.Context {
	routerMatched: boolean
	status: number
	noMatchClientRoute: boolean
	serverStore: any
	requestParams: any
	request: any
	[key: string]: any
}
