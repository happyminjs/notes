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

