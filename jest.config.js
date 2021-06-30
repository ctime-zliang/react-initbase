const paths = require('./config/paths')

module.exports = {
	verbose: true,
	testEnvironment: 'jsdom',
	testURL: 'http://localhost',
	transform: {
		'^.+\\.(js|jsx|mjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
		'^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
		'^(?!.*\\.(js|jsx|mjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
	},
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|mjs)$'],
	setupFiles: ['./config/jest/setup.js'],
	collectCoverage: false,
	coverageDirectory: './coverage',
	collectCoverageFrom: ['src/**/*.ts?(x)', '!**/node_modules/**'],
	snapshotSerializers: ['enzyme-to-json/serializer'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	moduleDirectories: [paths.srcClient, paths.srcServer, paths.srcApp, 'node_modules'],
	globals: {},
}
