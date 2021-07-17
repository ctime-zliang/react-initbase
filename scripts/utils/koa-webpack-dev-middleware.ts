import koa from 'koa'
import devMiddleware from 'webpack-dev-middleware'

export default (compiler: any, option: { [key: string]: any } = {}) => {
	const expressMiddleware = devMiddleware(compiler, option)

	async function middleware(ctx: koa.Context, next: koa.Next) {
		await expressMiddleware(
			ctx.req,
			{
				// @ts-ignore
				end(content: string): void {
					ctx.body = content
				},
				// @ts-ignore
				setHeader(name: string, value: any): void {
					ctx.set(name, value)
				},
				// @ts-ignore
				getHeader(contentType) {
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
