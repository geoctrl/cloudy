import header from './header';
import savedPlaces from './saved-places';

export default function(app) {
	app.directive('header', header);
	app.directive('savedPlaces', savedPlaces);
};
