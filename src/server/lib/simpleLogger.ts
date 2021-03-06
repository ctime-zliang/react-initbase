import { formatDates } from '@server/utils/utils'

const TYPE: { [key: string]: any } = {
	TRACE: 'TRACE',
	ERROR: 'ERROR',
	INFO: 'INFO',
}

const write = (type: string, message: any, ucolor: string = ''): void => {
	let color: string = `[34m`
	if (type == TYPE.TRACE) {
		color = color.indexOf('[34m') > -1 ? `[35m` : `[34m`
		ucolor = color
	}
	console.log(`\x1b${ucolor}${formatDates()} [${type}] ${message}\x1b${ucolor}`)
}
const error = (action: any, message: string = ''): void => {
	write(TYPE.ERROR, `[${action}][${typeof message == 'object' ? JSON.stringify(message) : message}]`, `[31m`)
}
const trace = (action: any, message: string = ''): void => {
	write(TYPE.TRACE, `[${action}][${typeof message == 'object' ? JSON.stringify(message) : message}]`)
}
const log = (...args: any[]): void => {
	console.log(args)
}

export default {
	error,
	trace,
	log,
}
