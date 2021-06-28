import fs from 'fs'

export async function sleep(delay: number = 1000) {
	return new Promise((_, reject) => {
		setTimeout(_, delay)
	})
}

interface IGetAssetsPathsList {
	css: string[]
	js: string[]
}
export const getAssetsPathsList = (manifestFileUrl: string): IGetAssetsPathsList => {
	const result: IGetAssetsPathsList = {
		css: [],
		js: [],
	}
	try {
		if (!fs.existsSync(manifestFileUrl)) {
			throw new Error(`manifest file is not exist!`)
		}
		const content = JSON.parse(fs.readFileSync(manifestFileUrl, 'utf-8'))
		const cssChunks: string[] = []
		const cssNormal: string[] = []
		const jsChunks: string[] = []
		const jsNormal: string[] = []
		Object.keys(content).forEach((item: string | any, index: number): void => {
			if (/.css$/i.test(item)) {
				if (/\/chunk/i.test(content[item])) {
					cssChunks.push(content[item])
					return
				}
				cssNormal.push(content[item])
				return
			}
			if (/.js$/i.test(item)) {
				// if (/\/chunk/i.test(content[item])) {
				// 	jsChunks.push(content[item])
				// 	return
				// }
				jsNormal.push(content[item])
				return
			}
		})
		result.css = [...cssChunks, ...cssNormal]
		result.js = [...jsChunks, ...jsNormal]
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
