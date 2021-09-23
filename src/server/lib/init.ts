import koa from 'koa'

// @ts-ignore
const _global: any = global

export default (app: koa) => {
	_global.window = {}
}
