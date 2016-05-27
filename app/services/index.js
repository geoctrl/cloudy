import forecastSvc from './forecast-svc';

export default function(app) {
	app.service('forecastSvc', forecastSvc);
};
