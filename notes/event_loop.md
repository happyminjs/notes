## 事件循环机制
js中分了两种任务： 宏任务和微任务
* 宏任务
```
script全部代码、setTimeout、setInterval、I/O、UI Rendering
```
* 微任务
```
Process.nextTick（Node独有）、Promise、MutationObserver
```
### 浏览器中的Event Loop
Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。
#### JS调用栈
采用的是后进先出的规则，在函数执行时，会将函数添加到栈的顶部，当执行栈执行完后，就会将函数从栈顶移除，直到栈内清空。
#### 同步任务和异步任务
Javascript单线程任务被分为同步任务和异步任务。
* 同步任务：在调用栈中按照顺序等待主线程依次执行
* 异步任务：在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（即调用栈被清空后），被读取到栈内等待主线程的执行。
#### 事件循环的进程模型
* 选择当前要执行的任务队列，选择任务队列中最先进入的任务，如果任务队列为空即null，则执行跳转到微任务（MicroTask）的执行步骤。
* 将事件循环中的任务设置为已选择任务。
* 执行任务。
* 将事件循环中当前运行任务设置为null。
* 将已经运行完成的任务从任务队列中删除。
* microtasks步骤：进入microtask检查点。
* 更新界面渲染。
* 返回第一步。

具体看下图例子：
<image src="/imgs/event-loop.png" width=900></image>

## Node 中的 Event Loop
和浏览器中的是完全不相同的东西。