export type TBasePageConfig = {
	pageIndex: number
	pageSize: number
	countTotal?: number
}
export const basePageConfig = {
	pageIndex: 1,
	pageSize: 5,
	countTotal: 0,
}

export type TBaseFormConfig = {
	keywords: string
}
export const baseFormConfig = {
	keywords: ``,
}
