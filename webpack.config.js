/* eslint-env node */

module.exports = {
	entry: "./src/index.js",
	output: {
		path: __dirname,
		filename: "build/app.js"
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: "style!css"
		}]
	}
};
