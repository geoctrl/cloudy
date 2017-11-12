import axios from 'axios';

let baseURL = 'http://api.apixu.com/v1';
let responseType = 'json';
let key = '239e4843d0f546359a1160835163105';

export const weatherApi = axios.create({
  baseURL,
  responseType,
  params: { key }
});