### VUEX
##### 原理
* 在 vuex 插件的 install 方法内混入了下边的方法，这样每个组件就都可以直接取 $store 了。
```js
function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate(){ // 在此钩子函数中执行
      // 由于组件的创建过程是先父后子
      // 把父组件的store属性，放到每个组件的实例上
      if (this.$options.store) {
        this.$store = this.$options.store
      } else {
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}
```
* 导出一个 Store 的class类，获取用户传入的所有属性，即 state、getters、mutations、actions 等，这样用户new 之后，就可以在实例 store 上取到所有数据了
```js
class Store{
  constructor(options) {
    // 获取用户 new 实例传入的所有属性
    // 1、state：
    // 创建Vue的实例， 保证状态更新可以刷新视图
    // 然后重写类的 state 的 get 方法，返回vue实例的属性
    this.vm = new Vue({
      data: {
        state: options.state
      }
    })
    // 2、getters 方法的复制
    let getters = options.getters
    this.getters = {}
    Object.keys(getters).forEach(getterName => {
      Object.defineProperty(this.getters, getterName, {
        get:() => {
          return getters[getterName](this.state)
        }
      })
    })
  }
  get state(){
    // 获取实例上的state属性就会执行此方法
    return this.vm.state
  }
}
```
##### 应用
```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) // 默认执行当前插件的install方法
// 通过 Vuex 中的属性 Store，创建一个 Store 的实例
export default new Vuex.Store({
  state: {
    // 状态，可以理解为 单一数据源
    // 组件内可直接 $store.state 使用
    age: 10
  },
  getters: {
    // 基于 state 的数据处理，不改变state内数据，参数默认是 state
    // 组件内调用方式 $store.getters.getAge
    getAge(state){
      return state.age + 20
    },
    // 通过 return 一个 function 的方式，来传递参数
    getAgeParam: (state) => {
      return (num) => {
          return state.age + num;
      }
  }
  },
  // 更新状态的唯一方式 就是通过 mutation ，异步的也是通过 actions 来调用 mutation
  mutations: {
    // 修改 state 中状态的数据，同步的； 尽量不要使用异步，严格模式时会报错
    // 组件内使用方式是 $store.commit('syncChangeAge',10)
    /**
     * 
     * @param {*} state 默认的参数，值固定是 state
     * @param {*} payload 载荷，即承载的数据 
     */
    syncChangeAge(state, payload){
      // 同步更改状态
      state.age += payload
    }
  },
  actions: {
    asyncChangeAge({commit}, payload){
    // 异步修改 state 中的状态数据，但是最后也是 commit 调用 mutations 内方法来修改state中的数据
    // 组件内使用方式是 $store.dispatch('asyncChangeAge',3)
    // 第一个参数是 store，可以直接解构赋值 commit
      setTimeout(() => {
        commit('syncChangeAge', payload)
      }, 1000)
    }
  }
})
```s