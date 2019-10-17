### vue 组件之间通信
```js
// 父子组件直接通信
$emit
// 爷孙组件通信
子组件可以将 $attrs 完整的传递给孙组件，

// 子组件直接调用父组件方法
// 子组件中使用 $parent 属性可以取到父组件的所有属性和方法
this.$parent

// 父组件调用子组件方法
// 在子组件上添加 ref 属性，这样 this.$refs 中就可以取到子组件的所有属性和方法
<template>
  <Son ref="son"></Son>
</template>
this.$refs.son.say(); // say方法是子组件 son 中定义的方法

// 没有关系的组件之间通信
```

### vue 自定义指令
```js

```
https://cn.vuejs.org/v2/guide/custom-directive.html

### 单页面权限管理
权限管理一般需要控制的有： 是否已登录、 相应页面访问的权限、 页面内按钮的操作权限
```js
// 1、是否已登录
// 在router.js 中使用全局的路由卫士，
router.beforeEach((to, from, next) => {
  // 判断是否有已登录的token存cookie，
  // 每次路由解析前根据token请求用户数据来判断token是否已过期
  // 若没有token 或者 请求数据的接口返回token 过期，则跳登录
  // 然后 next();
})
// 2、菜单权限
// 动态插入设置router
router.addRoutes(routerArr)
// 3、页面上的按钮等内容的展示和操作
// 在路由的meta属性传入参数，这样在页面的路由守卫内能取到meta属性来判断权限
```

### vue实现思想（数据双向绑定， vue.component）
### vue 编译过程
https://qiaoshi123.github.io/harvester-offer/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E4%B9%8B%E9%81%93/21-Vue%20%E5%B8%B8%E8%80%83%E8%BF%9B%E9%98%B6%E7%9F%A5%E8%AF%86%E7%82%B9.htm
### vue响应式原理
https://juejin.im/post/5bce6a26e51d4579e9711f1d  
https://qiaoshi123.github.io/harvester-offer/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E4%B9%8B%E9%81%93/21-Vue%20%E5%B8%B8%E8%80%83%E8%BF%9B%E9%98%B6%E7%9F%A5%E8%AF%86%E7%82%B9.htm
### Vue为什么不能检测数组变动
Object.defineProperties 的 set 不会触发
maybe是 可能是因为数组每一项的修改都需要修改数值、然后修改下标。如果插入一条数据，可能会影响后边的数据都要来一边修改。
### render函数原理
https://juejin.im/post/5be2f0ae6fb9a049fa0f3dd2
### 虚拟dom 和 diff算法
https://www.cnblogs.com/wind-lanyan/p/9061684.html
### vue插件
原理：  https://juejin.im/post/5bd8fa04e51d45168b64f936
```html
// 开发插件
// plugin.vue
<template>...</template>
<script>
    export default {
        name: 'plugin'
    }
</script>
// plugin.js
import plugin from './plugin.vue'
export default {
    install (Vue, options = {}) {
        Vue.component(plugin.name, plugin)
    }
}

// 使用： 
import plugin from 'plugin.js';
Vue.use(plugin, { someOption: true })
<plugin></plugin>
```

### vue router
http://caibaojian.com/interview-map/frontend/vue.html#vuerouter-%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90
### 单页面进入判断登录
公用入口index.js中判断是否已登录，可以是根据cookie来判断
### css的局部作用域(已 vue 的 scoped 属性为例)
### 组件注册(注意全局注册、局部注册)
局部注册主要是 components
https://cn.vuejs.org/v2/guide/components-registration.html#%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C
### VUEX
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})


// 通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更
store.commit('increment')
console.log(store.state.count) // -> 1
```
https://vuex.vuejs.org/zh/guide/
### NextTick 原理分析
https://qiaoshi123.github.io/harvester-offer/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E4%B9%8B%E9%81%93/21-Vue%20%E5%B8%B8%E8%80%83%E8%BF%9B%E9%98%B6%E7%9F%A5%E8%AF%86%E7%82%B9.htm  
http://caibaojian.com/interview-map/frontend/vue.html#nexttick-%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90   

