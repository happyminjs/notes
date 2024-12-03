import './index.less'

import Vue from 'vue';
import View from './app.vue';
export default new Vue({
  el: '#app',
  render: (h) => {
    return h(View)
  },
  mounted () {
  }
})