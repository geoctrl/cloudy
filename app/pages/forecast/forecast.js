import state from '../../core/state';

export default function() {

	let ctrl = function($scope, forecastSvc) {
		"ngInject";

		let vm = this;
		vm.state = new state($scope, vm);

		vm.state.set({
			component: 'loading' // loading | error | ready
		});

		function init() {
			getForecasts();
		}

		function getForecasts() {
			forecastSvc.getAllForecasts().then(
					res => {
						setTimeout(function() {
							vm.state.set({
								component: 'ready'
							})
						}, 1000);
					}
			);
		}

		init();

	};
	
	return {
		restrict: 'E',
		replace: true,
		controller: ctrl,
		controllerAs: 'forecast',
		template: `
			<div class="forecast__content">
				<div class="message" ng-class="{active: forecast.state.component == 'loading'}">
					<div class="message__icon rotating">
						<i class="wi wi-day-sunny"></i>						
					</div>
					<div class="message__words">
						Assembling your weather
					</div>
				</div>
        <saved-places ng-class="{active: forecast.state.component == 'ready'}"></saved-places>
        <view-forecast ng-class="{active: forecast.state.component == 'ready'}"></view-forecast>
			</div>
		`
	};
}