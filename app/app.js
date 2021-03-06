// require app styles
import './sass/main.scss';

// require vendor dependencies
import angular from 'angular';
import 'angular-local-storage';
import 'angular-ui-router';
import 'angular-moment';
import 'moment';


// polyfill the Promise global
import Promise from 'es6-promise';
Promise.polyfill();

var app = angular.module('cloudy', [

  // vendor dependencies
  'LocalStorageModule',
  'ui.router',
	'angularMoment'

]);

// app components
import core from './core';
import services from './services';
import components from './components';
import filters from './filters';
import pages from './pages';

core(app);
services(app);
components(app);
filters(app);
pages(app);
