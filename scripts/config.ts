export const buildConfig = {
	ssr: {
		defaultPort: 3101,
		defaultHost: `127.0.0.1`,
		nodemon: {
			ignore: ['src', 'scripts', 'config', 'doc', 'tests', './*.*', '**/locales', '**/tmp'],
			delay: 200,
		},
	},
}
