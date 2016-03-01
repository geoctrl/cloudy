var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var envSettings = new webpack.DefinePlugin({
	__DEV__: (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV),
	__PROD__: process.env.NODE_ENV === 'production'
});

var config = {
	entry: {
		app: path.resolve(__dirname, 'app', 'app.js')
	},
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'ng-annotate!babel?presets[]=es2015',
				exclude: [/node_modules/, /lib/]
			},
			{
				test: /\.json$/,
				loader: 'json',
				exclude: [/node_modules/, /lib/]
			},
			{
				test: require.resolve('angular'),
				loader: 'expose?angular'
			},
			{
				test: /.html$/,
				loader: 'raw',
				exclude: [/node_modules/, /lib/]
			},
			{
				test: /.scss$/,
				loader: 'style!css!postcss-loader!sass',
				exclude: [/node_modules/, /lib/]
			}
		]
	},
	plugins: [envSettings],
	postcss: function() {
		return [require('autoprefixer')];
	}
};

if (process.env.NODE_ENV === 'development') {

}


if (process.env.NODE_ENV === 'production') {
	//config.entry.vendors = [];
	config.output.path = path.resolve(__dirname, 'dist');
	config.devtool = 'source-map';
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
	//config.plugins[0] = new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js');
}

module.exports = config;