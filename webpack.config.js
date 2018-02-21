const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		'promise-font': './src/promise-font.js',
		'promise-font.min': './src/promise-font.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname),
		library: 'promiseFont',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}]
	},
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};