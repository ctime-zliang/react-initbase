import koa from 'koa'
import hotMiddleware from 'webpack-hot-middleware'
import { PassThrough } from 'stream'

export default (compiler: any, option: { [key: string]: any } = {}) => {
	const expressMiddleware: any = hotMiddleware(compiler, option)
	return async (ctx: koa.Context, next: koa.Next) => {
		let stream: any = new PassThrough()
		ctx.body = stream
		await expressMiddleware(
			ctx.req,
			{
				write: stream.write.bind(stream),
				writeHead(status: number, headers: { [key: string]: any } = {}) {
					ctx.status = status
					ctx.set(headers)
				},
				end() {
					console.log(`======================>[koa-webpack-hot-middleare] Request End <======================`)
				},
			},
			next
		)
	}
}
