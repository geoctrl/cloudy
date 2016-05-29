export default function() {
	
	let ctrl = function($scope, forecastSvc) {
		"ngInject";

		let vm = this;

		function getForecasts() {
			vm.loader = true;
			forecastSvc.getAllForecasts().then(
					res => {
						// stop loading
						vm.loader = false;
					}
			);
		}

		$scope.$on('$appLoad', function() {
			if (!vm.loader) getForecasts();
		});

		getForecasts();
	};
	
	let template = `
		<div class="app-loader" ng-class="{active: appLoader.loader}"><div class="load"></div></div> 
	`;
	
	return {
		restrict: 'E',
		replace: true,
		controller: ctrl,
		controllerAs: 'appLoader',
		template: template
	};
};