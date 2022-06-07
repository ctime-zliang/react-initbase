import Koa from 'koa'
import path from 'path'
import koaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import paths from '../../../config/webpack/webpack.paths'
import ssr from '@server/middleware/ssr'
import router, { errorRouterHanler } from '@server/router'
import store from '@server/middleware/store'
import interceptor from '@server/middleware/interceptor'
import parameter from '@server/middleware/parameter'
import { TExtendKoaContext } from '@/server/types/koaContext'

const assetsChildPath: string = process.env.NODE_ENV === 'development' ? paths.client.devBuild.pathTagForSSR : paths.client.prodBuild.pathTagForSSR
const assetsPath: string = path.join(__dirname, `../${assetsChildPath}`)

export default (app: Koa): void => {
	app.use(interceptor())
	app.use(koaStatic(assetsPath))
	app.use(bodyParser())
	app.use(parameter())
	router(app)
	app.use(
		store({
			filter(ctx: TExtendKoaContext) {
				return /^\/api/.test(ctx.url)
			},
		})
	)
	app.use(
		ssr({
			filter(ctx: TExtendKoaContext): boolean {
				return /^\/api/.test(ctx.url)
			},
			onError(ctx: TExtendKoaContext, error: any): void {
				ctx.app.emit('error', error, ctx)
			},
		})
	)
	app.use(errorRouterHanler)
}
