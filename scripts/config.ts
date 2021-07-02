export const buildConfig = {
	ssr: {
		defaultPort: 3101,
		defaultHost: `127.0.0.1`,
		nodemon: {
			ignore: ['src', 'scripts', 'config', './*.*', 'build/client', '**/locales', '**/tmp'],
			delay: 100,
		},
	},
}
