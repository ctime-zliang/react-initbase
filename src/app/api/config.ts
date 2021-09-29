export interface ICommonResponse<T = any> {
	ret: number
	msg: string
	data: T | any
	remote?: any
	[key: string]: any
}
