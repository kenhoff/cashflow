/* eslint-env node */

module.exports = {
	entry: "./src/index.jsx",
	output: {
		path: __dirname + "/build/",
		filename: "app.js"
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: "babel", // 'babel-loader' is also a legal name to reference
			query: {
				presets: ["es2015", "react"]
			}
		}, {
			test: /\.json?$/,
			exclude: /(node_modules|bower_components)/,
			loader: "json"
		}]
	},
	devtool: "cheap-module-eval-source-map"
};
