export interface IBaseEditFormDataConfig {
	title: string
	content: string
	extra: string
}
export const baseEditFormDataConfig = {
	title: ``,
	content: ``,
	extra: ``,
}
export type BaseEditFormDataConfigType = keyof IBaseEditFormDataConfig

export interface IBaseConfig {
	contentInputElementHeight: number
}
export const baseConfig = {
	contentInputElementHeight: 350,
}
