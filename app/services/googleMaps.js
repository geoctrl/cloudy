import GoogleMapsLoader from 'google-maps';
GoogleMapsLoader.KEY = 'AIzaSyA0REJoe7rWwdU-PiMin-xPpiJCyYRjQdI';

export default function($q) {
	"ngInject";
	
	let google;
	
	return {
		load() {
			return $q(resolve => {
				GoogleMapsLoader.load(g => {
					resolve(g);
					google = g;
				});
			});
		},
		
		getCoords(address) {
			return $q((resolve, reject) => {
				let geocoder = new google.maps.Geocoder();
				geocoder.geocode({'address': address}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						console.log(results[0].formatted_address);
						resolve({
							lat: results[0].geometry.location.lat(),
							lng: results[0].geometry.location.lng()
						});
					} else {
						reject({err: 'Geocode was not successful for the following reason: ' + status});
					}
				});
			});
		}
	};
};