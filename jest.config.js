module.exports = {
	/* 代码编译转换 */
	transform: {
		'^.+\\.[t|j]sx?$': 'babel-jest',
	},
	/* 预执行 */
	setupFiles: ['./config/test.setup.js'],
	/* 测试覆盖率 */
	collectCoverage: false,
	coverageDirectory: './coverage',
	collectCoverageFrom: ['src/**/*.ts?(x)', '!**/node_modules/**'],
	/* 快照 */
	snapshotSerializers: ['enzyme-to-json/serializer'],
	/* 测试对象匹配 */
	testRegex: '(.(test|spec))\\.js?(x)',
	/* 模块文件扩展名匹配 */
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	/* 模块名称配置 */
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': './__test_mocks__/fileMock.js',
		'\\.(css|less|scss)$': 'identity-obj-proxy',
	},
	/* 全局变量 */
	globals: {},
}
