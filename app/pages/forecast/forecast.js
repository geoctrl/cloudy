import state from '../../core/state';

export default function() {

	let ctrl = function($scope, googleMaps) {

		let vm = this;
		vm.state = new state($scope, vm);

		vm.state.set({
			component: 'loading' // loading | error | ready
		});
		
		googleMaps.load().then(
				res => {
					vm.state.set({
						component: 'ready'
					});
				}
		);

		vm.getCoords = function() {
			googleMaps.getCoords('84660').then(
					res => {
						console.log(res);
					}
			);
		};


	};

	let template = `
		forecast
		<button ng-click="forecast.getCoords()">hey</button>  
	`;

	return {
		restrict: 'E',
		controller: ctrl,
		controllerAs: 'forecast',
		template: template
	};
}