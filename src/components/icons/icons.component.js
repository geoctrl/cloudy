import Vue from 'vue';
import { iconMap } from './svg-symbols';

export const IconsComponent = Vue.component('icon', {
  template: `
    <svg class="icon"
       :class="iconClass"
       x="0px" y="0px"
       xmlns="http://www.w3.org/2000/svg"
       preserveAspectRatio="xMidYMin"
       :viewBox="viewBox">
      <use :xlink:href="baseUrl" />
    </svg>
  `,
  props: ['name'],
  computed: {
    viewBox: function() {
      return iconMap[this.name].viewBox;
    },
    iconClass: function() {
      return 'icon--' + this.name.slice(0, this.name.indexOf('-'))
    },
    baseUrl: function() {
      return  `${document.location.href}#${this.name}`;
    }
  }
});