import { ICommonResponse } from '@/api/config'

export function createDefaultErrorResponse(ret: number = -1, msg: string = '', data: any = null, __remote: any = null): ICommonResponse<any> {
	return {
		ret,
		msg,
		data,
		__remote,
	}
}

export function createDefaultSuccessResponse(data: any = null, ret: number = 0, msg: string = '', __remote: any = null): ICommonResponse<any> {
	return {
		ret,
		msg,
		data,
		__remote,
	}
}

export async function sleep(delay: number = 1000) {
	return new Promise((_, reject) => {
		setTimeout(_, delay)
	})
}

export function getQueryValueOfUrl(name: string): string {
	let r: string[] | null = window.location.search.substr(1).match(new RegExp('(^|&)' + name + '=([^&]*)(&|$)'))
	return r != null ? unescape(r[2]) : ''
}

export function formatDates(date = new Date(), format: string = 'yyyy-MM-dd HH:ii:ss'): string {
	let o: { [key: string]: any } = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'H+': date.getHours(),
		'h+': date.getHours(),
		'i+': date.getMinutes(),
		's+': date.getSeconds(),
		'q+': Math.floor((date.getMonth() + 3) / 3),
		S: date.getMilliseconds(),
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (let k in o) {
		if (new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
		}
	}
	return format
}

export interface IFindResults {
	index: number
	data: any
}
export function findResults(list: any, key: string, value: any): IFindResults {
	const res = { index: -1, data: {} }
	const len = list.length
	if (len <= 0) {
		return res
	}
	for (let i = len - 1; i >= 0; i--) {
		if (list[i][key] === value) {
			res.index = i
			res.data = list[i]
			return res
		}
	}
	return res
}
