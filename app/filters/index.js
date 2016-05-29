import weatherIcon from './weather-icon';
import weatherIconCondition from './weather-icon-condition';
import abbrDay from './abbr-day';

export default function(app) {
	app.filter('wi', weatherIcon);
	app.filter('wiCondition', weatherIconCondition);
	app.filter('abbrDay', abbrDay);
};