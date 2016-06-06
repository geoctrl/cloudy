import state from '../../core/state';
import Velocity from 'velocity-animate';

export default function() {

	let ctrl = function($scope, forecastSvc, $state) {
		"ngInject";

		let vm = this;
		vm.state = new state($scope, vm);
		vm.state.set({
			term: '',
			active: false
		});
		vm.searchCb = forecastSvc.getLocation;
		
		let btn = document.querySelector('.add-place__btn'),
				search = document.querySelector('.add-place__search');

		vm.sdOptions = {
			displayVal: 'name',
			selectCb: function(item) {
				if (item) {
					vm.state.set({
						term: item.lat && item.lon ? `${item.lat},${item.lon}` : ''
					});
				}
			}
		};

		vm.addPlace = () => {
			if (vm.state.term) {
				let id = forecastSvc.addPlace(vm.state.term);
				vm.toggle();
				$state.go('forecast', {id: id}, {reload: true});
			}
		};

		vm.toggle = () => {
			vm.state.set({
				active: !vm.state.active
			}, function(state) {
				Velocity(btn, {
					opacity: state.active ? 0 : 1
				}, {
					display: state.active ? 'none' : 'block'
				});
				Velocity(search, {
					opacity: state.active ? 1 : 0
				}, {
					display: state.active ? 'block' : 'none'
				});

			});
		};

	};
	
	let template = `
		<div class="add-place">
			<button class="add-place__btn"
					    ng-click="addPlace.toggle();">
				<i class="fa fa-plus"></i> Add
			</button>
			
			<div class="add-place__search">
				<div class="search-dropdown" search-dropdown="addPlace.searchCb" sd-options="addPlace.sdOptions">
					<input class="form-control sd-search" type="text" sd-search placeholder="Add a forecast">
					<div class="sd-dropdown" sd-dropdown style="background-color: #fff;">
						<div class="sd-dropdown__ready">
							Type to Search
						</div>
						<ul class="list-select sd-dropdown__has-data">
							<li ng-repeat="item in results track by $index"
									ng-class="{active: sdSelected==$index}"
									ng-mouseover="sdUpdateSelected($index)">
								<a class="ellipsis" ng-click="sdSelect(item)">{{item.name}}</a>
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
				
				<div class="text-right">
					<button class="btn btn-primary" ng-click="addPlace.addPlace()">Add</button>
					<button class="btn btn-white-line ml-sm" ng-click="addPlace.toggle()">Cancel</button>
				</div>
			</div>
		</div>
	`;

	return {
		restrict: 'E',
		replace: true,
		controller: ctrl,
		controllerAs: 'addPlace',
		template: template
	};
};