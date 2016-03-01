import GoogleMapsLoader from 'google-maps';
GoogleMapsLoader.KEY = 'AIzaSyA0REJoe7rWwdU-PiMin-xPpiJCyYRjQdI';

module.exports = function() {
	GoogleMapsLoader.load(google => {
		let geocoder = new google.maps.Geocoder();

		geocoder.geocode({'address': '98387'}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				console.log(results, results[0].geometry.location.lat(), results[0].geometry.location.lng());
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			}
		});
	});
};