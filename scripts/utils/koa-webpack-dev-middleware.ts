import koa from 'koa'
import webpackDevMiddleware from 'webpack-dev-middleware'

const middleware = (doIt: any, req: any, res: any) => {
    const { end: originalEnd } = res
    return new Promise((resolve, reject) => {
        res.end = function end() {
            originalEnd.apply(this, arguments)
            resolve(0)
        }
        doIt(
            req, 
            res, 
            () => {
                resolve(1)
            }
        )
    })
}

export default (compiler: any, option: any = {}) => {
    const doIt = webpackDevMiddleware(compiler, option)
    const koaMiddleware = async (ctx: any, next: koa.Next) => {
        const { req } = ctx;
        const locals = ctx.locals || ctx.state    
        ctx.webpack = doIt    
        const runNext = await middleware(
            doIt, 
            req, 
            {
                end(content: any) {
                    ctx.body = content
                },
                locals,
                setHeader() {
                    ctx.set.apply(ctx, arguments)
                },
            }
        )    
        if (runNext) {
            await next()
        }
    }

    Object.keys(doIt).forEach((item: string, index: number) => {
        // @ts-ignore
        (koaMiddleware as any)[item] = doIt[item]
    })

    return koaMiddleware
};