### entry
### output
### loader
* webpack 只能理解 js 和 json 文件
* loader 让webpack 可以处理其他类型的文件，并转为有效模块，供应用程序使用，及被添加到依赖图中
### plugins
### mode
* 
| 选项 | 描述 | 处理 |
| -- | -- | -- |
| development | 不压缩、打印debug信息，保护sourcemap文件 | 将process.env.NODE_ENV 设置为 development，启用 NamedChunksPlugin 和 NamedModulesPlugin |
| production | 压缩代码，不打印debug信息，静态文件不包括sourcemap | 将process.env.NODE_ENV 设置为 production，启用 FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin，OccurrenceOrderPlugin，SideEffectsFlagPlugin，UglifyJsPlugin |
#### 区分环境
* --mode ： 设置的 process.env.NODE_ENV
* --env： 设置 webpack 配置文件的函数参数 env.production = true
* cross-env 设置node环境的 process.env.NODE_ENV
* DefinePlugin 设置模块内的全局变量

#### 命令行配置
* webpack config 的 mode 默认为 production
* webpack serve 的mode 默认是 development
* 可以在模块内通过 process.env.NODE_ENV 获取当前环境变量，不能在 webpack 配置文件中获取此变量

#### DefinePlugin
> 本质是在编译时字符串的替换，不会定义变量
* 设置全局变量(不是window哟)，所有模块都可以读取到
* 可在任意模块内通过 process.env.NODE_ENV 获取当前环境变量
* 无法在 node 环境(即webpack配置文件中)获取当前的环境变量

#### webpack5 在缓存依赖上的改动升级
**webpack 5 之前**，编译后每个模块会有生成两个依赖数组
fileDependencies 依赖文件
contextDependencies 目录依赖
webpack 追踪了每个模块的 fileDependencies contextDependencies 和 missingDependencies，并创建了文件系统快照。
此快照会与真实文件系统进行比较。
当检测到差异时，触发对应模块的重新构建
**webpack5** 的缓存失效机制变的复杂很多
https://www.cnblogs.com/zhouyideboke/p/12058380.html

#### Loader
##### 图片
* file-loader 解决css等文件中的引入图片路径问题
* url-loader 当图片小于 limit 时，会转 base64编码，大于时，使用 file-loader 进行拷贝

##### css 兼容性
* -ms -moz -o -webkit
* postcss-loader 使用 postcss.config.js 文件中的配置，对css进行预处理
* postcss-preset-env 把现代的css转为大多数浏览器能理解的，在 postcss.config.js 中配置用
* postcss-preset-env 已经包含了 autoprefixer 和 browsers 选项

##### js 兼容性
* **babel-loader**: 使用Babel和webpack转译js文件
* **@babel/core**: Babel 编译的核心包
* **@babel/preset-env**: babel 默认只转换新的ES语法，比如箭头函数
* **@babel/preset-react**: react 插件的Babel预设
* **@babel/plugin-proposal-decorators**: 把类和对象装饰器编译成ES5
* **@babel/plugin-proposal-class-properties**: 转换静态类属性以及使用属性初始值化语法声明的属性

<!-- babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties -->
```
调用顺序：
  1、babel-loader调用babel/core，
  2、babel/core 调用 @babel/preset-env
  3、其他插件是 preset-env中未预设的部分。

1、js文件，babel-loader调用 @babel/core ，
  core虽然识别js代码，但是不知道怎么转换，需要插件知道怎么转换。
2、ES6语法很多，所以把插件打成一个包。包被称为 preset 预设。
  @babel/preset-env 就是一个把ES6转成ES5的一个预设
```

##### eslint
* eslint : 核心包
* eslint-loader : webpack 调用的 loader
* configuring : 
* babel-eslint : eslint 可能不支持高版本语法，此为转译包
* Rules
* ESlint 语法检测配置说明
```
1、eslint-loader 调用 eslint 进行检查
2、babel-eslint 将 高版本js 转 ES5
3、eslint，对代码进行检查
```
> 现在公认的比较合适的规范配置： eslint-config-airbnb

#### sourceMap
##### 配置项
| 类型 | 含义 | 
| -- | -- | 
| source-map | 原始代码，有完整的结果，但速度慢 |
| eval-source-map | 原始代码，完整结果，速度慢 |
| cheap-module-eval-source-map | 原始代码(只有行内)，高质量，速度慢 |
| cheap-eval-source-map | 转换行内代码每个模块被 eval 执行，并且 sourcemap 作为eval的一个 data url |
| eval | 生成代码 每个模块都eval执行，并存在 @sourceURL，带eval的构建模式能 cache sourceMap | 
| cheap-source-map | 转换行内代码，生成的sourceMap没有列映射，从loaders生成的sourceMap没有被使用 |
| cheap-module-source-map | 元时代吗，只有行内，与上一样，除了每行特点的从 loader中进行映射 |
##### 关键字
* eval ： 使用
* source-map
* cheap
* module
* inline