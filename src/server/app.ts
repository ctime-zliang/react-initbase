import Koa from 'koa'
import middleware from './middleware'
import errorHandler from './error'
import { IExtendKoaContext } from './types/koa-context'

const app = new Koa()

//@ts-ignore
global.window = {}

app.on('error', (error, ctx: IExtendKoaContext) => {
	const result = errorHandler(error, ctx)
	console.log(result)
})

middleware(app)

export default app
