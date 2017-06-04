const path = require('path');

module.exports = {
	entry:  './app.js',		
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	devtool: 'eval-source-map',
	module: {
		loaders: [
				{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
}