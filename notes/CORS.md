# 跨域
随着前端技术的发展，前后分离已经是主流，但是受同源策略的影响，随之而来的就会产生跨域的问题。
#### 什么是同源策略
所谓同源就是说域名，协议，端口都相同。它是浏览器的一种安全功能，如果三者有任意一个不同，则会跨域。


## CORS 详解
CORS：跨域资源共享机制。使用额外的 HTTP 头来告诉浏览器  让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。要想实现CORS跨域，就需要服务器和客户端都做一些配置。
### 服务端配置
以node服务端为例，使用了express。主要代码如下：
```js
const express = require('express');
const app = express();
app.get('/', function (req, res) {
  res.header('Access-Control-Allow-Origin', 'http://dev.ganji.com:8008');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Expose-Headers', 'Date');
  res.header('Access-Control-Request-Headers', 'X-Custom-Header');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT');
  res.json({
    <!-- ... -->
  })
})
var server = app.listen(8081, function () {})
```
##### 下面对配置项简单介绍：
###### Access-Control-Allow-Origin
允许跨域访问域名，请求端的域名或者 \*，\* 表示任意域名都可以访问。
###### Access-Control-Allow-Credentials
跨域后默认不携带cookie和http的认证信息的，所以就需要添加配置，表示服务器明确许可携带cookie。此时需要注意Origin不能设置为 \*， 必须明确指定与请求网页域名一致。
服务端：
```js
res.header('Access-Control-Allow-Credentials', true);
```
客户端需要在请求中添加withCredentials属性：
```js
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```
请求信息 ![simple](/imgs/simple.png)
###### Access-Control-Expose-Headers
默认xhr对象的response header中只能拿到六个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，可以在此设置想要拿到的其他字段。
```js
res.header('Access-Control-Expose-Headers', 'Date');
```
##### 简单请求
简单请求条件：
1、请求方法
* GET
* POST
* HEAD  

2、头信息不能超过下边范围
* Accept
* Accept-Language
* Content-Language
* Content-Type 取值范围为： 
    * text/plain
    * multipart/form-data
    * application/x-www-form-urlencoded

3、XMLHttpRequestUpload 中没有注册事件监听器

简单请求的客户端和服务端请求过程：
<img src="https://mdn.mozillademos.org/files/14293/simple_req.png"/>
##### 复杂请求
如果不满足简单请求的条件，则会发送复杂请求。复杂请求会先用OPTIONS方法发起一个预检请求到服务器，服务器允许后，再发送真实请求。
过程下图：
<img src="https://mdn.mozillademos.org/files/14289/prelight.png"/>
实际请求信息：  
第一次的预检请求：
![option](/imgs/options.png)
第二次实际请求：
![put](/imgs/put.png)
复杂请求配置介绍：
###### Access-Control-Request-Method
复杂请求时必须配置，用来指定浏览器的CORS请求会用到哪些HTTP方法，上图中的 PUT。
```js
res.header("Access-Control-Allow-Methods","PUT")
```
###### Access-Control-Request-Headers
浏览器CORS请求会额外发送的头信息字段。逗号分隔的字符串。

### 总结
CORS是服务端和浏览器配合完成的跨域请求，感觉主要是服务端配置好后，浏览器根据服务端的配置的头部和提供的可用的CORS方法来实现跨域。