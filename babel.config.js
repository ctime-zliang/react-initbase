module.exports = api => {
	const isTargetWeb = api.caller(caller => caller && caller.target === 'web')
	const isDev = ['test', 'production'].includes(process.env.NODE_ENV) === false

	api.cache(true)

	return {
		// babelrcRoots: ['.'],
		presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
		plugins: [
			[
				'@babel/plugin-proposal-decorators',
				{
					// loose: false,
					// spec: false,
					legacy: true,
					// useBuiltIns: false
				},
			],
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-transform-runtime',
			'@babel/plugin-transform-modules-commonjs',
			'@babel/plugin-transform-arrow-functions',
			[
				'import',
				{
					libraryName: 'antd',
					style: isTargetWeb ? true : 'less',
				},
			],
		].filter(Boolean),
		env: {
			test: {
				plugins: [
					'@babel/plugin-transform-modules-commonjs',
					'dynamic-import-node',
					[
						'import',
						{
							libraryName: 'antd',
							style: isTargetWeb ? true : 'less',
						},
					],
				],
			},
		},
	}
}
