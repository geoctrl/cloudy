module.exports = function(app) {
	app.service('forecastSvc', require('./forecast'));
};