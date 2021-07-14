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