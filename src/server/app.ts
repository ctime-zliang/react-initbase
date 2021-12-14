import koa from 'koa'
import init from '@server/lib/init'
import middleware from '@server/middleware'
import errorHandler from '@server/error'
import { IExtendKoaContext } from '@server/types/koa-context'

const app: koa = new koa()

init(app)

app.on('error', (error: any, ctx: IExtendKoaContext): void => {
	const result: any = errorHandler(error, ctx)
	console.log(result)
})

middleware(app)

export default app
