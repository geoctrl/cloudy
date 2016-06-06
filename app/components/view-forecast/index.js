import template from './view-forecast.html';
import state from '../../core/state';

export default function() {
	
	let ctrl = function($scope) {
		"ngInject";

		let vm = this;
		vm.state = new state($scope, vm);

		$scope.$watch(() => {
			return vm.data;
		}, data => {
			vm.state.set({
				data: data
			});
		});
	};
	
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data: '='
		},
		controller: ctrl,
		controllerAs: 'vf',
		bindToController: true,
		template: template
	};
};