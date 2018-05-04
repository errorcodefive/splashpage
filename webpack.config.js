var path = require('path');
var webpack = require('webpack');

module.exports= {
	mode: 'development',
	entry: './client/index.js',
	output: {
		path: path.join(__dirname, 'client'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['es2015', 'react']
			}
		},
		{
			test: /\.css$/,
			use: "style-loader!css-loader"
		}]
	}
}