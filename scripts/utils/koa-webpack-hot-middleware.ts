import koa from 'koa'
import stream from 'stream'
import webpackHotMiddleware from 'webpack-hot-middleware'

const PassThrough = stream.PassThrough
const _global: any = global

export default (compiler: any, option: any = {}) => {
    const middleware = webpackHotMiddleware(compiler, option)
    return async (ctx: koa.Context, next: koa.Next) => {
        const res = Object.assign({}, ctx.res)
        const streamInstance = new PassThrough()
        streamInstance.on('data', chunk => {
            if(chunk && _global.cache && _global.cache.updateCache) {
                _global.cache.updateCache()
            }
        })
        ctx.body = streamInstance
        await middleware(
            ctx.req,
            Object.assign(
                res, 
                {
                    write: streamInstance.write.bind(streamInstance),
                    writeHead(status: number, headers: {[key: string]: any}) {
                        ctx.status = status
                        ctx.set(headers)
                    },
                    end(content: any) {
                        ctx.body = content || 'Webpack-hot-middleware No Body Content.'
                    }
                }
            ),
            next
        )        
    }
}