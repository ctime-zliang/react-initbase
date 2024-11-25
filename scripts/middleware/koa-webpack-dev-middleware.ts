import { ServerResponse } from 'http'
import koa from 'koa'
import wbepackDevMiddleware from 'webpack-dev-middleware'

export default (compiler: any, option: { [key: string]: any } = {}) => {
	const expressMiddleware = wbepackDevMiddleware(compiler, option)
	async function middleware(ctx: koa.Context, next: koa.Next): Promise<string | void> {
		await expressMiddleware(
			ctx.req,
			{
				//@ts-ignore
				end(content: string): string {
					ctx.body = content
					return content
				},
				setHeader(name: string, value: string | string[]): ServerResponse {
					ctx.set(name, value)
					return ctx.res
				},
				getHeader(contentType: string): undefined {
					return undefined
				},
			},
			next
		)
	}

	middleware.getFilenameFromUrl = expressMiddleware.getFilenameFromUrl
	middleware.waitUntilValid = expressMiddleware.waitUntilValid
	middleware.invalidate = expressMiddleware.invalidate
	middleware.close = expressMiddleware.close
	middleware.fileSystem = (expressMiddleware as any).fileSystem

	return middleware
}
