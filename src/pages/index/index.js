// import './index.less';
import '../../assets/less/base.less'

import { e, fn2 } from '../../utils/export.plus';
import { b, fn1 } from '../../utils/export.test';
// import('../../utils/export.test');

fn2();
console.log(b);

// import * as plus from './common/export.plus';
// console.log(plus);
// console.log(plus.default);

// import { count } from '../../utils/export.plus';
// setTimeout(() => {
//   console.log('count is ' + count + 'in es6')
// }, 1000);

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