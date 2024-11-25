import EventEmitter from 'events'
import Response, { TResponse } from '@server/lib/Response'
import httpStatus from '@server/lib/httpStatus'
import { TExtendKoaContext } from '@/server/types/koaContext'

const defaultOptions = {
	controllerName: 'controller',
}
class Controller extends EventEmitter {
	options: any
	constructor(options: { [key: string]: any }) {
		super()
		this.options = {
			...defaultOptions,
			...options,
		}
	}

	_decorator(fn: Function): (ctx: TExtendKoaContext) => Promise<Response> {
		return async (ctx: TExtendKoaContext): Promise<Response> => {
			const res: Response = new Response()
			/* 设置 Res 的初始状态 */
			res.setStatus(httpStatus.Ok.status).setMessage('').setRetCode(0).setData(null)
			await fn.call(this, ctx, res)
			return res
		}
	}

	/**
	 * 代理执行某个 action
	 * @param {string} actionName action 的名字
	 * @return {function} (ctx, next) => {}
	 */
	invokeAction(actionName: string): (ctx: TExtendKoaContext) => Promise<void> {
		const func: () => void = (this as any)[actionName]
		if (typeof func !== 'function') {
			throw new ReferenceError(`${this.options.controllerName} ${actionName} action non-existent`)
		}
		return async (ctx: TExtendKoaContext): Promise<void> => {
			ctx.controller = {
				...this.options,
				actionName,
			}
			try {
				const res: TResponse = await this._decorator(func).call(this, ctx)
				res.flush(ctx)
			} catch (e: any) {
				const res: TResponse = new Response()
				res.setStatus(httpStatus.ServerError.status).setMessage(httpStatus.ServerError.message).flush(ctx)
				ctx.app.emit('error', e)
			}
		}
	}
}

export default Controller
