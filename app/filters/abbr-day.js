import moment from 'moment';

export default function() {
	return function(date) {
		if (date) {
			let aMoment = moment(date);
			let localeData = moment.localeData();
			return localeData.weekdaysShort(aMoment);
		} else {
			return date;
		}
	}
}