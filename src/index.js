import Vue from 'vue';

import './styles/main.scss';
import * as components from './components';
import { svgSymbols } from './components/icons/svg-symbols';

new Vue({
  el: '#app',
  components,
  template:
`<div>
    ${svgSymbols}
    <forecast></forecast>
</div>`
});