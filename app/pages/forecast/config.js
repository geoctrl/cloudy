export default function($stateProvider) {
	$stateProvider.state('forecast', {
		name: 'forecast',
		url: '/forecast',
		template: '<forecast></forecast>'
	})
};