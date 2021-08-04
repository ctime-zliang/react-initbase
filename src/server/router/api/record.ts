import RecordController from '../../app/controller/record'

const prefixUrl: string = `/api/record`

export default [
	{
		desc: '获取列表',
		method: 'GET',
		path: `${prefixUrl}/fetchList`,
		action: RecordController.invokeAction('fetchList'),
	},
	{
		desc: '添加单项',
		method: 'POST',
		path: `${prefixUrl}/addItem`,
		action: RecordController.invokeAction('addItem'),
	},
	{
		desc: '删除多项',
		method: 'POST',
		path: `${prefixUrl}/delItems`,
		action: RecordController.invokeAction('delItems'),
	},
	{
		desc: '获取单项',
		method: 'GET',
		path: `${prefixUrl}/fetchItem`,
		action: RecordController.invokeAction('fetchItem'),
	},
	{
		desc: '更新单项',
		method: 'POST',
		path: `${prefixUrl}/updateItem`,
		action: RecordController.invokeAction('updateItem'),
	},
]
