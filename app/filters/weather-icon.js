export default function() {
	return function(condition, isDay) {
		if (condition) {
			switch (condition) {
				case 1003:
					return isDay ? 'wi-day-cloudy' : 'wi-night-alt-cloudy';
			}
		} else {
			return condition;
		}
	}
};