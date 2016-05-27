import axios from 'axios';

let mockApi = 'http://0.0.0.0:7001/v1';
let devApi = '/v1';
let prodApi = 'http://api.apixu.com/v1';
let responseType = 'json';

let apixuKey = '9d3e385ed0aa47c6a8455150162705';

module.exports.prod = axios.create({
	baseURL: prodApi,
  responseType: responseType,
	params: {
		key: apixuKey
	}
});

module.exports.mock = axios.create({
	baseURL: mockApi,
  responseType: responseType,
	params: {
		key: apixuKey
	}
});

/**
 * prove that api call is actually an "api" call
 * @param url
 * @returns {boolean}
 */
module.exports.isCall = function(url) {
	return url.indexOf(prodApi) > -1;
};