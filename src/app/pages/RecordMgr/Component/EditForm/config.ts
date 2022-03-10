export type TBaseEditFormDataConfig = {
	title: string
	content: string
	extra: string
}

export type TBaseConfig = {
	contentInputElementHeight: number
}

/****************************** ******************************/
/****************************** ******************************/

export const baseEditFormDataConfig: TBaseEditFormDataConfig = {
	title: ``,
	content: ``,
	extra: ``,
}

export const baseConfig = {
	contentInputElementHeight: 350,
}

export const formLayoutConfig: { [key: string]: any } = {
	labelCol: {
		style: { width: '100px' },
	},
	wrapperCol: {
		style: { width: 'calc(100% - 100px)' },
	},
}
