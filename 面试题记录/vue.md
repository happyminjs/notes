### vue 中  computed 的特点
默认 computed 也是一个 watcher，是具备缓存的，只有当依赖的属性发生变化时才会更新视图。   
watch：是一个影响多个  
computed： 是多个影响一个
### vue插件
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
### 组件注册(注意全局注册、局部注册)
局部注册主要是 components
https://cn.vuejs.org/v2/guide/components-registration.html#%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C
### vue 组件
#### 函数组件

#### 模板组件

### 父子组件渲染顺序
* 加载渲染过程
```
父beforeCreate -> 父create -> 父beforeMount -> 子create -> 子beforeMount -> 子mounted -> 父mounted
```
* 子组件更新过程 
```
父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated
```
* 父组件更新过程
```
父beforeUpdate -> 父updated
```
* 销毁过程
```
父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed
```
* 理解
```
组件的调用顺序是先父后子，  渲染完成顺序是先子后父
组件的销毁过程是先父后子，销毁完成顺序是先子后父
```
### vue 组件之间通信
1、vue 是单向数据流，子元素中不能直接修改父元素数据  
2、@sonFn="changeFather" 在vue内实际是给元素绑定了一个属性，即key为 sonFn ，值为 changeFather ，然后在子组件内部用 this.\$on('eventname', fn) 方法挂载到自己的实例上，此例则为 this.$on('sonFn', changeFather)  
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
* **多层级直接**通信: 主要是使用 \$parent, $children
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
* 父级给子组件再给孙组件的**较多属性**： 通过 \$attrs 取到所有属性,用v-bind传递； 通过 $listeners 取到所有的事件，用v-on传递。
```html
<!-- 父组件中传递给子组件的 -->
<son1 :param1="param1" :param2="param2" :param3="param3" @clickSonFn="clickSonFn"></son1>
<!-- 子组件传递给孙组件 -->
<grandson1 v-bind="$attrs" v-on="$listeners"></grandson1>

<!-- ps：在子组件中如果对父级传入的参数没有接收的话，会默认渲染到子组件元素的 attr 属性上，
可以设置下边的参数防止这个问题 -->
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
* **父组件取子**组件的数据： 应用 ref 属性  
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

### vue 自定义指令
```js
// 全局注册指令 v-focus
Vue.directive('focus', {
  bind:()=>{},
  inserted: function(el){
    el.focus()
  }
})
// 局部指令注册，可在组件options添加 directives 的选项
directives: {
  focus: {
    inserted: function(el){
      el.focus()
    }
  }
}
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
### vue 编译原理
* 1、将 template 模板转换成 ast 语法树 - parseHtml  
```
解析 template 模板，
parseStartTag：
1、正则匹配开始标签<，设置tag，然后字符串截取存值 tag
2、while 循环，看是否是关闭标签 >，若不是则是属性，循环赋值 attrs
3、若是关闭标签 > ,则直接字符串截取删除
```
```json
{
  directives: [ // 指令的数组
    {
      name: 'show',
      rawName: 'v-show',
      value: 'true',
      expression: 'true'
    }
  ],
  type: 1, // 类型
  tag: 'div', // 标签
  attrs: [
    {name: 'id', value: 'idName'},
    {name: 'class', value: 'className'}
  ], // 属性列表
  attrsMap: makeAttrsMap(attrs), // 属性映射
  parent,
  children: [
    {
      type: 1,
      tag: 'p',
      children: [
        {
          type: 3,
          text: 'hello'
        }
      ]
    }
  ]
}
```
* 2、优化树  
* 3、将ast生成render函数代码
```js
// 字符串拼接的形式拼接成 render 函数的字符串 
let render = new Function(`with(this){return _c('div',{attrs:{id:idName}},[_c('p',[_v('hello')])])}`)
return render
// _c 是生成元素node的方法
// _v 是生成 text 的方法
// new Function + with  是模板编译的核心方法
```
* 4、生成的 虚拟dom
https://qiaoshi123.github.io/harvester-offer/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E4%B9%8B%E9%81%93/21-Vue%20%E5%B8%B8%E8%80%83%E8%BF%9B%E9%98%B6%E7%9F%A5%E8%AF%86%E7%82%B9.htm
### render函数原理

### vue响应式原理
1、在模板编译时，碰到模板中的 {{}} 或者 v- 会进行依赖收集，new Watcher    
2、在 observe 使用 Object.defineProperty 将属性进行劫持，数组则是通过重写数组方法来实现的   
```
默认 Vue 初始化数据时，会给data中的属性使用 Object.defineProperty 重新定义所有属性，
当页面取到相应属性时（即 defineProperty 的 get 属性方法），
会进行依赖收集（收集当前组件的watcher）；
如果属性变化（即 defineProperty 的 set 属性方法）,
会执行 notify 通知相关依赖进行更新操作。  
```
```js
class Dep{
  constructor(){
    this.subs = []
  }
  addSub(sub){
    this.subs.push(sub)
  }
  notify(){
    this.subs.forEach(sub=>{
      sub.update()
    })
  }
}
Dep.target = null  // 全局属性，通过此属性配置 Watcher
```
```js
class Watcher {
  constructor(obj, key, cb){
    // 将 Dep.target 指向自己，然后触发属性的getter添加监听，
    // 最后将 Dep.target 置空
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dep.target = null
  }
  update(){
    this.value = this.obj[this.key]
    this.cb(this.value)
  }
}
```
```js
function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  let dp = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      // 将 Watcher 添加到订阅
      if (Dep.target) {
        dp.addSub(Dep.target)
      }
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
      // 执行 watcher 的 update 方法
      dp.notify()
    }
  })
}
```
```js
var a = {aa: '123'}
observe(a)
new Watcher(a, 'aa', function(val){console.log('aaaaa', val)})
a.aa = '456'
// 输出 change value 、 aaaaa 342 
```
### 组件中的 data 为什么是一个函数
同一个组件被复用多次，会创建多个实例，这些实例都是同一个构造函数，如果data是一个对象的话，则所有实例都共享了同一个对象。    
所以为了保证组件的数据独立性，data 函数返回一个对象，可以保证返回的是一个新的对象，不会公用。

