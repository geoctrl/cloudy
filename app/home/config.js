module.exports = function($stateProvider, $urlRouterProvider) {
	"ngInject";

	$stateProvider
			.state('home', {
				url: '/',
				template: '<home></home>'
			});

	$urlRouterProvider.otherwise('/')
};