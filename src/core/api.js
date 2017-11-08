import axios from 'axios';

let mockApi = 'http://0.0.0.0:7001/v1';
let devApi = '/v1';
let prodApi = 'http://api.apixu.com/v1';
let responseType = 'json';

let apixuKey = '239e4843d0f546359a1160835163105';

export const weatherApi = axios.create({
  baseURL: prodApi,
  responseType: responseType,
  params: {
    key: apixuKey
  }
});

export const mock = axios.create({
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
export function isCall(url) {
  return url.indexOf(prodApi) > -1;
}