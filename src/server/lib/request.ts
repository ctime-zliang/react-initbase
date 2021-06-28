import request from 'request'
import logger from './simple-logger'

function toString(source: any) {
	try {
		return JSON.stringify(source)
	} catch (e) {
		return String(source)
	}
}

export interface IRquestResponse {
	ret: number
	data: any
	response?: any
}
export const getRequest = async (url: string, data: { [key: string]: any } = {}, extra: { [key: string]: any } = {}): Promise<IRquestResponse> => {
	const defaultHeaders = {
		'content-type': `application/json`,
	}
	return new Promise((resolve, reject) => {
		const option = {
			...extra,
			url: url,
			method: `GET`,
			json: true,
			timeout: 30000,
			headers: {
				...defaultHeaders,
				...(extra.headers || {}),
			},
			qs: data,
		}
		logger.trace(`Request Option ${JSON.stringify(option)}`)
		request(option, (error: any, response: any, body: any) => {
			logger.trace(`Request Response ${toString(body)}`)
			if (!error && response && response.statusCode == 200) {
				resolve({ ret: 0, response, data: body })
				return
			}
			reject({ ret: response ? response.statusCode : -1, response, data: body })
		})
	})
}
export const postRequest = async (url: string, data: { [key: string]: any } = {}, extra: { [key: string]: any } = {}): Promise<IRquestResponse> => {
	const defaultHeaders = {
		'content-type': `application/json`,
	}
	return new Promise((resolve, reject) => {
		const option = {
			...extra,
			url: url,
			method: `POST`,
			json: true,
			timeout: 30000,
			headers: {
				...defaultHeaders,
				...(extra.headers || {}),
			},
			form: data,
		}
		logger.trace(`Request Option ${JSON.stringify(option)}`)
		request(option, (error: any, response: any, body: any) => {
			logger.trace(`Request Response ${toString(body)}`)
			if (!error && response && response.statusCode == 200) {
				resolve({ ret: 0, response, data: body })
				return
			}
			reject({ ret: response ? response.statusCode : -1, response, data: body })
		})
	})
}
