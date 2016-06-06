export default function($stateProvider) {
	"ngInject";

	$stateProvider.state('forecast', {
		url: '/:location',
		template: '<forecast></forecast>',
		params: {
			id: null
		},
		resolve: {
			forecast: function(forecastSvc, $stateParams) {
				"ngInject";
				return forecastSvc.buildForecasts();
			}
		}
	})
};