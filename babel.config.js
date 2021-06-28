module.exports = config => {
	const isTargetWeb = config.caller(caller => caller && caller.target === 'web')
	const isDev = ['test', 'production'].includes(process.env.NODE_ENV) === false
	return {
		presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
		plugins: [
			[
				'@babel/plugin-proposal-decorators',
				{
					legacy: true,
				},
			],
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-transform-runtime',
			'@babel/plugin-transform-modules-commonjs',
			[
				'import',
				{
					libraryName: 'antd',
					style: isTargetWeb ? true : 'less',
				},
			],
		].filter(Boolean),
	}
}
