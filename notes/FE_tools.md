
## Charles 抓包工具
### 应用：
  抓包、代理文件、一些环境配置
### 抓包
##### 步骤：
    1、打开Charles
    2、手机同一局域网，设置代理
    3、Charles会有确认弹窗，可在 proxy -> access control setting 中查看已确认记录
##### https时需要安装证书 和 配置 ssl proxying
###### 电脑安装证书
###### 手机安装证书方式： 
    1、连接后直接访问 chls.pro/ssl 下载安装，ios10以上需要信任
    2、电脑下载 help -> save charles root certi，注意选择pem、cer格式，然后传到手机上，手机再设置里边安装，一般安卓需要
    3、电脑下载 help -> export Charles root certificate and private key ，格式是 .p12 格式。
  还可以repeat请求，比如联调接口的时候，就不用操作页面了，直接repeat，看结果就可以了
### 重定向
    本地代理
    远程代理
### Mirror
    允许我们将指定的请求的返回结果暂存至磁盘中，用来做缓存数据，然后使用Map Local让请求在server环境挂掉时也能够正常得到缓存的结果。
    在接口对接，接口有问题时可以用。
    与下边一样结果。
### save response
    在记录上右键 --> save response 保存下来
    在记录上右键 --> map local 选择上一步保存下来的
### 弱网环境
    小乌龟
    proxy -> throttle setting
### rewrite
    对请求的Header，Host，Url，Path，Query Param， Response Status，Body进行重写，比如apm后的跨域配置
    支持正则的，
### 黑白名单
    黑名单表示对名单内的所有请求做过滤
    白名单表示仅对名单内的请求做响应

## vconsole
[vconsole 的 github 地址](https://github.com/Tencent/vConsole/blob/dev/README_CN.md)
## spy-debugger
    可以与Charles同时使用
[spy-debugger 的 github 地址](https://github.com/wuchangming/spy-debugger)
## 安卓调试
    webview 或者个别浏览器，比如谷歌浏览器，还有别的也有可以调试的
    1、电脑Chrome安装 ADB Plugin 插件
    2、手机连接数据线到电脑，打开usb调试和开发调试
    3、电脑翻墙
    4、就可以调试了~~
## ios Safari调试
    1、电脑Safari打开开发模式
    2、手机设置 -->ios Safari --> 高级 --> web响应器 
    3、连数据线
    4、开发菜单下找 ios的手机名字 选项
