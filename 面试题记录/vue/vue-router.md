#### vue router
##### 核心原理
```
1、通过 Vue.use 注册插件，
  在插件的 install 方法中用 Vue.mixin 的参数的 beforeCreate 中将 router 绑定到 this 上，
  即 vue 的实例；
2、浏览器地址变化时，根据 router 对象匹配相应路由，获取组件，并渲染
3、hash模式： 通过 location.hash 修改 hash 值，触发更新
            通过监听 hashchange 事件监听浏览器的前进或者后退，触发更新
4、history模式：
    通过 history.pushState 修改浏览器地址，触发更新
    通过监听 popstate 事件监听浏览器的前进和后退，触发更新
5、如何渲染 router-vier 组件：
    通过 Vue.observable 在 router 实例上创建一个保存当前路由的监控对象 current；
    浏览器地址变化时，修改监控对象 current；
    在 router-view 中监听监控对象 current 的变化，
    当current变化后，获取用户注册的对应 component，
    并利用 h 函数将 component 渲染成 vnodes，进而更新页面视图
```
##### 组成 
* **\$router** 全局的路由实例
```
原型扩展方式，是 vue-router 构造方法的实例，在Vue实例内部，可以通过 $router 访问路由实例
```
* **$route** 当前路由信息对象
```
原型扩展方式，挂载在vue的原型上
```
* **_router** 用户 new Vue 时传入的 vue-router 的实例
* **_routerRoot** 根组件的实例
* **组件 router-link**
* **组件 router-view**
```js
let Vue
VueRouter.install = function(_Vue) {
  Vue = _Vue
  // 为了给 所有的组件统一增加 $router 和 $route 属性
  Vue.mixin({
    beforeCreate(){
      // 给跟实例增加一个 _router 属性
      // 然后所有都拿到根上的 _router 
      if (this.options.router) {
        // 根组件
        this._router = this.$options.router // 用户 new Vue 时传入的 vue-router 的实例
        this._routerRoot = this // 表示根组件上有一个唯一的标识，指向了自己

        // 路由初始化逻辑 只初始化一次
        this._router.init(this)  // 此处的 this 是当前组件的实例
      } else {
        // 子组件
        this._routerRoot = this.$parent && this.$parent._routerRoot
        // 所以所有组件都可以 _routerRoot._router 获取路由实例
      }
    }
  })
  // 只是为了使用方便
  // 每个实例都可以获取到 $router 属性
  Object.defineProperty(Vue.prototype,  '$router', {
    get(){
      return this._routerRoot._router
    }
  })
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route
    }
  })
  Vue.component('router-link', RouterLink)
  Vue.component('router-link', RouterView)
}
```
#### Hash 模式原理
主要是是用 URL 的 hash 来模拟一个完整的 URL，通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。
**只能修改#后边的hash值，不能做域名不同的跳转**
```
URL 的 hash（即 #）是 URL 的锚点，代表页面中的一个位置，只改变 # 后的部分，
浏览器不会重新加载网页，只会滚动到相应的位置
但是会增加浏览器的历史记录
```
```js
// popstate 支持则 popstate，不支持的则 hashchange
window.addEventListener('popstate、hashchange', function(){
  // hash 值变化事件， 切换组件 渲染组件
})
```

#### History 模式原理
使用浏览器提供的API： window.history.pushState/replaceState，对浏览器历史记录栈进行修改。
```js
window.history.pushState(stateObject, title, URL)
window.history.replaceState(stateObject, title, URL)
```
##### 本地环境使用 history 模式解决404问题
可以配置 webpack 的 devServer.historyApiFallback 属性为 true，在 vue-router 404时，会导航到默认首页    
如果首页不是默认的 index.html 时，可以配置 historyApiFallback 的 rewrite 属性配置到自己配置的页面
#### 渲染组件实现
在install中定义 current 路径为响应式的，current 改变后，则重新渲染 router-view
```js
Object.defineProperty(this, '_route', {
  get(){
    return this.
  }
})
```
#### 路由钩子
就是把所有的钩子组成一个数组，然后依次执行
[全局钩子，路由钩子，组件钩子]
```js
router.beforeEach((from, to, next) => {

})
router.afterEach((from, to, next) => {
  
})

const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {}
    }
  ]
})
```