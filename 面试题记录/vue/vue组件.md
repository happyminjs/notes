### 描述组件渲染和更新过程
* 渲染组件是，会通过 vue.extend 方法构建组件的构造函数，进行实例化，  
最终内部调用 $mount 进行挂载。  
* 更新组件是会进行 patchVnode 流程，对比vnode,进行更新  
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

### 组件注册(全局注册、局部注册)
```js
// 全局组件，是放到 Vue.options.components 上的
Vue.component('my-button', {
  template: '<button>hello</button>'
})

// 局部组件 ， 放到 vm.$options.components 上的
new Vue({
  el: '#app',
  components: {
    'my-button': {
      template: '<button>world</button>'
    }
  }
})
```
#### 全局注册 Vue.component
就是将组件挂载到 Vue.options.components 上
```js
Vue.component = function (id, definition) {
  definition.name = definition.name || id;
  definition = this.options._base.extend(definition);
  this.options['components'][id] = definition;
}

```
#### 局部注册
```js
// 就是在vue init 初始化时，将 components 合并到 vm.$options.components 上
let options = Object.create(parentVal)
if(childVal){
  for (let key in childVal) {
    options[key] = childVal[key]
  }
}
// 这样遍历属性复制的原因是防止属性被覆盖，
// 用这种方式防止引入的子组件覆盖父组件中同名组件
```
>如果全局和局部都有，则先找自己(即局部组件)，若没有，则按原型链找父级的(即全局组件)

#### 函数组件
在 render 中取不到 vue 的 this，所以在不需要 data 数据，就只有纯展示时，可以用函数式组件，
函数组件不需要 new 实例了，性能会更高 
```js
export default {
  functional: true, //函数式组件 会导致 render 函数中没有this
  // 正常组件是通过 this._init(), 函数式组件就只是一个普通函数了
  props: {},
  method: {},
  render(createElement, {props, slots}) {
    const click = () => {
      console.log('a')
    }
    return <a onClick={click}>{slots.default}</a>
  }
}
```

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
组件的调用顺序是先父后子，渲染完成顺序是先子后父
组件的销毁过程是先父后子，销毁完成顺序是先子后父
父组件的 mounted 中，子组件肯定已经渲染完毕
```
### vue 组件之间通信
1、vue 是单向数据流，子元素中不能直接修改父元素数据  
2、@sonFn="changeFather" 在vue内实际是给元素绑定了一个属性，即key为 sonFn ，值为 changeFather ，然后在子组件内部用 this.\$on('eventname', fn) 方法挂载到自己的实例上，此例则为 this.$on('sonFn', changeFather)  
以下都是按组件 ： parent/son1/son2/grandson1/grandson2
```
1、父=>子：props,
子=>父: @emit $on 发布订阅
2、$parent $children 组件在初始化时会初始化这样的一个父子关系，我们可以根据这俩属性自己扩展 $dispatch('组件名','事件名') $boardCast('组件名','事件名')，配合$on方法进行通讯
3、父组件 provide:{aa:xx} 后代组件:inject:['aa']
4、ref可以获取组件实例调用组件实例的方法（给组件就是获取组件实例，给dom就是获取dom元素） ref='toast' this.$refs.toast.show()
5、eventBus Vue.prototype.$bus = new Vue; this.$bus.$on(),this.$bus.$emit()
6、vuex 全局状态管理
```
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
<el-checkbox v-model='check'></el-checkbox>
<!-- => -->
<el-checkbox :value='check' @input='handleInput'></el-checkbox>
<!-- 组件内部可以 $emit('input') -->
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
