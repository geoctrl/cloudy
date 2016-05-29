import { condition } from '../core/weather-utils';

export default function() {
	return function(code) {
		if (code) {
			return condition(code);
		} else {
			return code;
		}
	}
};