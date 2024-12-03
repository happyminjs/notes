https://zhuanlan.zhihu.com/p/136417498
#### 项目结构
* reactivity 响应式系统
* runtime-core 与平台无关的运行时核心
* runtime-dom 浏览器的运行时，包括 dom api，属性，事件处理 
* runtime-test 测试
* server-renderer 服务端渲染
* compiler-core 编译器核心
* compiler-dom 针对浏览器的编译模块
* compiler-ssr 服务端渲染的编译模块
* compiler-sfc 针对单文件解析
* size-check
* template-explorer 用于调试编译器输出的开发工具
* shared 共享内容
* vue 完整版本，包括运行时和编译器

#### vue3 变化
* ts 开发，增强类型检测
* 性能优化，支持 tree-shaking，直接去除没有使用的代码
* 数据劫持采用的 proxy 
* 对模板编译进行了优化，编译时生成了 Block tree，可以对子节点的动态节点进行收集，可以减少比较，并且采用了 patchFlag 标记动态节点
* vdom对比算法更新，只对比绑定了动态数据的节点
* 采用 composition Api 进行组织功能，解决反复横跳，优化复用逻辑 （mixin带来的数据来源不清晰、命名冲突等）, 相比optionsApi 类型推断更加方便
* 增加了 Fragment,Teleport，Suspense组件

### composition API
https://www.yuque.com/along-n3gko/ezt5z9/qy7r5h
##### 解决了什么问题
由于相关业务的代码需要遵循option的配置写到特定的区域，
随着业务复杂度越来越高，代码量会不断的加大
导致后续维护非常的复杂，同时代码可复用性不高
就是为了解决这个问题而生的
##### 提供了的api语法糖
###### reactive
```
reactive 创建响应式对象，等价于 2中的Vue.observable
类似于option api里面的data属性的值
```
###### ref
```
基础类型数据构建响应式使用的，通过 ref.value = value， 
返回 ref 的形式进行数据绑定
```
###### isRef
```
判断某个值是否是 ref 创建出来的对象
```
###### toRefs
```
把reactive的值处理为普通对象
但是每个属性都是 ref() 类型的响应式数据
```
###### watchEffect
```
Vue 中检测状态变化的方法，我们可以在渲染期间使用它。 
由于依赖关系跟踪，当反应状态发生变化时，视图会自动更新
```
###### computed
```
计算属性
```


###### 生命周期的hooks
在新版的生命周期函数，可以按需导入到组件中，且只能在setup()函数中使用.
```
import { onMounted, onUnmounted } from 'vue';
export default {
    setup () {
        onMounted(()=>{
           //
        });
        onUnmounted(()=> {
            //
        });
    }
};
```
#### 生命周期钩子函数
##### vue2对应到vue3中
* beforeCreate -> use setup()
* created -> use setup()
* beforeMount -> onBeforeMount
* mounted -> onMounted
* beforeUpdate -> onBeforeUpdate
* updated -> onUpdated
* beforeDestroy -> onBeforeUnmount
* destroyed -> onUnmounted
* errorCaptured -> onErrorCaptured


#### proxy 比 defineProperty 的优势
* defineProperty 缺点
```
defineProperty 只能劫持对象的属性，
需要全部转换成 getter setter的方式
需要遍历对象的每个属性
如果属性也是对象，还需要递归遍历
如果是数组，不能劫持，而且还得遍历数组，如果数组项是对象，需要再劫持对象
新增属性，需要手动进行 Observe，即 vm.$set(targe, key, value)
```
* proxy 优势，缺点是兼容性差~~
```
不是对 obj 属性的重新，只是进行了一层”拦截“
不需要递归，只需要访问到的属性是对象时代理即可
```

#### 响应式原理
##### 数据劫持
```js
const dinner = {
  meal: 'tacos'
}
const handler = { 
  get(target, prop, receiver) {
    // 在 proxy 中的 getter 中执行此操作，称为 effect
    track(target, prop)  
    const value = Reflect.get(...arguments)
    if (isObject(value)) {
      // 嵌套对象时，也需要转换为 proxy
      return reactive(value)
    } else {
      return value
    }
  },
  set(target, key, value, receiver) {
    // 在 proxy 中的 setter 中进行该操作，名为 trigger
    trigger(target, key)
    return Reflect.set(...arguments)
  }
}
const proxy = new Proxy(dinner, handler)
```
##### 侦听器
```
将对象数据传递给组件实例时，
Vue 会将其转为 proxy 。
通过设置 proxy 的 get 和 set, 
使 Vue 能在属性被访问或修改时，执行依赖项跟踪和更改通知。
每个属性都是一个依赖项。
```
每个组件实例都有一个相应的侦听器实例，该实例将在组件渲染期间把“触碰”的所有 property 记录为依赖项。之后，当触发依赖项的 setter 时，它会通知侦听器，从而使得组件重新渲染
```js

```
