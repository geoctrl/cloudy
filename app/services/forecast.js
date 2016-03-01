import axios from 'axios';

let googleKey = 'AIzaSyA0REJoe7rWwdU-PiMin-xPpiJCyYRjQdI';

module.exports = function() {

	return {
		getLocation(address) {
			return axios.get(`https://maps.googleapis.com/maps/api/geocode/${JSON.stringify(address)}?key=${googleKey}`)
		}
	}
};