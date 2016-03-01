module.exports = function() {
	"ngInject";

	let homeCtrl = function(forecastSvc, mapsSvc) {
		"ngInject";

		//forecastSvc.getLocation('2044 E 800 S Spanish Fork, UT');

	};

	let template = `
		<header></header>
		<div>heyo</div>
	`;

	return {
		restrict: 'E',
		controller: homeCtrl,
		controllerAs: 'home',
		template: template
	}

};