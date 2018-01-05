import Vue from 'vue';

export default Vue.component('cloudyHeader', {
  template:
`<div class="header">
    <div class="header__logo">
        <icon name="wi-cloudy"></icon>
        <span>Cloudy App</span>
    </div>
    
    <div class="header-temp">
        <span class="header-temp__btn">C</span>
        <span>/</span>
        <span class="header-temp__btn">F</span>
    </div>
</div>`
})