const path = require('path')

const devConfig = {
	ptotocol: 'http',
	host: '127.0.0.1',
	port: 12001,
}

module.exports = {
	devConfig,
	devServer: {
		contentBase: path.join(__dirname, './src'),
		disableHostCheck: true,
		host: devConfig.host,
		port: devConfig.port,
		compress: true,
		progress: true,
		hot: true,
		open: false,
		inline: true,
		watchContentBase: true,
		historyApiFallback: true,
		writeToDisk: true,
		headers: {
			Cookie: `sessionKey=webpacdevsessionKey; PATH=/;`,
		},
	},
}
