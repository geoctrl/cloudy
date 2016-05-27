export default function($stateProvider) {
	"ngInject";

	$stateProvider.state('forecast', {
		name: 'forecast',
		url: '/:location',
		template: '<forecast></forecast>'
	})
};