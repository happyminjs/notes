![logo](/imgs/nuxt_logo.png)

是不是每次打开页面，还在纠结于文件已经加载完了，但是还在等接口的loading？想前后完全分离的同时也想要很好的seo？vue和react都发布了一份完整的构建服务端渲染应用的指南SSR。
vue的社区团队开发了一个基于SSR的Nuxt.js的框架，让我这们可以很方便快速的来开发服务端渲染的Vue应用。之所以Nuxt.js能实现服务端渲染，是因为它给提供了一个方法asyncData（异步数据）。现在我们就来先了解一下它吧~~
### asyncData用处
asyncData方法可以在设置组件的数据之前能异步获取或处理数据。此方法会在页面组件每次加载之前调用，可以在服务端或路由更新之前被调用。
### 想理解为什么，还是得看一下ssr原理
先来了解一下构建步骤，看下图：  
![ssr-img](/imgs/ssr-img.png)  
SSR有两个入口文件server.js和client.js，webpack通过这两个入口文件将我们的代码打包出两个bundle：
>[服务器bundle]用于服务端渲染，既SSR，生成首屏HTML；  
>[客户端bundle]会发送给浏览器，用户客户端渲染首屏外的数据和交互处理。

asyncData方法就是在Node Server中执行，服务器bundle中来处理的。
在服务器接收到客户端的请求后，会创建一个渲染器Bundle Renderder，这个渲染器会读取Server Bundle并执行，然后生成HTML，同Client Bundle一起生成发送到客户端。
### 下面就来实践一下Nuxt.js吧
#### 首先安装创建项目
官方提供了几个模板，下面以starter模板为例，方便我们使用，可以直接下载[模板压缩包](https://github.com/nuxt-community/starter-template/archive/master.zip)，也可以使用vue-cli安装，下面是vue-cli安装步骤：
```bash
    # 安装vue-cli
    npm install -g vue-cli 
    # 下载starter模板
    vue init nuxt-community/starter-template
    # 安装依赖
    npm install
    # 启动项目
    npm run dev
``` 
当然，你也可以自己从头开始创建一个全新的项目，这里就不多说，只是个人觉着starter模板用着真的很方便，目录结构特别清晰，也很符合我们平时的命名习惯和规则~~~
#### 目录结构
starter模板已经根据平时的命名习惯给创建好了目录，看下图就是starter模板给生成的：  
![目录结构](/imgs/catalog.png)  
#### 配置
项目创建好了，总得要按照我们的编码习惯和需求来对项目进行配置。其实Nuxt.js的默认配置涵盖了大部分的场景，可以在nuxt.config.js中覆盖默认配置项，下面就说几个常用的配置属性。
###### HTML头部标签
可以在nuxt.config.js配置统一的头部标签，常用的title、meta、script标签
```bash
    head: {
        title: 'nuxt demo',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        __dangerouslyDisableSanitizers: ['script']  // 不对<script>标签中内容做转义处理
    }
```
也可以在某页面的vue文件下配置，例如修改页面title
```bash
    head() {
        // 个性化设置head
        return {
            title: '页面标题'
        };
    }
```
###### 全局样式配置
```bash
    css:[
		'assets/main.css'
	]
```
###### build设置
常用配置：vendor、extend
常见将每个页面都用的插件，在此处配置，则就不需要每个页面引入的时候打包多次了。例如axios
```bash
    build: {
        vendor: ['axios']
    }
```
###### 插件设置plugins
这里一般是来配置开发的插件，可以设置ssr为false来只在浏览器运行。例如
```bash
    plugins:[
        {
            src:'~/plugins/toast',
            ssr:false
		}
    ]
```
#### 路由
项目创建好了，页面配置也有了，但是路由我们还没配置呢，但是在Nuxt.js中，这个可以说是不需要我们再专门设置了，它可以根据pages目录结构，自动生成路由配置。
假设pages的结构是下边这样的：  
![pages截图](/imgs/pages.png)  
Nuxt.js会自动生成下面这样的路由配置：
```bash
    router: {
        routes: [
            {
                name: 'index',
                path: '/',
                component: 'pages/index.vue'
            },
            {
                name: 'user',
                path: '/user',
                component: 'pages/user/index.vue'
            },
            {
                name: 'user-one',
                path: '/user/one',
                component: 'pages/user/one.vue'
            }
        ]
    }
```
#### 嵌套路由
我们的页面肯定不能都是根目录的页面的，所以会需要嵌套路由。在Nuxt.js中只需要创建与该文件同名的目录存放子视图的组件就可以了。看下图目录结构：  
![嵌套pages](/imgs/pages_child.png)  
自动生成的嵌套路由
```bash
    router: {
        routes: [
            {
                path: '/user',
                component: 'pages/user.vue',
                children: [
                    {
                        path: '',
                        component: 'pages/user/index.vue',
                        name: 'user'
                    },
                    {
                        path: ':child',
                        component: 'pages/users/child.vue',
                        name: 'user-child'
                    }
                ]
            }
        ]
    }
```
    不要忘记了要在父级的vue文件中增加<nuxt-child/>来显示子视图的内容。
<br />
<br />
<br />

>终于配置完了，可以来写产品提的需求了，可是想想基本整个项目的整体大结构都是一样的，尤其头尾每个页面都一模一样的。其实Nuxt.js已经为我们准备好了，我们可以在Nuxt.js的结构上修改成我们需要的结构。下边就来看看我们的模板怎么做吧~  
#### 想要定制默认模板
只需要在根目录下创建app.html文件即可。
默认模板是：
```bash
    <!DOCTYPE html>
    <html {{ HTML_ATTRS }}>
    <head>
        {{ HEAD }}
    </head>
    <body {{ BODY_ATTRS }}>
        {{ APP }}
    </body>
    </html>
```
#### 默认布局
默认布局是layouts文件夹下的default.vue文件，默认的布局结构是：
```bash
    <template>
        <nuxt/>
    </template>
```
pages文件夹下的vue文件中的内容会插入在<nuxt/>中。
你也可以修改此文件来扩展应用的默认布局，像下边这样，加上每个页面都有的头部和尾部。
```bash
    <template>
        <div>
            <head-dom/>
            <nuxt/>
            <foot-dom/>
        </div>
    </template>
    <script>
        import HeadDom from "~/layouts/head.vue";
        import FootDom from "./foot.vue";
        export default {
            components: {
                HeadDom,FootDom
            }
        };
    </script>
```
生成页面的结构如下图：  
![布局](/imgs/layout.png)  
从外到内依次是layouts布局、pages页面、components组件
#### 自定义布局
一整个项目那么多页面，总会有一两个页面不按常理出牌的，我们可以在layouts文件夹下新建布局模板，然后这一两个页面的vue文件中配置layouts，引入此布局模板就可以了。
```bash
    # layouts文件夹下的布局模板layout_one.vue
    <template>
        <div class="layout_one">
            <nuxt/>
        </div>
    </template>
    # pages文件夹下需要自定义布局的vue文件，配置layout参数即可
    export default {
        layout: "layout_one"
    }
```
#### 错误页面
若是某个页面跳转不小心些错了怎么办？或者某个还在用的vue文件不小心给删了怎么办？写了那么完美的代码，怎么可以容忍呢~~
可以通过编辑layouts/error.vue文件定制错误页面的样式。一般在404,500等错误页面的时候会自动加载error.vue文件。
#### 异步数据
说了那么多，终于到开头说的nuxt.js中的asyncData的方法，这个方法是在组件加载之前调用，可以在服务端或者路由更新之前调用。使得我们可以在设置组件的数据之前异步获取或处理数据。
此方法有两个参数，第一个是当前页的上下文对象，可以用来获取数据；第二个参数可以指定回调函数。
需要注意一点的是我们也就不可以通过this来引用组件的实例对象了，由于是服务端运行，所以也是不存在document、window这些变量的。
```bash
    export default {
        async asyncData ({isServer,query},callback) {
            let { data } = await axios.get(`https://58.com/api/${query.id}`);
            return { 
                ID: query.id || '00'
            }
        }
    }
