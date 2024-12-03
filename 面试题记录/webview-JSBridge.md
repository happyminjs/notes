#### JSBridge 定义
让 Web 端和 Native 端得以实现双向通信的桥梁。
#### 通信原理
* Native 向 Web 发送消息
```
原理：在 WebView 容器中动态地执行一段 JS 脚本
实现方法：调用一个挂载在全局上下文的js方法，且高版本中可以拿到js方法执行的返回值。
```
* web 向 Native 发送消息
原理： WebView 中发出的所有请求都是可以被 Native 容器感知到的。
```bash
# 此种方法使用较少
拦截式：拦截js执行的代码，如果是协商好的JSB格式的，则做相应处理。
(一般是iframe，因为iframe兼容度最好；性能低，兼容好，参数长度有限制)

# 常用方法
注入式：通过 WebView 提供的接口向 JS 全局上下文对象（window）中注入对象或者方法。
JS 可以直接调用，就执行了相应的 Native 代码逻辑
(安卓4.2，ios7 以上，性能好，参数无限制)
```

>参考文章: https://mp.weixin.qq.com/s/-mhVKcVv5Z1fyT27c72nmA (公众号：前端大全-JSBridge 原理与实践)