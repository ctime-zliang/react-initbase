export type TCommonResponse<T = any> = {
	ret: number
	msg: string
	data: T | any
	remote?: any
	[key: string]: any
}