```
上下文对象context可用的属性看[官方的文档](https://zh.nuxtjs.org/api/)吧

<br />
<br />
<br />  

>有上边的，项目都已经可以用了，但是我们总是会想要更好一些的效果，比如不需要编译的文件与需要编译的文件区分开，不要多次打包加载公共插件，那就再继续看看下边的吧。  
#### 资源文件
Nuxt默认会使用webpack的插件vue-loader、file-loader、url-loader来处理文件的加载和引用。
对于不需要处理的静态文件，放在static目录中即可。Nuxt启动后，该目录下的文件会映射到此应用的根路径下，所以在代码中是可以用根路径 / 和资源相对路径来引用静态不需要处理的文件。
```bash
    # 引用 static 目录下的图片
    <img src="/test-img.png"/>
```
需要处理的文件则放在assets目录下。
```bash
    # 引用 assets 目录下经过webpack处理的图片
    <img src="/assets/test-img-2.png"/>
```
#### 插件
没有哪个项目是不需要引入外部插件的，即便有，也绝对少不了自己写的公共插件的，来看看各种类型的插件怎么使用的吧。
###### 第三方模块
以vue官方推荐的HTTP库axios为例：
```bash
    # 安装axios
    npm install axios

    # 页面引用和使用
    import axios from 'axios'
    export default {
        async asyncData (){
            let { data } = await axios.get('http://api/gets/....');
            return { title: data.title}
        }
    }
