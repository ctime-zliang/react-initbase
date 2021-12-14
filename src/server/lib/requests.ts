import request from 'request'
import logger from '@server/lib/simple-logger'

const toString = (source: any): string => {
	try {
		return JSON.stringify(source)
	} catch (e: any) {
		return String(source)
	}
}

export interface IRquestResponse {
	ret: number
	data: any
	response?: any
	error?: any
}
export const getRequest = async (url: string, data: any = {}, extra: any = {}): Promise<IRquestResponse> => {
	const defaultHeaders = {
		'content-type': `application/json`,
	}
	return new Promise((resolve, reject) => {
		const option: { [key: string]: any } = {
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
				resolve({ ret: 0, response, data: body, error: null })
				return
			}
			resolve({ ret: response ? response.statusCode : -1, response, data: body, error })
		})
	})
}
export const postRequest = async (url: string, data: any = {}, extra: any = {}): Promise<IRquestResponse> => {
	const defaultHeaders = {
		'content-type': `application/json`,
	}
	return new Promise((resolve, reject) => {
		const option: { [key: string]: any } = {
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
				resolve({ ret: 0, response, data: body, error: null })
				return
			}
			resolve({ ret: response ? response.statusCode : -1, response, data: body, error })
		})
	})
}
