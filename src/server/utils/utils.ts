import fs from 'fs'

export async function sleep(delay: number = 1000) {
	return new Promise((_, reject) => {
		setTimeout(_, delay)
	})
}

interface IGetAssetsPathsList {
	css: string[]
	cssCommons: string[]
	js: string[]
	jsCommons: string[]
}
export const getAssetsPathsList = (manifestFileUrl: string): IGetAssetsPathsList => {
	const result: IGetAssetsPathsList = {
		css: [],
		cssCommons: [],
		js: [],
		jsCommons: [],
	}
	try {
		if (!fs.existsSync(manifestFileUrl)) {
			throw new Error(`manifest file is not exist!`)
		}
		const content = JSON.parse(fs.readFileSync(manifestFileUrl, 'utf-8'))
		Object.keys(content).forEach((item: string | any, index: number): void => {
			if (/.css$/i.test(item)) {
				if (/\.vendor./i.test(content[item])) {
					result.cssCommons.push(content[item])
					return
				}
				result.css.push(content[item])
				return
			}
			if (/.js$/i.test(item)) {
				if (/\.vendor./i.test(content[item])) {
					result.jsCommons.push(content[item])
					return
				}
				result.js.push(content[item])
				return
			}
		})
		return result
	} catch (e) {
		console.log(e)
	}
	return result
}

export const formatDates = (date = new Date(), format: string = 'yyyy-MM-dd HH:ii:ss'): string => {
	let o: any = {
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
