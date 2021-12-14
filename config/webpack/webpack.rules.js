const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const paths = require('./webpack.paths')

const cssLoaderOptions = {
	esModule: false,
	// minimize: false,
	import: true,
	url: true,
	// camelCase: false,
	sourceMap: true,
	// root: `.`
}

const cssLoaderModuleOptions = {
	...cssLoaderOptions,
	modules: {
		mode: 'local',
		localIdentHashSalt: `hash`,
		localIdentHashFunction: `md4`,
		localIdentHashDigest: `base64`,
		localIdentContext: path.resolve(__dirname, `../../src`),
		localIdentName: `[name]_-[hash:base64:8]`,
		// exportLocalsConvention: `camelCase`,
		namedExport: false,
	},
}

const lessLoaderOptions = {
	sourceMap: true,
	webpackImporter: true,
	// lessOptions: {
	//     strictMath: false,
	// }
	lessOptions(loaderContext) {
		return {
			javascriptEnabled: true,
			strictMath: false,
		}
	},
}

const miniCssExtractPluginLoaderOption = {
	/* 
		设置 CSS 引用资源文件的前置路径
			将导致 CSS 代码内对资源的引用路径变成: `${publicPath}/${filename}`
	*/
	// publicPath: `../assets-images/`,
	publicPath: `../`,
}

const jsxBabelLoader = {
	test: /\.js[x]?$/,
	exclude: /node_modules/,
	use: [
		{
			loader: `babel-loader`,
		},
	],
}

const tsxBabelLoader = {
	test: /\.ts[x]?$/,
	exclude: /node_modules/,
	use: [
		{
			loader: `babel-loader`,
		},
	],
}

const jsxEsbuildLoader = {
	test: /\.(js|jsx)$/,
	// exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'jsx',
		target: 'es2015',
		jsxFactory: 'React.createElement',
		jsxFragment: 'React.Fragment',
	},
}

const tsxEsbuildLoader = {
	test: /\.(ts|tsx)$/,
	// exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'tsx',
		target: 'es2015',
		jsxFactory: 'React.createElement',
		jsxFragment: 'React.Fragment',
	},
}

const clientLessLoader = {
	test: /\.less$/,
	exclude: /\.module\.less$/,
	use: [
		{
			loader: `css-hot-loader`,
		},
		{
			loader: MiniCssExtractPlugin.loader,
			options: miniCssExtractPluginLoaderOption,
		},
		{
			loader: `css-loader`,
			options: cssLoaderOptions,
		},
		{
			loader: `postcss-loader`,
		},
		{
			loader: `less-loader`,
			options: lessLoaderOptions,
		},
	],
}

const clientLessModuleLoader = {
	test: /\.module\.less$/,
	use: [
		{
			loader: `css-hot-loader`,
		},
		{
			loader: MiniCssExtractPlugin.loader,
			options: miniCssExtractPluginLoaderOption,
		},
		{
			loader: `css-loader`,
			options: cssLoaderModuleOptions,
		},
		{
			loader: `postcss-loader`,
		},
		{
			loader: `less-loader`,
			options: lessLoaderOptions,
		},
	],
}

const clientCssLoader = {
	test: /\.css$/,
	exclude: /\.module\.css$/,
	use: [
		{
			loader: `css-hot-loader`,
		},
		{
			loader: MiniCssExtractPlugin.loader,
			options: miniCssExtractPluginLoaderOption,
		},
		{
			loader: `css-loader`,
			options: cssLoaderOptions,
		},
		{
			loader: `postcss-loader`,
		},
	],
}

const clientCssModuleLoader = {
	test: /\.module\.css$/,
	use: [
		{
			loader: `css-hot-loader`,
		},
		{
			loader: MiniCssExtractPlugin.loader,
			options: miniCssExtractPluginLoaderOption,
		},
		{
			loader: `css-loader`,
			options: cssLoaderModuleOptions,
		},
		{
			loader: `postcss-loader`,
		},
	],
}

const serverLessLoader = {
	test: /\.less$/,
	exclude: /\.module\.less$/,
	use: [
		{
			loader: `css-hot-loader`,
		},
		{
			loader: `isomorphic-style-loader`,
		},
		{
			loader: `css-loader`,
			options: cssLoaderOptions,
		},
		{
			loader: `postcss-loader`,
		},
		{
			loader: `less-loader`,
			options: lessLoaderOptions,
		},
	],
}

const serverLessModuleLoader = {
	test: /\.module\.less$/,
	use: [
		{
			loader: `css-hot-loader`,
		},
		{
			loader: `isomorphic-style-loader`,
		},
		{
			loader: `css-loader`,
			options: cssLoaderModuleOptions,
		},
		{
			loader: `postcss-loader`,
		},
		{
			loader: `less-loader`,
			options: lessLoaderOptions,
		},
	],
}

const serverCssLoader = {
	test: /\.css$/,
	exclude: /\.module\.css$/,
	use: [
		{
			loader: `css-hot-loader`,
		},
		{
			loader: `isomorphic-style-loader`,
		},
		{
			loader: `css-loader`,
			options: cssLoaderOptions,
		},
		{
			loader: `postcss-loader`,
		},
	],
}

const serverCssModuleLoader = {
	test: /\.module\.css$/,
	use: [
		{
			loader: `css-hot-loader`,
		},
		{
			loader: `isomorphic-style-loader`,
		},
		{
			loader: `css-loader`,
			options: cssLoaderModuleOptions,
		},
		{
			loader: `postcss-loader`,
		},
	],
}

const clientImageLoader = {
	test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	loader: 'url-loader',
	options: {
		limit: 8192,
		esModule: false,
		outputPath: paths.common.loader.imagesOutputPath,
		name: paths.common.loader.imagesFilename,
	},
}

const serverImageLoader = {
	test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	loader: 'url-loader',
	options: {
		limit: 8192,
		esModule: false,
		outputPath: paths.common.loader.imagesOutputPath,
		name: paths.common.loader.imagesFilename,
	},
}

const clientFileLoader = {
	test: /\.(woff|eot|ttf|svg|gif)$/,
	loader: 'url-loader',
	options: {
		limit: 8192,
		esModule: false,
		outputPath: paths.common.loader.fileOutputPath,
		name: paths.common.loader.filename,
	},
}

const serverFileLoader = {
	test: /\.(woff|eot|ttf|svg|gif)$/,
	loader: 'url-loader',
	options: {
		limit: 8192,
		esModule: false,
		outputPath: paths.common.loader.fileOutputPath,
		name: paths.common.loader.filename,
	},
}

module.exports = type => {
	return {
		client: [
			{
				oneOf: [
					jsxEsbuildLoader,
					tsxEsbuildLoader,
					clientLessModuleLoader,
					clientLessLoader,
					clientCssModuleLoader,
					clientCssLoader,
					clientImageLoader,
					clientFileLoader,
				],
			},
		],
		server: [
			{
				oneOf: [
					jsxEsbuildLoader,
					tsxEsbuildLoader,
					serverLessModuleLoader,
					serverLessLoader,
					serverCssModuleLoader,
					serverCssLoader,
					serverImageLoader,
					serverFileLoader,
				],
			},
		],
	}[type]
}
