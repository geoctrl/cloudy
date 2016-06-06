import state from '../../core/state';

export default function() {
	
	let ctrl = function($scope) {
		"ngInject";

		let vm = this;
		let count = 0;
		vm.state = new state($scope, vm);

		vm.state.set({
			loader: count > 0
		});

		$scope.$on('$appLoad', function(e, status) {
			count = status ? count+1 : count-1;
			vm.state.set({
				loader: count > 0
			});
		});
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