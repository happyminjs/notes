

// Node 是什么， 可以做什么 （生态完整）
// Node 是 runtime(运行时) ，可以让 js 运行在服务端上
// 内置模块 文件读写  操作系统 及其api
// js 基本组成： （BOM， DOM 服务端没有）， ECMAScript， 模块的特性（提供了 api 方法，来实现文件操作，服务器端的创建）
// node 只包含了 ECMAScript + 模块
// node 一般用来做中间层  解决跨域问题 ssr的实现 工具 （框架： egg nest ） 做一些后台项目
// 高并发（单线程---因为js的主线程是单线程）  ---- 因为 node 是非阻塞异步 I/O 特性
 
// -------- 同步、异步、阻塞、非阻塞  --------
// 同步、异步 是用来形容被调用方的
// 阻塞、非阻塞  是用来形容调用方的
// node 是单线程+异步非阻塞 ，靠事件驱动
// Java 是多线程+同步阻塞


// 进程是计算机分配任务的最小单位
// 一个应用可有多个进程，一个进程可有多个线程
// 例如 谷歌浏览器每个标签页都对应一个独立的进程，
// 浏览器的渲染进程（浏览器内核）
// 浏览器渲染进程（页面渲染、线程、js执行、线程）
// js 和页面渲染是互斥的，不能同时进行
// 主线程是单线程 js 代码从上到下一行一行执行

// --------  多线程   --------
// 每次接收请求都会开一个新线程， 浪费内存 ， 好处是多个请求可以同时处理
// 可能多个线程同时操作同一个文件，所以需要添加 锁 的问题
// 切换线程执行时，会频繁切换时间片，达到同时执行多个任务，浪费性能
// 多线程占用内存，线程总数有限， 可以通过线程池来解决 也会浪费内存
// 因为有以上问题，所以多线程是 同步阻塞
// 适合 压缩、合并、大量计算 等  CPU 密集型
// --------  Node   --------
// node 中自己实现了 异步非阻塞的库 ， ---- 底层有个 libuv(底层多线程实现的异步非阻塞，是C++的性能好)  核心是异步
// 适用于 web 服务， ajax 请求，请求静态页面 等异步请求
// 高频发，适合 I/O 密集型，（所以常用来web应用），不适合CPU密集型 



// -------- 进程与线程的区别  --------
// 一个进程可以多个线程， 比如渲染线程、js引擎线程，http请求线程
// 进程表示一个程序，线程是进程中的单位， node 中主线程只有一个
// 默认 1 个进程占用 1核CPU， node 是单进程 单线程（node中会开子进程）
// 多线程在单核CPU中其实也是顺序执行的，不过系统可以帮你切换那个执行顺序，没有提高速度
// 多个CPU的话，就可以多个CPU同时执行
// 、单线程优点： 解决切换上下文时间，锁的问题，节省内存
// node 主进程，在开多个子进程，里边包含一个线程



