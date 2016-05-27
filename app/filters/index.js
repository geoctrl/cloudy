import weatherIcon from './weather-icon';

export default function(app) {
	app.filter('wi', weatherIcon);
};