import MainController from '@server/app/controller/main'

const prefixUrl: string = `/api`

export default [
	{
		desc: '测试 API',
		method: 'GET',
		path: `/api/rtest`,
		action: MainController.invokeAction('rtest'),
	},
]
