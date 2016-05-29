import template from './view-forecast.html';
import state from '../../core/state';

export default function() {
	
	let ctrl = function($scope, forecastSvc) {

		let vm = this;
		vm.state = new state($scope, vm);

		$scope.$watch(() => {
			return forecastSvc.selectedForecast();
		}, (newVal, oldVal) => {
			if (newVal && newVal != oldVal) {
				vm.state.set({
					data: newVal
				});
			}
		})
	};
	
	return {
		restrict: 'E',
		replace: true,
		controller: ctrl,
		controllerAs: 'vf',
		template: template
	};
};