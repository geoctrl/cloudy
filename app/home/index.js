module.exports = function(app) {
	app.config(require('./config'));
	app.directive('home', require('./home'));
};