const webpack = require("webpack")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: ["whatwg-fetch", "./src/index.tsx"],
	output: {
		filename: "bundle.min.js",
		path: __dirname + "/dist"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader"
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "autoprefixer-loader", "sass-loader"]
				})
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			Promise: "es6-promise-promise",
		}),
		new UglifyJSPlugin(),
		new ExtractTextPlugin({
			filename: "style.css"
		})
	],
	externals: {
		"react": "React",
		"react-dom": "ReactDOM",
		"react-router-dom": "ReactRouterDOM",
		"flux": "Flux",
		"moment": "moment"
	}
}