### Vue为什么不能检测数组变动
基于性能原因，没有用 Object.defineProperties 对数组的每一项进行拦截，而是选择使用函数劫持的方法重写数组（push、shift、pop、splice、unshift、sort、reverse）方法。当调用这些api时，可以通知依赖更新，如果数组中包含着引用类型，会对数组中的引用类型再次进行监控。   
Object.defineProperties 不能监测到数组通过下标修改，maybe是 可能是因为数组每一项的修改都需要修改数值、然后修改下标。如果插入一条数据，可能会影响后边的数据都要来一边修改。  
可以用Vue.$set来进行处理，其实核心内部用的是splice方法  
### 虚拟dom 
Virtual DOM就是用js对象来描述真实DOM，是对真实DOM的抽象，由于直接操作DOM性能低但是js层的操作效率高，可以将DOM操作转化成对象操作，最终通过diff算法比对差异进行更新DOM
```json
{
  tag: "div",
  props: {
    id: "container",
    style: {}
  },
  children: [
    {
      tag: "div",
      props: {
        id: "child1"
      },
      children: []
    }
  ]
}
```
### v-for 中为什么要用 key
修改dom时，在 diff 算法中比较节点时有用，解决dom复用的问题   
注意：key 最好不要用索引，要用数据固定属性
### diff算法
* 1、先同级比较 再比较子节点   
* 2、先判断一方有没有子节点，一方没有子节点的情况，只有新的有，则直接都插入；只有老的有，则直接删除
* 3、比较都有子节点的情况
* 4、递归比较子节点
##### 第3点比较都有子节点的情况细节
* 1、oldStart 和 newStart 比较
* 2、oldEnd 和 newEnd 比较
* 3、oldStart 和 newEnd 比较
```
若是同一个节点，则将 oldStart 移到最后
```
* 4、oldEnd 和 newStart 比较
```
若是同一个节点，则将 oldEnd 移到前边
```
* 5、分有没有 key 的比较
```
没有 key 时，前四步都不匹配的话，则将 newStart 插入到前边
有 key 时，则判断 old 中是否有，有则取出放到前边
```
* 6、old 先遍历结束
```
将new的未遍历完的直接插入到后边
```
* 7、new 先遍历结束
```
将 old 中未遍历的直接删除
```
https://segmentfault.com/a/1190000008782928
### vue router
http://caibaojian.com/interview-map/frontend/vue.html#vuerouter-%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90

### css的局部作用域(已 vue 的 scoped 属性为例)

### Vue.mixin
**作用：** 抽离公共的业务逻辑   
**原理：** 组件初始化时调用 mergeOptions 方法合并，采用策略模式针对不同的属性进行合并。如果混入的数据和本身组件中的数据冲突，会采用“就近原则”以组件的数据为准。  
**缺点：** 命名冲突问题、依赖问题、数据来源问题。这里强调一下mixin的数据是不会被共享的  
```js
Vue.mixin = function (obj) {
  this.options = mergeOptions(this.options,obj);
}
// 使用 
Vue.mixin({
  beforeCreate(){
    console.log('before create ok')
  }
})
```
### VUEX
##### 原理
* 在vuex 插件的 install 方法内混入了下边的方法，这样每个组件就都可以直接取 $store 了。
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
```
### Vue 为何采用异步渲染
因为如果不采用异步的话，每次更新数据都会对当前组件进行重新渲染，所以为了性能考虑，Vue会在本轮数据更新后，再去异步更新视图。  
**流程：**
* 1、用户修改数据
* 2、触发 dep.notify() 通知 Watcher 进行更新操作  
* 3、sub[i].update() 依次调用 Watcher 的 update  
* 4、将 Watcher 放入到 queueWatcher 队列中，每个Watcher都有一个id，若id相同，则不重复放入  
* 5、nextTick(flushSchedulerQueue) 异步清空 Watch 队列  
### NextTick 原理分析
**用处：**  要在DOM更新后执行的方法  
**原理：** 主要是使用了 宏任务 和 微任务，定义了一个异步方法（Promise，mutationObserver，setImmediate，setTimeout）。   
**vue多次更新数据会最后批处理更新：** 因为事件环的执行过程，可大概看下边代码   
```js
let cbs = [];
let pending = false;
function flushCallbacks() {
    cbs.forEach(fn=>fn());
}
function nextTick(fn) {
    cbs.push(fn);
    if (!pending) {
        pending = true;
        setTimeout(() => {
            flushCallbacks();
        }, 0);
    }
}
function render() {
    console.log('rerender');
};
nextTick(render)
nextTick(render)
nextTick(render);
console.log('sync...')
```

https://qiaoshi123.github.io/harvester-offer/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E4%B9%8B%E9%81%93/21-Vue%20%E5%B8%B8%E8%80%83%E8%BF%9B%E9%98%B6%E7%9F%A5%E8%AF%86%E7%82%B9.htm  
http://caibaojian.com/interview-map/frontend/vue.html#nexttick-%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90   

### v-for 和 v-if 为什么不能连用 
就是这个样子使用  \<div v-if="false" v-for="i in 3">hello\</div>   
```
因为 v-for 的优先级高于 v-if ，
所以连用的时候会先循环，生成列表后，
再在每个元素上添加if选项，造成性能问题。
```
