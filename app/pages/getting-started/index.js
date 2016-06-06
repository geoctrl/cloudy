import config from './config';
import gettingStarted from './getting-started';

export default function(app) {
	app.config(config);
	app.directive('gettingStarted', gettingStarted);
};