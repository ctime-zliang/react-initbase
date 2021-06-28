export interface IBasePageConfig {
	pageIndex: number
	pageSize: number
	countTotal?: number
}
export const basePageConfig = {
	pageIndex: 1,
	pageSize: 5,
	countTotal: 0,
}

export interface IBaseFormConfig {
	keywords: string
}
export const baseFormConfig = {
	keywords: ``,
}
