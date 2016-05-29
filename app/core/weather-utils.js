import map from './weather-map';

export function icon(code, isDay) {
	return map[code][isDay ? 'day' : 'night'];
}

export function condition(code) {
	return map[code].condition;
}