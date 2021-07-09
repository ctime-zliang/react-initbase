const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const paths = require('./webpack.paths')

const clientPaths = paths.client
const modulesCssOptions = {
	mode: 'local',
	modules: true,
	localIdentName: '[name]_[local]-[hash:base64:5]',
	minimize: false,
	camelCase: false,
	import: true,
	url: true,
	sourceMap: false,
	importLoaders: 1,
	alias: {},
}

const jsxLoader = {
	test: /\.js[x]?$/,
	exclude: /node_modules/,
	use: 'happypack/loader?id=happyBabelForJSX',
}
const tsxLoader = {
	test: /\.ts[x]?$/,
	exclude: /node_modules/,
	use: 'happypack/loader?id=happyBabelForTSX',
}
const jsxEsbuildLoader = {
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
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
	exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'tsx',
		target: 'es2015',
		jsxFactory: 'React.createElement',
		jsxFragment: 'React.Fragment',
	},
}

const cssLoaderClient = {
	test: /\.css$/,
	exclude: /\.module\.css$/,
	use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
	sideEffects: true,
}
const cssModulesLoaderClient = {
	test: /\.module\.css$/,
	use: [
		'css-hot-loader',
		MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				...modulesCssOptions,
			},
		},
		'postcss-loader',
	],
	sideEffects: true,
}

const lessLoaderClient = {
	test: /\.less$/,
	exclude: /\.module\.less$/,
	use: [
		'style-loader',
		MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				modules: false,
			},
		},
		'less-loader',
	],
	sideEffects: true,
}
const lessModulesLoaderClient = {
	test: /\.module\.less$/,
	use: [
		'css-hot-loader',
		MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				...modulesCssOptions,
			},
		},
		'less-loader',
	],
	sideEffects: true,
}

const cssLoaderServer = {
	test: /\.css$/,
	exclude: /\.module\.css$/,
	use: [
		'isomorphic-style-loader',
		// MiniCssExtractPlugin.loader,
		'css-loader',
		'postcss-loader',
	],
}
const cssModulesLoaderServer = {
	test: /\.module\.css$/,
	use: [
		'isomorphic-style-loader',
		// MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				...modulesCssOptions,
			},
		},
		'postcss-loader',
	],
	sideEffects: true,
}

const lessLoaderServer = {
	test: /\.less$/,
	exclude: /\.module\.less$/,
	use: [
		'isomorphic-style-loader',
		// MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				modules: false,
			},
		},
		'less-loader',
	],
	sideEffects: true,
}
const lessMoudlesLoaderServer = {
	test: /\.module\.less$/,
	use: [
		'isomorphic-style-loader',
		// MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				...modulesCssOptions,
			},
		},
		'less-loader',
	],
	sideEffects: true,
}

const imageLoaderClient = {
	test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	loader: 'url-loader',
	options: {
		limit: 8192,
		name: clientPaths.loader.imagesFilename,
		esModule: false,
	},
}
const fileLoaderClient = {
	test: /\.(woff|eot|ttf|svg|gif)$/,
	loader: 'url-loader',
	options: {
		limit: 8192,
		name: clientPaths.loader.fontsFilename,
		esModule: false,
	},
}

const imageLoaderServer = {
	test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	loader: 'url-loader',
	options: {
		limit: 8192,
		name: clientPaths.loader.imagesFilename,
		esModule: false,
	},
}
const fileLoaderServer = {
	test: /\.(woff|eot|ttf|svg|gif)$/,
	loader: 'url-loader',
	options: {
		limit: 8192,
		name: clientPaths.loader.fontsFilename,
		esModule: false,
	},
}

module.exports = type => {
	return {
		client: [
			{
				oneOf: [
					// jsxLoader,
					// tsxLoader,
					jsxEsbuildLoader,
					tsxEsbuildLoader,
					cssLoaderClient,
					cssModulesLoaderClient,
					lessLoaderClient,
					lessModulesLoaderClient,
					imageLoaderClient,
					fileLoaderClient,
				],
			},
		],
		server: [
			{
				oneOf: [
					// jsxLoader,
					// tsxLoader,
					jsxEsbuildLoader,
					tsxEsbuildLoader,
					cssLoaderServer,
					cssModulesLoaderServer,
					lessLoaderServer,
					lessMoudlesLoaderServer,
					imageLoaderServer,
					fileLoaderServer,
				],
			},
		],
	}[type]
}
