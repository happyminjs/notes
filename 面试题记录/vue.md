### vue 组件之间通信
1、vue 是单向数据流，子元素中不能直接修改父元素数据
2、@sonFn="changeFather" 在vue内实际是给元素绑定了一个属性，即key为 sonFn ，值为 changeFather ，然后在子组件内部用 this.$on('eventname', fn) 方法挂载到自己的实例上，此例则为 this.$on('sonFn', changeFather)


以下都是按组件 ： parent/son1/son2/grandson1/grandson2
* 父子组件**直接通信**: 直接通过props 传递数据， $emit 触发事件
```html
<!-- 在 parent.vue 中 -->
<template>
  <div>
    parent 中
    <son1 :param="param1" @sonFn="changeFather"></son1>
  </div>
</template>
<script>
  import son1 from './son1'
  export default {
    components: {
      son1
    },
    data() {
      return {
        param1: 100
      }
    },
    methods: {
      changeFather (value) {
        this.param1 = value
      }
    }
  }
</script>

<!-- 在 son1 中 -->
<template>
  <div>
    son1 中 {{param}}
    <button @click="sonchange">点击修改</button>
  </div>
</template>
<script>
  export default {
    props {
      param: {
        type: Number,
        default: 1
      }
    },
    methods: {
      sonchange() {
        this.$emit('sonFn', 200);
      }
    }
  }
</script>

<!-- 如果只是数据同步可以这样使用 下边的语法糖 -->
<son1 :param.async="param1"></son1>
<!-- 这样就不用再传递事件了，但是在子元素的事件中需要改写一下 -->
sonchange() {
  this.$emit('updata:param', 200);
}

<!-- 还可以在父组件中这样使用  -->
<!-- 但是有缺陷，子组件中收到的参数就只能叫 value了 -->
<son1 v-model="param1"></son1>
<!-- 实际是 v-model 和 value 的简写语法糖 <input v-model="xxx" value="xxx"> -->
```
* **多层级直接**通信: 主要是使用 $parent, $children
```html
<!-- 在son1 中再引入 孙子组件 grandson1 -->
<grandson1 ></grandson1>

<!-- 在 grandson1 中 -->
<!-- 通过 this.$parent 获取到父亲组件 -->
<button @click="$parent.$emit('sonFn', 400)">点击修改</button>
```
* **层级较多**的时候，我们会封装 dispatch 方法: 只会通知自己的父亲、父亲的父亲 一直到跟组件
```js
// main.js 中封装方法
// 向上通知
Vue.prototype.$dispatch = function(eventname, value) {
  let parent = this.$parent;
  while (parent) {
    parent.$emit(eventname, value);
    parent = parent.$parent
  }
}
// 子组件中调用方法：
this.$dispatch('sonFn', 400)

// 向下通知
Vue.prototype.$broadcast = function (eventname, value) {
  const broadcast = (children) => {
    children.forEach(child => {
      child.$emit(eventname, value);
      if (child.$children) {
        broadcast(child.$children)
      }
    })
  }
  broadcast(this.$children)
}
// 在父组件中调用方法 
this.$broadcast('say', 200); // 子孙组件中有绑定 say 方法的 都执行
```
* 父级给子组件再给孙组件的**较多属性**： 通过 $attrs 取到所有属性,用v-bind传递； 通过 $listeners 取到所有的事件，用v-on传递。
```html
<!-- 父组件中传递给子组件的 -->
<son1 :param1="param1" :param2="param2" :param3="param3" @clickSonFn="clickSonFn"></son1>
<!-- 子组件传递给孙组件 -->
<grandson1 v-bind="$attrs" v-on="$listeners"></grandson1>

<!-- ps：在子组件中如果对父级传入的参数没有接收的话，会默认渲染到子组件元素的 attr 属性上， 可以设置下边的参数防止这个问题 -->
<script>
  export default {
    inheritAttrs: false
  }
</script>

<!-- 孙子节点中可以取到 attrs 和 所有事件 listeners -->
<template>
  <div>
    grandson1 中 {{attrs}}
  </div>
</template>
<script>
  export default {
    mounted() {
      this.$listeners.clickSonFn(); 
    }
</script>
```
* 父组件数据儿孙组件中公用的，但是不用来回传递， 可以选择**注入** : 但是不建议使用
```html
<!-- 父组件中 -->
<script>
  export default {
    provide() {
      return {
        parent: this // 传递共享的参数名字和值
      }
    },
    data() {
      return {
        aa: 11,
        bb: 22
      }
    }
  }
</script>
<!-- 应用的子组件中  -->
<script>
  export default {
    inject: ['parent'],
    mounted() {
      // 子组件中就可以取到了
      console.log(this.parent.aa, this.parent.bb)
    }
  }
</script>
```
* 父组件取子组件的数据： 应用 ref 属性
ref属性在元素上，则获取到的是dom元素；组件上则获取到的组件
```html
<!-- 父组件中 用 子组件数据方法 -->
<template>
  <Son ref="son"></Son>
</template>
<script>
  export default {
    mounted() {
      // 父组件中就可以取到子组件的数据和方法了
      console.log(this.$refs.son) 
    }
  }
</script>
```
* 没有关系的组件之间通信 ： eventBus： 缺陷是 定义到了全局上，如果有同名的事件，都会触发，容易冲突有问题
```js
// main.js 中先定义
Vue.prototype.$bus = new Vue(); //  注意是 new Vue， 为了使用 $on $emit 等方法

// 在绑定事件的组件的js中添加代码
this.$bus.$on('eventname', function(){ 执行逻辑....})

// 触发事件的组件的js中添加代码
this.$nextTick(() => {
  this.$bus.$emit('eventname', value)
})
```


```js
// 父组件调用子组件方法
// 在子组件上添加 ref 属性，这样 this.$refs 中就可以取到子组件的所有属性和方法

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

