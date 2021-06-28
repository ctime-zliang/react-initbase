import Koa from 'koa'
import middleware from './middleware'
import errorHandler from './error'

const app = new Koa()

app.on('error', (error, ctx) => {
	const result = errorHandler(error, ctx)
	console.log(result)
})

middleware(app)

export default app
