
# Lighthouse
### 前言
<img src="/imgs/audits/WX20190924-160905@2x.png" width=500></img>
从上图可以看出在用户体验需要层次理论中，大多数用户都把速度放在了最高层。因为在页面加载完之前，你很多事情都不能做，所以页面加载速度就放到了最重要的位置。所以有了本文介绍的Lighthouse工具的登场~
### 介绍
Lighthouse是谷歌的一个开源自动化工具。主要用来分析web应用和web页面的质量。目前的分析项包括页面性能、PWA、最佳实践、可访问性、SEO。他可以收集各项的测试情况，进行打分并给出给出建议。
### 安装使用
##### 1、在 Chrome DevTools 中使用 Lighthouse
我们的Chrome开发工具中已经集成了Lighthouse插件，就在Audits面板下。
我们只需要两步即可：
* 安装Chrome
* 打开Chrome DevTools，选择Audits面板，点击Run audits 按钮即可。
<img src="/imgs/audits/WX20190924-110402@2x.png" width=500>

##### 2、使用Chrome扩展程序
* 在谷歌商城下载插件（ps: 此方式插件安装后不用翻墙）：
<img src="/imgs/audits/chrome-plugin" width=400>
* Options 配置测试项，点击 Generate report 即可测试项目。

##### 3、使用 Node CLI
```js
// 1、全局安装
npm install -g lighthouse
// 2、运行
lighthouse <url>
// 或者生成导出json文件
lighthouse <url> --output=json --output-path=./report.json --save-assets
```
##### 4、配置到项目中
```js
// 1、下载到项目内
npm install lighthouse -D
// 2、在项目中引用
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port
    return lighthouse(url, opts, config).then(results => {
      return chrome.kill().then(() => results.lhr)
    })
  })
}
const opts = {
  chromeFlags: ['--show-paint-rects']
}

launchChromeAndRunLighthouse('url', opts).then(results => {
  // Use results!
})
```
具体配置使用可以移步到 [GitHub](https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md) 查看。

### 查看结果
Lighthouse可以生成HTML或者JSON格式的报告，以 Node CLI 形式为例。
* **JSON格式**
在执行运行命令时，用 —output=json 命令，可以生成一个JSON文件存储到本地。
在需要查看结果的时候，将之前生成的JSON文件上传到 https://googlechrome.github.io/lighthouse/viewer/ 这里查看。
* **直接生成的 HTML**
运行结果看下图，可以看到输出了一个本地HTML文件，可以直接打开查看。
<img src="/imgs/audits/cli.png" width=500 />

不管哪种形式查看结果，最后看到的都是一个这样的结果页面：
<img src="/imgs/audits/list-img.png" width=500>

### 实例分析
以公寓列表页为例，上边的图即为公寓列表页的性能分析图。
(ps：为了方便修改调试，所以都是本地环境测试，所以与实际网页性能是有差异的)：
本次测试了 Performance、Accessibility、Best Practices 三项。

##### Performance
* **优化前**
先来看看 Performance 的整体表现：
<img src="/imgs/audits/performance-1.png" width=500>
可以看到整体表现里边有一项 Max Potential First Input Delay 不是很好，有一项 First Meaningful Paint 给了红色提示。下面来看看具体是什么原因导致的，同时 Lighthouse 又给出了什么建议：
<img src="/imgs/audits/performance-2.png" width=500>
可以看到有以下几点提示：
1、有太多图片
2、第三方文件预连接
3、初次渲染太多DOM
4、静态资源文件没有很好的应用缓存策略
* **优化后**
对以上前三点进行了调整后：图片懒加载、第三方文件添加 preconnet 属性后的检测结果如下：
<img src="/imgs/audits/performance-3.png" width=500>
可以看到各项指标的实际都有一定幅度的减少，总体得分也有提升。相信把剩下的缓存的问题也解决后会有进一步提升的(由于缓存需要后端配合，所以没有测试此项优化)。

##### Accessibility
* **优化前**
<img src="/imgs/audits/accessibility-1.png" width=500>
可以看到以下几点提示：
1、背景色和元素颜色对比不够明显
2、一些标签语义化问题
3、页面禁止缩放问题
* **优化后**
对上边的第二点进行部分优化后的检测结果如下：
<img src="/imgs/audits/accessibility-2.png" width=500>
经过上边的优化后，Accessibility 项从43分到70的提升。
另外由于页面颜色是依赖设计稿的，不会修改；页面缩放是需求设计，不能修改，所以这两点没有改变。

##### Best Practices
* **优化前**
<img src="/imgs/audits/practices-1.png" width=500>
提示点：
1、没有使用 HTTPS
2、部分没有使用HTTP2
3、使用了 document.write()
4、图片没有默认宽高比展示
* **优化后**
由于是本地webpack启动的本地服务，所以未对第2点修改。
对上边除了2之外进行了优化后的结果如下：
<img src="/imgs/audits/practices-2.png" width=600>
可以看到优化效果还是很可观的，评分得到的很大的提升。

### 结束
lighthouse 的检测是自动化黑盒测试，给出的指标和分数以及建议有助于提高我们也没的速度。但他只是工具，不是我们的目标，性能提升是个旅程，希望我们都能通过合适的工具或者方式来提高我们的页面质量。
