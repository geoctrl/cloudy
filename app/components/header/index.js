export default function() {

	let ctrl = function($rootScope) {
		"ngInject";
		
		let vm = this;
		vm.state = null;
		$rootScope.$on('$stateChangeSuccess', function(e, state) {
			vm.state = state.name;
		});
	};

	let template = `
		<div class="header">
			<div class="container-fluid">
				<i class="header__logo wi wi-cloudy"></i>
				<div class="header__title">
					Cloudy
					<span class="header__title-tagline">
						A Simple Weather App
					</span>
				</div>
				
				<app-loader></app-loader>
				
				<ul class="header__nav">
					<li ng-class="{active: header.state == 'forecast'}">
						<a>My Forecasts</a>
					</li>
					<li ng-class="{active: header.state == 'about'}">
						<a>About</a>
					</li>
				</ul>
			</div>
		</div>
	`;

	return {
		restrict: 'E',
		controller: ctrl,
		controllerAs: 'header',
		template: template
	}
};