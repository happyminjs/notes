
#### js项目如何升级为ts？有何影响？
#### ts 基础类型都哪些，他们跟js的区别
* 都有的类型
```
boolean/ number/ string/ array/ undefined/ null
```
* ts 独有的类型
```
tuple(元组)/ enum(枚举)/ any(任意)
```
* 特别的类型
```
void: 没有任何类型，用来方法没有返回值
never: 是其他类型（包括null和undefined）的子类型，代表从不会出现的值
```
#### ts为什么会流行？与ECMA新规范的关系？
* ts 的代码可读性和维护性更好
```
1. 类型系统实际上是最好的文档， 大部分的函数看看类型就可以知道如何使用了
2. 可以在编译阶段发现大部分的低级错误，比运行时再发现好的多
```
* ts 包容性好： 
```
1. ts是js的超集，js文件直接修改后缀为ts即可
2. 可以定义从简单到复杂的几乎一切类型
3. 兼容第三方库
```
* ts 有活跃的社区
#### tslint都能配置哪些功能？对开发流程有何影响？
```
allowJs: 允许 js 文件被编译
sourceMap
strict

```
#### 如何使用js实现类型约束，枚举等特性么？
#### 如何理解接口，泛型?

https://www.jianshu.com/p/9b87f4950f9a

#### interface 和 type 的区别
其实 type 不是定义类型，而是类型别名，只是基本可以实现类型结构的效果，达到和 interface 一样的效果
##### 相同点：
* 都可以描述一个对象或者函数
```ts
// 描述普通对象
interface User{
  name: string
  age: number
}
// 描述函数类型，下边例子表示 函数的参数有 string 的 name，和 number 的age；void 没有返回值
interface SetUser{
  (name: string, age: number): void
}
```
```ts
type User = {
  name: string
  age: number
}
type SetUser = (name: string, age: number): void
```
* 都可以拓展 extends，且两者可以相互继承
```ts
// interface extends interface
interface Name {
  name: string;
}
interface User extends Name {
  age: number
}
// type extends type
type Name = {
  name: string;
}
type User = Name & { age: number}
// interface extends type
type Name = {
  name: string
}
interface extends Name {
  age: number
}
// type extends interface
interface Name{
  name: string
}
type User = Name & {
  age: number
}
```
##### 不同点
* type 可以声明基本类型别名，联合类型 元祖等类型
```ts
type Name = string // 实际是string类型的别名
// 联合类型
interface Dog {
  wong();
}
interface Cat {
  miao();
}
type Pet = Dog | Cat
type PedList = [Dog, Pet] // 具体定义数组每个位置的类型
```
* type 可以使用 typeof 获取实例的类型进行赋值
```ts
let div = document.createElement('div')
let B = typeof div
```
* interface 可以合并声明，type不可以
```ts
interface User{
  name: string
  age: number
}
interface User{
  sex: string
}
/* 相当于直接
interface User {
  name: string
  age: number
  sex: string
}
*/
```

