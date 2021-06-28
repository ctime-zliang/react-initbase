module.exports = {
	plugins: [
		require('postcss-import')(),
		require('postcss-nested')(),
		require('postcss-flexbugs-fixes')(),
		require('postcss-preset-env')(),
		require('postcss-custom-properties')(),
		require('postcss-assets')(),
	],
	sourceMap: true,
}
