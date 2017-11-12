import Vue from 'vue';
import moment from 'moment';

import template from './forecast.template';
import stateMap from '../../core/state-map';
import { weatherIcon } from '../../core/weather-utils';

export const ForecastComponent = Vue.component('forecast', {
  props: ['forecast', 'temp'],
  template,

  computed: {
    currentTemp() {
      return Math.round(this.forecast.current[this.temp === 'C' ? 'temp_c' : 'temp_f']);
    },
    lowTemp() {
      return Math.round(this.forecast.forecast.forecastday[0].day[this.temp === 'C' ? 'mintemp_c' : 'mintemp_f'])
    },
    highTemp() {
      return Math.round(this.forecast.forecast.forecastday[0].day[this.temp === 'C' ? 'maxtemp_c' : 'maxtemp_f'])
    }
  },

  data() {
    return {
      time: moment(this.forecast.location.localTime).format('dddd Do, MMM YYYY'),
      state: stateMap[this.forecast.location.region] || this.forecast.location.region,
      currentIcon: weatherIcon(this.forecast.current.condition.code, this.forecast.current.is_day)
    }
  }
});