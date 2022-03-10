export type TBasePageConfig = {
	pageIndex: number
	pageSize: number
	countTotal?: number
}

export type TBaseFormConfig = {
	keywords: string
}

/****************************** ******************************/
/****************************** ******************************/

export const basePageConfig = {
	pageIndex: 1,
	pageSize: 5,
	countTotal: 0,
}

export const baseFormConfig = {
	keywords: ``,
}
