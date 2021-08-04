import koa from 'koa'
import init from './lib/init'
import middleware from './middleware'
import errorHandler from './error'
import { IExtendKoaContext } from './types/koa-context'

const app: koa = new koa()

init(app)

app.on('error', (error, ctx: IExtendKoaContext) => {
	const result = errorHandler(error, ctx)
	console.log(result)
})

middleware(app)

export default app
