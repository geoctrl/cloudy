import Vue from 'vue';
import Hammer from 'hammerjs';
import Velocity from 'velocity-animate';

import './vue-glide.scss';

let swipeType = '';
let easing = 'easeOutQuart';
let duration = 400;

export default Vue.component('vueGlide', {
  props: ['count'],
  template:
`<div class="vue-glide">
  <slot></slot>
</div>`,

  data() {
    return {
      index: 0,
      animationSpeed: '',
      offset: document.body.clientWidth,
      direction: ''
    }
  },

  mounted() {
    let el = new Hammer(this.$el);

    window.addEventListener('resize', this.resize);

    el.on('swipeleft swiperight panleft panright panend panup pandown', e => {

      // swipe animation if there's a swipe event
      // or if the user stops panning more then half way through
      if (e.type === 'panend') {
        if (swipeType) {
          this.swipe(e);
        } else if (Math.abs(e.deltaX) > (Math.abs(this.offset/2))) {
          swipeType = e.deltaX > 0 ? 'swiperight' : 'swipeleft';
          this.swipe(e)
        } else {
          this.reset(e);
        }
      }

      // update window movement
      if (e.type === 'panleft' || e.type === 'panright') {
        this.$el.style.transform = `translateX(${(this.index*this.position) + e.deltaX}px)`
      }

      // catch swipe events
      if (e.type === 'swipeleft' || e.type === 'swiperight') {
        swipeType = e.type;
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
    },

    swipe(e) {
      let prevPosition = this.position;
      if (swipeType === 'swipeleft') {
        if (this.index < this.count-1) {
          this.index++;
          Velocity(this.$el, 'stop');
          Velocity(this.$el, {
            translateX: [this.position, prevPosition+e.deltaX]
          }, { easing, duration })
        } else {
          this.index = 0;
          Velocity(this.$el, 'stop');
          Velocity(this.$el, {
            translateX: [prevPosition-this.offset, prevPosition+e.deltaX]
          }, { easing, duration });
          Velocity(this.$el, {
            translateX: [0, this.offset]
          }, { easing, duration });
        }
      } else {
        if (this.index > 0) {
          this.index--;
          Velocity(this.$el, 'stop');
          Velocity(this.$el, {
            translateX: [this.position, prevPosition+e.deltaX]
          }, { easing, duration });
        } else {
          this.index = this.count-1;
          Velocity(this.$el, 'stop');
          Velocity(this.$el, {
            translateX: [(prevPosition*this.index)+this.offset, prevPosition+e.deltaX]
          }, { easing, duration });
          Velocity(this.$el, {
            translateX: [this.position, this.position-this.offset]
          }, { easing, duration });
        }
      }
      swipeType = '';
    },

    reset(e) {
      Velocity(this.$el, 'stop');
      Velocity(this.$el, {
        translateX: [this.position, this.position+e.deltaX]
      });
    }
  }
});