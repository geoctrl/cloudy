import state from '../../core/state';

export default function() {
	let ctrl = function($scope, forecastSvc) {
		"ngInject";

		let vm = this;

		vm.state = new state($scope, vm);
		vm.state.set({
			component: 'loading', // loading | hasData | noData | error
			data: []
		});

		function init() {
			getForecasts();
		}

		function getForecasts() {
			forecastSvc.getAllForecasts().then(
					res => {
						console.log(res);
						vm.state.set({
							data: res
						});
					}
			);
		}

		init();
	};
	
	let template = `
		<div class="saved-places">
			<div class="place" ng-repeat="place in savedPlaces.state.data">
				<div class="place__weather">
					<i class="wi {{place.current.condition.code | wi: place.current.is_day}}"></i>
				</div>
				<div class="place__title">
					{{place.location.name}}, {{place.location.region}}
				</div>
			</div>
		</div>
	`;
	
	return {
		restrict: 'E',
		replace: true,
		controller: ctrl,
		controllerAs: 'savedPlaces',
		template: template
	};
};