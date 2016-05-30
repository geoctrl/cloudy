import state from '../../core/state';

export default function() {
	
	let ctrl = function($scope, forecastSvc) {
		"ngInject";

		let vm = this;
		vm.state = new state($scope, vm);

		function getForecasts() {
			vm.state.set({
				loader: true
			});
			vm.loader = true;
			forecastSvc.getAllForecasts().then(
					res => {
						vm.state.set({
							loader: false
						});
					}
			);
		}

		$scope.$on('$appLoad', function() {
			if (!vm.loader) getForecasts();
		});

		getForecasts();
	};
	
	let template = `
		<div class="app-loader" ng-class="{active: appLoader.state.loader}"><div class="load"></div></div> 
	`;
	
	return {
		restrict: 'E',
		replace: true,
		controller: ctrl,
		controllerAs: 'appLoader',
		template: template
	};
};