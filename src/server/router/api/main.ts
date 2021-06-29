import MainController from '../../app/controller/main'

const prefixUrl = `/api`

export default [
	{
		desc: '测试 API',
		method: 'GET',
		path: `${prefixUrl}/rtest`,
		action: MainController.invokeAction('rtest'),
	},
	{
		desc: '测试 API',
		method: 'GET',
		path: `${prefixUrl}/imglist`,
		action: MainController.invokeAction('imglist'),
	},
]
