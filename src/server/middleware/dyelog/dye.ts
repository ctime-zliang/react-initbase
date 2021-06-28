const MAX_LENGTH = 9900
const SPLIT_LINE = `>>> ==================================================`
const PREFIX_TAG = `DYE_KOALOG|`
const zeroize = (num, width) => {
	const s = String(num)
	const len = s.length
	return len >= width ? s : '000000'.slice(len - width) + s
}
const getTime = () => {
	var now = new Date()
	var HH = zeroize(now.getHours(), 2)
	var mm = zeroize(now.getMinutes(), 2)
	var ss = zeroize(now.getSeconds(), 2)
	var msec = zeroize(now.getTime() % 1000, 3)
	return HH + ':' + mm + ':' + ss + ' ' + msec
}
const substring = body => {
	return (body || '').substr(0, MAX_LENGTH)
}
const trim = (string = '') => {
	if (String.prototype.trim) {
		return String.prototype.trim.call(string)
	}
	return string.replace(/(^\s*)|(\s*$)/g, '')
}

const debug = (ctx, msg) => {
	msg = getTime() + '|DEBUG|' + msg
	this.log('debug', ctx, msg)
}
const info = (ctx, msg) => {
	msg = getTime() + '|INFO|' + msg
	this.log('info', ctx, msg)
}
const warn = (ctx, msg) => {
	msg = getTime() + '|WARN|' + msg
	this.log('warn', ctx, msg)
}
const error = (ctx, msg) => {
	msg = getTime() + '|ERROR|' + msg
	this.log('error', ctx, msg)
}
const log = (type, ctx, msg) => {
	msg = type + '|' + msg
	if (ctx && ctx.request && !ctx._logs) {
		ctx._logs = []
		ctx._logs.push(msg)
	} else if (ctx.request && ctx._logs) {
		ctx._logs.push(msg)
	}
}
const handleDyeLog = (ctx, debug = true) => {
	ctx._logs = ctx._logs || []

	/* ... */
	const header = []
	if (ctx.request) {
		header.push('request url: ' + `${ctx.request.protocol}://${ctx.request.host}${ctx.request.url}`)
		const headerObj = {}
		Object.keys(ctx.request.headers).forEach((item, index) => {
			headerObj[item] = ctx.request.headers[item] || ''
		})
		header.push('request headers: ' + JSON.stringify(headerObj))
		if (ctx.request.method.toUpperCase() == 'POST' && ctx.request.body) {
			header.push('request body: ' + JSON.stringify(ctx.request.body))
		}
	}
	ctx._logs.unshift(header)
	ctx._logs.unshift(SPLIT_LINE)

	/* ... */
	const footer = []
	const body = String(ctx.response.body || '')
	footer.push('response body: ' + trim(body.replace(/[\n]/g, '')))
	ctx._logs.push(footer)

	/* ... */
	const logsText = substring(PREFIX_TAG + ctx._logs.join('\n'))
	if (debug) {
		console.log(logsText)
	}

	/* ... */
	delete ctx._logs
}

export default {
	handleDyeLog,
	debug,
	info,
	warn,
	error,
	log,
}
