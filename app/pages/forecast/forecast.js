import state from '../../core/state';

export default function() {

	let ctrl = function($scope, forecastSvc) {
		"ngInject";

		let vm = this;
		vm.state = new state($scope, vm);

		vm.state.set({
			component: 'loading' // loading | error | ready
		});

		function init() {
			getForecasts();
		}

		function getForecasts() {
			forecastSvc.getAllForecasts();
		}

		init();

	};
	
	return {
		restrict: 'E',
		replace: true,
		controller: ctrl,
		controllerAs: 'forecast',
		template: require('./forecast.html')
	};
}