module.exports = function() {
	"ngInject";

	let homeCtrl = function(forecastSvc, mapsSvc) {
		//forecastSvc.getLocation('2044 E 800 S Spanish Fork, UT');

	};

	let template = `
		<div>heyo</div>
	`;

	return {
		restrict: 'E',
		controller: homeCtrl,
		controllerAs: 'home',
		template: template
	}

};