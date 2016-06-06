export default function($stateProvider) {
	"ngInject";

	$stateProvider.state('gettingStarted', {
		url: '/getting-started',
		template: '<getting-started></getting-started>'
	})
};