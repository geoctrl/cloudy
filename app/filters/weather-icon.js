import { icon } from '../core/weather-utils';
import _isNumber from 'lodash/isNumber';

export default function() {
	return function(code, isDay) {
		if (code && _isNumber(isDay)) {
			return icon(code, isDay);
		} else {
			return code;
		}
	}
};