import Koa from 'koa'
import path from 'path'
import koaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import paths from '../../../config/webpack.paths'
import ssr from './ssr'
import router, { errorRouterHanler } from '../router'
import dyeLog from './dyelog'
import store from './store'
import interceptor from './interceptor'
import parameter from './parameter'
import { IExtendKoaContext } from '../types/koa-context'

export default (app: Koa) => {
	app.use(interceptor())
	app.use(koaStatic(path.join(paths.common.buildRoot, `./${paths.client.devBuild.pathTagForSSR}`)))
	app.use(bodyParser())
	app.use(parameter())
	app.use(
		dyeLog({
			debug: true,
		})
	)
	router(app)
	app.use(
		store({
			filter(ctx: IExtendKoaContext) {
				return /^\/api/.test(ctx.url)
			},
		})
	)
	app.use(
		ssr({
			filter(ctx: IExtendKoaContext) {
				return /^\/api/.test(ctx.url)
			},
			onError(ctx: IExtendKoaContext, error: any) {
				ctx.app.emit('error', error, ctx)
			},
		})
	)
	app.use(errorRouterHanler)
}
