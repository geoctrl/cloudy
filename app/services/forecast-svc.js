import * as api from '../core/api';
import _forEach from 'lodash/forEach';
import _merge from 'lodash/merge';
import _isNull from 'lodash/isNull';

let SAVED_PLACES = 'cloudy.savedPlaces';

export default function($rootScope, localStorageService) {
	"ngInject";

	let forecasts = [],
			savedPlaces = [];

	/**
	 * get forecast
	 * @param q (query)
	 * @returns {Promise}
	 */
	function getForecast(q) {
		return api.prod.get(`/forecast.json`, {
			params: {
				q: q,
				days: 10
			}
		}).then(res => res.data);
	}

	/**
	 * get saved places
	 */
	function getSavedPlaces() {
		return Promise.resolve(localStorageService.get(SAVED_PLACES));
	}

	function genUid() {
		return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
	}


	return {

		/**
		 * get and build forecasts
		 * @returns promise
		 */
		buildForecasts() {
			return getSavedPlaces()
					.then(
							res => {
								if (!_isNull(res) && res.length) {
									savedPlaces = res;
									return Promise.all(res.map(place => {
										return getForecast(place.term);
									}));
								} else {
									return Promise.resolve([]);
								}
							}
					).then(
							res => {
								// empty out forecasts
								let newForecasts = res;
								// create full object with response
								_forEach(newForecasts, (place, i) => {
									_merge(place, savedPlaces[i]);
								});
								forecasts = newForecasts;
								return res;
							}
					);
		},

		/**
		 * get forecasts
		 * @returns {Array}
		 */
		get() {
			return forecasts;
		},

		/**
		 * Get Location
		 * @param location
		 * @returns {Promise} list of possible locations
		 */
		getLocation(location) {
			return api.prod.get(`/search.json`, {
				params: { q: location }
			});
		},

		addPlace(term, favorite) {
			let newId = genUid();
			savedPlaces.push({
				term: term,
				favorite: !!favorite,
				id: newId
			});
			localStorageService.set(SAVED_PLACES, savedPlaces);
			return newId;
		}
	};
};