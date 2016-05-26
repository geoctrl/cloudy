import * as api from './api';

export default function(localStorageService) {
	"ngInject";

	let authToken = 'auth.token';

	function interceptReq(config) {
		if(api.isCall(config.url) && localStorageService.get(authToken)) {
			// force auth token
			// config.headers['authorization'] = localStorageService.get(authToken);
		}
		return config;
	}

	function interceptRes(res) {
		if(api.isCall(res.config.url) && res.status === 401) {
			// not logged in
		} else {
			return res;
		}
	}

	api.prod.interceptors.request.use(interceptReq);
	api.prod.interceptors.response.use(null, interceptRes);

	return {
		request: interceptReq,
		response: interceptRes
	};
};