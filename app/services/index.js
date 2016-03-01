module.exports = function(app) {
	app.service('mapsSvc', require('./maps'));
	app.service('forecastSvc', require('./forecast'));
};