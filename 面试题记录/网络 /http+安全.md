https://mp.weixin.qq.com/s/IHJQ6UbpLAQyHmmS0-i2ng

#### 网络安全： XSS 、 CSRF攻击、 点击劫持、 SQL注入、中间人攻击
##### XSS
攻击者将可执行的代码注入到网页中。  
一般分为两种：  
* 持久型： 攻击的代码被服务端写入进数据库中，例如评价内容等
  ```
  1、攻击者网页回帖，帖子中包含JS脚本
  2、回帖提交服务器后，存储至数据库
  3、其他网友查看帖子，后台查询该帖子的回帖内容，构建完整网页，返回浏览器
  4、该网友浏览器渲染返回的网页，中招！
  ```
* 非持久型： 攻击者将JS代码作为请求参数放置URL中，诱导用户点击
  ```
  页面需要从url中获取数据直接展示到了页面上
  ```
###### 防御方法
* 转义字符： 对于用户的输入应该是永远不信任的。转义输入输出的内容，对于引号、尖括号、斜杠进行转义  
  ```js
  export function xssProtect(str, name = ''){
    return str && str.replace(/</ig,"&lt;")
            .replace(/>/ig,"&gt;")
            .replace(/"/ig,"&quot;")
            .replace(/'/ig,"&apos;");
  }
  ```
* 转义字符 + 白名单： 解决富文本直接转义导致无法正常使用的问题 
* CSP： 本质就是建立白名单。开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。  
**除非攻击者还控制了一台列入了白名单的可信主机**
```bash
# 白名单开启方式
方法一： 设置 HTTP response Header 中的 Content-Security-Policy 字段
方法二： 设置 html 的 meta 标签， <meta http-equiv="Content-Security-Policy" content="">
# 规则内容在 1 中设置的值在 2 中是写到 content 属性中，
# 启用后，不符合csp的外部资源就会被阻止加载，chrome 会报错误信息。

# 取值
Content-Security-Policy = "script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:"
# 1、脚本：只信任当前域名
# 2、<object>标签：不信任任何URL，即不加载任何资源
# 3、样式表：只信任cdn.example.org和third-party.org
# 4、框架（frame）：必须使用HTTPS协议加载
# 5、其他资源：没有限制
```
具体限制值可查看 http://www.ruanyifeng.com/blog/2016/09/csp.html

--------------
##### CSRF
跨站请求伪造: 攻击者构造出一个请求地址，诱导用户点击或者通过某些途径自动发起请求。如果用户是在登录状态下的话，攻击者就可以取到用户信息，伪造带用户信息的请求，后端就以为是用户在操作，从而进行取到一些想要的信息。
###### 防御方法
* Get 请求不对数据进行修改
* 不让第三方网站访问到用户 Cookie
* 阻止第三方网站请求接口， 验证 Referer
* 请求时附带验证信息，比如验证码
* 请求时附带 Token： 服务器下发一个随机 Token，每次发起请求时将 Token 携带上，服务器验证 Token 是否有效。

--------------
##### 点击劫持
是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。
<image src="../../imgs/click_safe" width=400></image>

###### 防御方法
* 设置 HTTP 响应头 X-FRAME-OPTIONS
```js
配置取值
DENY: 表示页面不允许通过 iframe 的方式展示
SAMEORIGIN: 表示页面可以在相同域名下通过 iframe 的方式展示
ALLOW-FROM: 表示页面可以在指定来源的 iframe 中展示

// 不支持 X-FRAME-OPTIONS 的浏览器兼容方式
<head>
  <style id="click-jack">
    html {
      display: none !important;
    }
  </style>
</head>
<body>
  <script>
  // 一个页面可能会有很多层，top 是指最顶层的框架
  // self 是指当前窗口
  // 普通页面中 self === top === window
    if (self == top) {
      var style = document.getElementById('click-jack')
      document.body.removeChild(style)
    } else {
      top.location = self.location
    }
  </script>
</body>
```

--------------
##### SQL 注入
让Web服务器执行攻击者期望的SQL语句，以便得到数据库中的感兴趣的数据或对数据库进行读取、修改、删除、插入等操作，达到其邪恶的目的 
###### 攻击方法
将SQL语句放置于Form表单或请求参数之中提交到后端服务器，后端服务器如果未做输入安全校验，直接将变量取出进行数据库查询，则极易中招。
```bash
# 攻击举例
# 前端请求
GET xx/userinfo?id=1%20or%201=1     # id=1 or 1=1
# 后端查询sql语句
select name,[...] from t_user where id=1 or 1=1
# 如果后端不做安全过滤直接提交数据库查询，
# 就会把用户表中的所有数据全部查出，达到了黑客泄露数据的目的。
```
--------------
##### DNS 劫持
###### 攻击方法
```
1、本地计算机中的木马修改hosts文件
2、本地计算机中的木马修改DNS数据包中的应答
3、网络中的节点（如路由器）修改DNS数据包中的应答
4、网络中的节点（如运营商）修改DNS数据包中的应答
```
###### 防御方法
以阿里、腾讯等头部互联网厂商开始推出了httpDNS服务

--------------
##### 中间人攻击
攻击方同时与服务端和客户端建立起了连接，并让对方认为连接是安全的，但是实际上整个通信过程都被攻击者控制了。攻击者不仅能获得双方的通信信息，还能修改通信信息。  
一般使用公共WiFi等时会发生
###### 防御方法
增加一个安全通道来传输信息。例如 HTTPS   

--------------

