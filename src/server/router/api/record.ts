import RecordController from '@server/app/controller/record'

export default [
	{
		desc: '获取列表',
		method: 'GET',
		path: `/api/record/fetchList`,
		action: RecordController.invokeAction('fetchList'),
	},
]
