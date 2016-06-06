import state from '../../core/state';

export default function() {

	let ctrl = function($scope, forecastSvc, $state) {
		"ngInject";

		if (forecastSvc.get().length) {
			$state.go('forecast')
		}

		let vm = this;
		vm.state = new state($scope, vm);
		vm.state.set({
			term: ''
		});
		vm.searchCb = forecastSvc.getLocation;

		vm.sdOptions = {
			displayVal: 'name',
			selectCb: function(item, term) {
				vm.state.set({
					term: `${item.lat},${item.lon}`
				});
			}
		};
		
		vm.addPlace = function() {
			if (vm.state.term) {
				forecastSvc.addPlace(vm.state.term, true);
				$state.go('forecast');
			}
		}
	};
	
	return {
		restrict: 'E',
		replace: true,
		controller: ctrl,
		controllerAs: 'gettingStarted',
		template: `
			<div class="getting-started">
				<div class="getting-started__logo">
					<i class="wi wi-cloudy"></i>
					<span>Cloudy</span>
				</div>
				<div class="getting-started__container">
					<h4>Getting Started</h4>
					<p class="mb-lg">Cloudy is a simple weather app that uses the <strong>APIXU</strong> weather API to view weather for your favorite places.</p>
					<div class="search-dropdown" search-dropdown="gettingStarted.searchCb" sd-options="gettingStarted.sdOptions">
						<input class="form-control sd-search" type="text" sd-search placeholder="Add a forecast">
						<div class="sd-dropdown" sd-dropdown style="background-color: #fff;">
							<div class="sd-dropdown__ready">
								Type to Search
							</div>
							<ul class="list-select sd-dropdown__has-data">
								<li ng-repeat="item in results track by $index"
										ng-class="{active: sdSelected==$index}"
										ng-mouseover="sdUpdateSelected($index)">
									<a ng-click="sdSelect(item)">{{item.name}}</a>
								</li>
							</ul>
							<div class="sd-dropdown__no-data">
								No Data
							</div>
							<div class="sd-dropdown__error">
								Whoops... There was an error
							</div>
						</div>
					</div>
					<div class="text-right mt-lg">
						<button class="btn btn-primary"
										ng-disabled="!gettingStarted.state.term"
										ng-click="gettingStarted.addPlace()">
							Add Place
						</button>
					</div>
				</div>
			</div>
		`
	};
}