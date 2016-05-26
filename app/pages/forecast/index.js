import config from './config';
import forecast from './forecast';

export default function(app) {
	app.config(config);
	app.directive('forecast', forecast);
};