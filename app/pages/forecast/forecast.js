import state from '../../core/state';
import _find from 'lodash/find';

export default function() {

	let ctrl = function($scope, $state, $stateParams, forecastSvc) {
		"ngInject";

		let vm = this;
		vm.state = new state($scope, vm);
		
		$scope.$watch(() => {
			return forecastSvc.get();
		}, forecasts => {
			vm.state.set({
				forecasts: forecasts,
				selectedPlace: _find(forecasts, place => {
					if ($stateParams.id) {
						return place.id == $stateParams.id;
					} else {
						return place.favorite;
					}
				})
			});
			if (!forecasts.length) {
				$state.go('gettingStarted');
			}
		});
		
		vm.selectForecast = function(id) {
			vm.state.set({
				selectedPlace: _find(vm.state.forecasts, place => place.id == id)
			})
		};
	};
	
	return {
		restrict: 'E',
		replace: true,
		controller: ctrl,
		controllerAs: 'forecast',
		template: `
			<div class="forecast__content">
        <saved-places data="forecast.state.forecasts"
                      selected="forecast.state.selectedPlace"
                      select-forecast="forecast.selectForecast"></saved-places>
        <view-forecast data="forecast.state.selectedPlace"></view-forecast>
			</div>
		`
	};
}