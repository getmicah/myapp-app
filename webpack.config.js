var webpack = require('webpack');

module.exports = {
	entry: __dirname + '/src/index.tsx',
	output: {
		filename: 'bundle.min.js',
		path: __dirname + '/lib',
		publicPath: '/lib'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.json']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /(node_modules)/,
				loader: 'awesome-typescript-loader',
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader'
			}
		]
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'react-router-dom': 'ReactRouterDOM',
		'js-cookie': 'Cookies'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true
		})
	],
	devServer: {
		inline: true,
		historyApiFallback: true,
		port: 3000
	}
}