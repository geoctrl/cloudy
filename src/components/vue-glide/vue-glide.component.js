import Vue from 'vue';
import Hammer from 'hammerjs';
import Velocity from 'velocity-animate';

import './vue-glide.scss';

export default Vue.component('vueGlide', {
  props: ['count'],
  template:
`<div class="vue-glide">
  <slot></slot>
</div>`,

  data() {
    return {
      index: 0,
      swipe: false,
      animationSpeed: '',
      offset: document.body.clientWidth,
      direction: ''
    }
  },

  mounted() {
    let el = new Hammer(this.$el);

    window.addEventListener('resize', this.resize);

    el.on('swipeleft swiperight', e => {
      let prevPosition = this.position;
      if (e.type === 'swipeleft') {
        if (this.index < this.count-1) {
          this.index++;
          Velocity(this.$el, {
            translateX: [this.position, prevPosition]
          }, { easing: 'easeOutQuart' })
        } else {
          this.index = 0;
          Velocity(this.$el, {
            translateX: [prevPosition-this.offset, prevPosition]
          }, { easing: 'easeOutQuart' });
          Velocity(this.$el, {
            translateX: [0, this.offset]
          }, { easing: 'easeOutQuart' });
        }
      } else {
        if (this.index > 0) {
          this.index--;
          Velocity(this.$el, {
            translateX: [this.position, prevPosition]
          }, { easing: 'easeOutQuart' });
        } else {
          this.index = this.count-1;
          Velocity(this.$el, {
            translateX: [prevPosition+this.offset, prevPosition]
          }, { easing: 'easeOutQuart' });
          Velocity(this.$el, {
            translateX: [this.position, this.position-this.offset]
          }, { easing: 'easeOutQuart' });
        }
      }
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },

  computed: {
    position() {
      return -(this.offset * this.index);
    }
  },

  methods: {
    resize() {
      this.offset = document.body.clientWidth;
      Velocity(this.$el, {
        translateX: this.position
      });
    }
  }
});