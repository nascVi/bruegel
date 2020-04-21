const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

let mainJS = {
	entry: {"main.js": "./src/js/main.js"},
	output: {
		path: path.resolve(__dirname, "./static"),
		filename: "js/bundle.main.[hash].js",
		publicPath: "static/"
	},
	resolve: {
		modules: ["node_modules", "js"]
	},
	optimization: {
		minimizer: [
			new TerserPlugin({terserOptions: {output: {comments: false}}})
		]
	},
	devtool: "source-map",
	plugins: [
		new CleanWebpackPlugin({dry: false, cleanOnceBeforeBuildPatterns: ["js/*"], cleanAfterEveryBuildPatterns: ["js/*"]}),
		// new BundleAnalyzerPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "../index.html"
		})
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			}
		]
	}
};

module.exports = [
	mainJS
];