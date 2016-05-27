var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var prodWeatherPath = './weather-icons/css/weather-icons.min.css';
var devWeatherPath = './sass/weather-icons/css/weather-icons.min.css';

var config = {
	entry: path.resolve(__dirname, 'app', 'app.js'),
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
				test: /.html$/,
				loader: 'raw',
				exclude: [/node_modules/, /lib/]
			},
			{
				test: /.scss$/,
				loader: 'style!css!postcss-loader!sass',
				exclude: [/node_modules/, /lib/]
			},
			{
				test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader : 'file-loader'
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline?removeTags=true&removingTags[]=style',
				exclude: [/node_modules/, /lib/]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			__DEV__: (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV),
			__PROD__: process.env.NODE_ENV === 'production'
		}),
		new HtmlWebpackPlugin({
			template: 'app/index.ejs',
			appMountId: 'cloudy',
			baseHref: process.env.NODE_ENV === 'production' ? '/cloudy/' : '/',
			wiLocation: process.env.NODE_ENV === 'production' ? prodWeatherPath : devWeatherPath
		})

	],
	postcss: function() {
		return [require('autoprefixer')];
	}
};

if (process.env.NODE_ENV === 'development') {

}

if (process.env.NODE_ENV === 'production') {
	config.output.path = path.resolve(__dirname, 'dist');
	// config.devtool = 'source-map';
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
