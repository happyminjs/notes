https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzUxNjQ1NjMwNw==&action=getalbum&album_id=1619085427984957440&scene=173&from_msgid=2247483922&from_itemidx=1&count=3&nolastread=1#wechat_redirect
### vue响应式原理
1、Vue 主要分为了两大部分，一部分是 compile（模板编译），一部分是observe（数据劫持）   
2、在模板编译时，碰到模板中的 {{}} 或者 v- 会进行依赖收集，new Watcher    
3、在 observe 使用 Object.defineProperty 将属性进行劫持，数组则是通过重写数组方法来实现的   
```
默认 Vue 初始化数据时，会给data中的属性使用 Object.defineProperty 重新定义所有属性，
如果是对象的话，除了拦截当前属性本身，还会递归深度拦截；
如果是数组的话，会遍历数组，内部是对象的，也会进行拦截；
同时，数组会 aop 切片方式，重写数组原型方法；这样在调用数组方法才能监听到数组的变化；

当页面取到相应属性时（即 defineProperty 的 get 属性方法），
会进行依赖收集（收集当前组件的watcher，addSub）；
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
### Vue 中 watch 原理
* 简述响应式
```
Vue 会把数据设置成响应式，即通过 Object.defineProperty，设置 get 和 set
当数据被读取时，会触发 get，然后收集到读取他的东西，保存到依赖收集器中
当数据被改变，会触发 set，然后通知读取他的东西进行更新
```
* 监听的数据改变时
```
在初始化时，watch 会读取一遍数据的值，此时会收集 watch 的属性的watcher
其中设置的回调函数handler，会放到 watcher 的回调函数中
数据改变时，会通知 watch 的 watcher 进行更新了，于是就会调用 handler 了
```
* 设置 immediate 时，watch 如何工作的
```
设置了 immediate 属性后，这个回调方法会立即执行一次
只需要在 initWatch 的时候，读取了监听的数据的值，便立即调用一次 handler 即可
```
* 设置了 deep 时，watch 如何工作
```
在读取data属性时， 如果设置了 deep，而且值是一个对象，则会递归遍历这个对象，
把内部属性都读取一遍，于是属性和他的对象值内的每个属性都会收集到 watch 的 watcher。
```

### vue 中  computed 的原理
* 特点： 默认 computed 也是一个 watcher，是具备缓存的，只有当依赖的属性发生变化时才会更新视图。   
```
1、computed 默认不执行，只有在使用时才会执行，即调用 object.defineProperty 的 get 方法时才执行
2、computed 是有缓存的，即多次取值如果依赖的值没有变化， 就不会重新执行 
3、依赖的值变化了，才需要重新执行
```
* computed 是响应式的
```
给 computed 设置的 get 和 set 函数，会用 Object.defineProperty 关联起来
所以 vue 可以捕捉到 读取和赋值 computed 属性的操作
读取 computed 时，就会执行 get 函数
赋值 computed 时，就会执行 set 函数
```
* computed 如何控制缓存
```
首先知道 computed 计算后，会将计算结果保存到一个变量中，再次读取时就直接返回这个变量
当 data 更新时，就会重新赋值这个变量
其中控制缓存就是通过 watcher 的一个属性，即 脏数据标志位 dirty 属性， 
此属性默认是 true，所以第一次读取时会直接计算一次
当 dirty 为 true 时，读取 computed 会重新计算
当 dirty 为 false 时，读取 computed 会使用缓存
1、开始 computed 的每个属性第一次读取时，会新建自己的 watcher，设置 watcher.dirty = true，便于第一次读取时计算取值
2、当依赖数据变化了，通知 computed时，设置 watcher.dirty = true, 便于其他地方重新渲染会调用get方法，重新计算
3、computed 计算完成后，设置 watcher.dirty = false，其他地方再次读取时，使用缓存不再计算
```
* data 改变后 computed 如何更新的
假设场景：页面 A 用了 computed B，computed B 中依赖了 data C，下边是变更顺序
```
data C 变化后，
1、data C 通知 computed B 的 watcher 更新，即设置 watcher.dirty = true，不会重新计算
2、data C 通知页面 A watcher 进行更新渲染，A 页面重新读取 computed B，然后 B 重新计算
```
* 为什么 data C 能收集到页面 A 的 watcher
```
在页面 A 读取computed B 的时候，会将 A 的 watcher 添加到 data C 的回调数组队列中 
```
watch：是一个影响多个  
computed： 是多个影响一个

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

### Vue 的生命周期原理
https://www.imooc.com/article/293328
在 Vue.prototype._init   
* 将用户定义的生命周期函数与默认的合并 mergeOptions ，  
* 初始化流程中调用生命周期 callHook   
```js
Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = mergeOptions(vm.constructor.options,options);
    callHook(vm,'beforeCreate');
    initState(vm);
    callHook(vm,'created');
    if (vm.$options.el) {
    	vm.$mount(vm.$options.el);
    }
}
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
```
在 created 和 mounted 中，如果需要操作渲染后的视图，也需要使用 nextTick 方法。 
因为不能保证所有的子组件都全部渲染
```
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
### css的局部作用域(已 vue 的 scoped 属性为例)