```
需要注意的一点是，如果多个页面都引用了同一个插件，需要在nuxt.config.js中配置build.vendor，否则会打包多次。
```bash
    moudle.exports = {
        build: {
            vendor: ['axios']
        }
    }
```
###### vue插件
以vue-notifyjs为例：
```bash
    # 安装vue-notifyjs
    npm install vue-notifyjs
    
    #在plugins文件夹下新建js文件 vue-notify.js，文件内容如下，其实就是插件的引入和基本的配置初始化
    import Vue from 'vue';
    import Notify from 'vue-notifyjs';
    import '../node_modules/vue-notifyjs/themes/default.css'
    Vue.use(Notify,{
        type: 'success',
        timeout: 2000,
        verticalAlign: 'bottom',
        horizontalAlign: 'center',
        showClose: false
    });

    # 在nuxt.config.js中添加plugins配置，同时为了防止将第三方库打包到应用代码中，需要在vendor添加配置，来将第三方库打包到库文件里，来获得更好一些的缓存效果。
    moudle.exports = {
        plugins: [
            {
                src:'~/plugins/vue-notify',
                ssr: false
            }
        ],
        build:{
            vendor: ['~/plugins/vue-notify']
        }
    }

    # 最后在需要插件的vue文件中直接使用
    <template>
        <notifications></notifications>
    </template>
    <script>
        export default{
            methods: {
                addNotification(msg){
                    this.$notify({
                        message: msg
                    })
                }
            },
            mounted () {
                this.addNotification('Nuxt.js');
            }
        }
    </script>
```
#### 添加预处理器
现在有很多前端的扩展语言例如scss、less等，以引入scss预处理器为例：
```bash
    # 首先当然是安装包了
    npm install node-sass sass-loader --save-dev

    # nuxt.config.js中添加build配置
    styleResources: {
        scss: './assets/*.scss'
    }

    # vue文件中使用
    <style lang="scss">
        ... 
    </style>
```
scss文件是需要webpack编译处理的文件，所以要放到assets目录下。
<br />
<br />
#### 代码写完了，当然得部署服务器了
Nuxt.js提供了下面的四个命令，可以放到package.json中来启动。  
**nuxt**：启动一个热加载的Web服务器（开发模式） localhost:3000。本地开发时用  
**nuxt build**：利用webpack编译应用，压缩JS和CSS资源  
**nuxt start**：以生成模式启动一个Web服务器 (需要先执行nuxt build)，  服务端渲染应用部署时用  
**nuxt generate**：编译应用，并依据路由配置生成对应的HTML文件 (用于静态站点的部署)。  静态应用部署时用，会创建dist文件夹，是所有静态化后的资源文件。  

>至于是选择静态应用部署还是服务端渲染应用部署，那就得要看你的项目实际需求了。  

<br />
<br />  

>**结束语**  
>Nuxt.js是一个很简单易上手的框架，这篇文章主要是介绍了一下Nuxt.js的使用，希望能够有具体的项目能够落地来展现Nuxt.js的优点。这里有一个很简单的小[demo](https://github.com/happyminjs/nuxt-demo)，有兴趣的同学可以看看。