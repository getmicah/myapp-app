module.exports = {
	entry: ["whatwg-fetch", "./src/index.tsx"],
	output: {
		filename: "bundle.min.js",
		publicPath: "/dist",
		path: __dirname + "/dist"
	},

	resolve: {
		// Add ".ts" and ".tsx" as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"]
	},

	module: {
		rules: [
			// All files with a ".ts" or ".tsx" extension will be handled by "awesome-typescript-loader".
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			{ test: /\.scss$/, loader: "style-loader!css-loader!autoprefixer-loader!sass-loader" }
		]
	},
	
	devServer: {
		inline: true,
		port: 8080,
		historyApiFallback: {
			index: './dev.html'
		}
	}
}