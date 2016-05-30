import state from '../../core/state';
import _forEach from 'lodash/forEach';
import _cloneDeep from 'lodash/cloneDeep';

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

		function selectForecast(term) {
			let change = true;
			let updatePlaces = _cloneDeep(vm.state.data);
			_forEach(updatePlaces, place => {
				if (term == place.term && place.active && change) {
					change = false;
				} else if (term == place.term && !place.active && change) {
					place.active = change = true;
				} else if (term != place.term && change) {
					place.active = false;
				}
			});
			vm.state.set({
				data: updatePlaces
			});
			return change;
		}

		vm.selectForecast = function(placeTerm) {
			if (selectForecast(placeTerm)) {
				forecastSvc.selectForecast(placeTerm);
			}
		};

		init();
	};
	
	let template = `
		<div class="saved-places">
			<div class="saved-places__add">
				<button>
					<i class="fa fa-plus"></i> Add
				</button>
			</div>
			<div class="saved-places__box">
				<div class="place" ng-repeat="place in savedPlaces.state.data"
						 ng-class="{active: place.active}"
						 ng-click="savedPlaces.selectForecast(place.term)">
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
		controller: ctrl,
		controllerAs: 'savedPlaces',
		template: template
	};
};