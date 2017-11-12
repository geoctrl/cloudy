import Vue from 'vue';

import './styles/main.scss';
import * as components from './components';
import { svgSymbols } from './components/icons/svg-symbols';
import { buildForecasts } from './core/forecast.service';

new Vue({
  el: '#app',
  components,
  template:
`<div class="app-container">
    ${svgSymbols}
    <vue-glide :count="forecasts.length">
        <forecast v-for="(forecast, i) in forecasts"
                  :key="i"
                  :temp="temp"
                  :forecast="forecast"
                  :style="{transform: 'translateX('+(i*width)+'px)'}">
        </forecast>
    </vue-glide>
</div>`,

  mounted() {
    window.addEventListener('resize', this.resize);
    buildForecasts().then(
        res => this.forecasts = res
    );
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },

  data() {
    return {
      width: document.body.clientWidth,
      forecasts: [],
      temp: 'C'
    }
  },

  methods: {
    resize() {
      this.width = document.body.clientWidth;
    }
  }
});