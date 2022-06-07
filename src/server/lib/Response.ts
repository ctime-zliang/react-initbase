import httpStatus from './httpStatus'
import { TExtendKoaContext } from '@/server/types/koaContext'

export type TResponse = Response

class Response {
	data: any
	msg: string
	status: number
	retCode: number
	_keepJSON: boolean
	constructor() {
		this.data = null
		this.msg = ''
		this.status = 200
		this.retCode = 0
		this._keepJSON = false
	}

	setStatus(status: number = 200): TResponse {
		this.status = status
		return this
	}

	setRetCode(retCode: number = 0): TResponse {
		this.retCode = retCode
		return this
	}

	setMessage(message: string): TResponse {
		this.msg = message
		return this
	}

	setData(data: any = null): TResponse {
		this.data = data
		return this
	}

	setKeepJSON(toggle: boolean = false): TResponse {
		this._keepJSON = toggle
		return this
	}

	flush(ctx: TExtendKoaContext): TResponse {
		if (this.status === httpStatus.Ok.status) {
			ctx.status = httpStatus.Ok.status
			ctx.body = JSON.stringify({
				ret: this.retCode,
				msg: this.msg,
				data: this.data,
				time: Date.now(),
			})
			return this
		}
		ctx.status = this.status
		if (this._keepJSON) {
			ctx.body = JSON.stringify({
				ret: this.retCode,
				msg: this.msg,
				data: this.data,
				time: Date.now(),
			})
			return this
		}
		ctx.body = this.msg
		return this
	}
}

export default Response
