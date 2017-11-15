module.exports = {
	entry: ["whatwg-fetch", "./src/index.tsx"],
	output: {
		filename: "bundle.min.js",
		publicPath: "/dist",
		path: __dirname + "/dist"
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			{ test: /\.scss$/, loader: "style-loader!css-loader!autoprefixer-loader!sass-loader" },
			{ test: /\.css$/, loader: "style-loader!css-loader!autoprefixer-loader" }
		]
	},
	devServer: {
		inline: true,
		port: 8080
	}
}