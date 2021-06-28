import MainController from '../../app/controller/main'

export default [
	{
		desc: '测试 API',
		method: 'GET',
		path: '/rtest',
		action: MainController.invokeAction('rtest'),
	},
]
