import koa from 'koa'

const _global: any = global

export default (app: koa): void => {
	_global.window = {}
}
