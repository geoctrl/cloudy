import header from './header';
import savedPlaces from './saved-places';
import appLoader from './app-loader';
import viewForecast from './view-forecast';
import addPlace from './add-place';

import searchDropdown from './search-dropdown/bundle';

export default function(app) {
	app.directive('header', header);
	app.directive('savedPlaces', savedPlaces);
	app.directive('appLoader', appLoader);
	app.directive('viewForecast', viewForecast);
	app.directive('addPlace', addPlace);

	searchDropdown(app);
};
