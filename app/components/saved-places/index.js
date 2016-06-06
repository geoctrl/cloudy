import state from '../../core/state';
import _findIndex from 'lodash/findIndex';

export default function() {
	let ctrl = function($scope, forecastSvc, $stateParams) {
		"ngInject";

		let vm = this;
		vm.state = new state($scope, vm);

		$scope.$watch(() => {
			return vm.data;
		}, data => {
			vm.state.set({
				data: data,
				selectedIndex: _findIndex(forecastSvc.get(), place => {
					if ($stateParams.id) {
						return place.id == $stateParams.id;
					} else {
						return place.favorite;
					}
				})
			});
		});

		vm.select = function(id) {
			vm.state.set({
				selectedIndex: _findIndex(forecastSvc.get(), place => place.id == id)
			});
			vm.selectForecast()(id);
		};
	};
	
	let template = `
		<div class="saved-places">
			<add-place></add-place>
			<div class="saved-places__box">
				<div class="place" ng-repeat="place in savedPlaces.data track by $index"
						 ng-class="{active: $index == savedPlaces.state.selectedIndex}"
						 ng-click="savedPlaces.select(place.id)">
					<div class="place__weather">
						<i class="wi {{place.current.condition.code | wi: place.current.is_day}}"></i>
					</div>
					<div class="place__temp">
						<span>
							{{place.current.temp_f | number: 0}}
						</span>
						<i class="wi wi-degrees"></i>
					</div>
					<div class="place__title ellipsis">
						{{place.location.name}}, {{place.location.region}}
					</div>
				</div>
			</div>
		</div>
	`;
	
	return {
		restrict: 'E',
		replace: true,
		scope: {
			data: '=',
			selectForecast: '&',
			selected: '='
		},
		controller: ctrl,
		controllerAs: 'savedPlaces',
		bindToController: true,
		template: template
	};
};