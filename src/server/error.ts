import { IExtendKoaContext } from './types/koa-context'

const isErrorWithStatus = (error: any): boolean => {
	if (typeof error['status'] == 'number' && error['error'] && error['error']['stack']) {
		return true
	}
	return false
}

const handleError = (error: any): string => {
	const list: string[] = []
	const statusError: boolean = isErrorWithStatus(error)
	const err: { [key: string]: any } = statusError ? error.error : error
	if (statusError) {
		list.push(`=>>[status]${err.status}`)
	}
	for (let key in err) {
		if (typeof err[key] == 'string') {
			list.push(`=>>[${key}]${err[key]}`)
		}
	}
	list.push(`=>>[stack]${err.stack}`)
	return list.join('\r\n')
}

export default (error: any, ctx: IExtendKoaContext): string => {
	return handleError(error)
}
