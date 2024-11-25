const nodeExternals = require('webpack-node-externals')

module.exports = type => {
	return {
		client: {},
		server: [
			nodeExternals({
				allowlist: /\.css|less|.sass|.scss$/,
			}),
		],
	}[type]
}
