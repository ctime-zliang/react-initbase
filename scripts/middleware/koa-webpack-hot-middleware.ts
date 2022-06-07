import koa from 'koa'
import expressWebpackHotMiddleware from './express-webpack-hot-middleware'
import { PassThrough } from 'stream'

export default (compiler: any, option: { [key: string]: any } = {}): ((ctx: koa.Context, next: koa.Next) => Promise<any>) => {
	const expressMiddleware: any = expressWebpackHotMiddleware(compiler, option)
	return async (ctx: koa.Context, next: koa.Next): Promise<any> => {
		let stream: any = new PassThrough()
		ctx.body = stream
		stream.on('error', (error: any): void => {
			console.log(`=======================>[koa-webpack-hot-middleare] PassThrough Error <=======================`)
			console.log(error)
		})
		await expressMiddleware(
			ctx.req,
			{
				stream,
				write: stream.write.bind(stream),
				writeHead(status: number, headers: { [key: string]: any } = {}): void {
					ctx.status = status
					ctx.set(headers)
				},
				end(): void {
					console.log(`=======================>[koa-webpack-hot-middleare] Request End <=======================`)
				},
			},
			next
		)
	}
}
