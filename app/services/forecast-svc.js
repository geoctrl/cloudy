import * as api from '../core/api';
import _forEach from 'lodash/forEach';
import _merge from 'lodash/merge';

let SAVED_PLACES = 'cloudy.savedPlaces';

export default function($rootScope, localStorageService) {
	"ngInject";

	let savedPlaces = [],
			activePlace = null,
			cachedSavedPlaces = {
				timestamp: null,
				data: []
			};

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


	return {
		selectForecast(term) {
			_forEach(savedPlaces, (place, i) => {
				if (place.term == term) {
					place.active = true;
					cachedSavedPlaces.data[i].active = true;
					activePlace = cachedSavedPlaces.data[i];
				} else {
					place.active = false;
					cachedSavedPlaces.data[i].active = false;
				}
			});
		},

		selectedForecast() {
			return activePlace;
		},

		/**
		 * get saved places
		 * 
		 */
		getAllForecasts() {
			// start load
			$rootScope.$broadcast('$appLoad');

			// use cached places unless call is 1 hour old
			if (cachedSavedPlaces.timestamp && (((Math.round(Date.now()/1000)))-cachedSavedPlaces.timestamp)<3600) {
				return Promise.resolve(cachedSavedPlaces.data);
			} else {
				return getSavedPlaces()
						.then(
								res => {
									savedPlaces = res;
									return Promise.all(res.map(place => {
										return getForecast(place.term);
									}));
								}
						).then(
								res => {
									_forEach(res, (place, i) => {
										if (!activePlace) {
											savedPlaces[i].active = savedPlaces[i].favorite;
										}
										_merge(place, savedPlaces[i]);
									});

									activePlace = res.filter(place => {
										return place.active;
									})[0];

									cachedSavedPlaces = {
										data: res,
										timestamp: Math.round(Date.now()/1000)
									};
									return res;
								}
						);
			}
		},

		/**
		 * Get Location
		 * @param location
		 * @returns {Promise} list of possible locations
		 */
		getLocation(location) {
			return api.mock.get(`/search.json`, {
				params: { q: location }
			}).then(res => res.data);
		}
	};
};