import header from './header';
import savedPlaces from './saved-places';
import appLoader from './app-loader';
import viewForecast from './view-forecast';

export default function(app) {
	app.directive('header', header);
	app.directive('savedPlaces', savedPlaces);
	app.directive('appLoader', appLoader);
	app.directive('viewForecast', viewForecast);
};
