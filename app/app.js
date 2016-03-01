// require app styles
require('./sass/main.scss');

// require vendor dependencies
let angular = require('angular');
require('angular-ui-router');
require('svg-icons');
require('./components/angular-ui-bootstrap/ui-bootstrap-custom-tpls-0.13.4');
require('angular-local-storage');

// init app
let app = angular.module('cloudyApp', [
	'ui.router',
	'ui.bootstrap',
	'svg-icons',
	'LocalStorageModule'
]);

// core app
require('./core')(app);
require('./services')(app);

// components and pages
require('./components')(app);
require('./home')(app);



// core config
app.config(function($locationProvider) {
	"ngInject";
	$locationProvider.html5Mode(true);
});