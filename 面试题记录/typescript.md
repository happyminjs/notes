#### 泛型 ***** 
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
#### 函数类型
若未指定返回类型，则默认返回 void 类型。
? 代表参数是可选的
```ts
function add(x:number, y:number, z?:number):number{
  return x + y
}
let add2 = (x: number, y: number): number => {
    return x + y
}
// 函数不能赋值其他类型，会报错，可赋值函数
const add3:(x: number, y: number) => number = add2;
add(1, 2)
```
#### interface
> interface 不是js关键字，所以ts编译成js后，interface不会转换成js，是直接删除掉的，只在ts中用来静态检查。
```ts
// 描述对象
interface Person {
  readonly id: number; // 只读属性
  name: string  // 必须要有的属性
  age?: number  // 可选属性
  [propName: string]: string;  // 自定义属性
}
const p1: Person = {
  name: 'lin',
  a: 'hello',
  b: 'world'
}

// 描述函数
interface ISum {
    (x:number,y:number):number
}
const add:ISum = (num1, num2) => {
    return num1 + num2
}
```
#### type

#### 类、继承
```ts
// 父类
class Person {
  name: string
  private age: number // 私有属性只可内部访问，实例和子类都不可访问
  protected sex: string // 子类内部可访问，实例不可访问
  static pi: 3.14 // 静态属性，通常是常量，实例和子类都不可访问
  constructor(name: string) {
    this.name = name
  }
  speak() {
    console.log(`${this.name} is speaking`)
  }
}
const p1 = new Person('lin');
```
```ts
// 子类
class Student extends Person {
  grade: number
  constructor(name: string,grade:number) {
    // 若子类有属性，super必须要有，若没有其他属性，super可省略
    super(name)
    this.grade = grade
  }
}
const s1 = new Student('lin', 100)
```
**interface 约束类**
```ts
// ，注意 构造函数、静态属性 与 属性方法的使用方式不同
interface CircleStatic { // 
  new (radius: number): void // 约束构造函数
  pi: number // 约束静态属性
}
interface MusicInterface {
    playMusic(): void  // 约束属性方法
}
interface CallInterface {
    makePhoneCall(): void  // 约束属性方法
}
const Circle:CircleStatic = class Cellphone implements MusicInterface, CallInterface {
  static pi: 3.14
  public radius: number
  constructor(radius: number){
    this.radius = radius
  }
  playMusic() {}
  makePhoneCall() {}
} 
class Car implements MusicInterface {
  playMusic() {}
}
```
## 泛型

```ts
// 基础使用
// 泛型标识符是 <> , 下边表示参数 T 类型，返回 T 类型，
function print<T=string>(arg:T):T {  // 添加了默认值string类型
  return arg
}
const res:string = print('aaa'); 
```
```ts
// type 定义泛型
type Print = <T>(arg: T) => T
const printFn:Print = function print(arg){
  return arg
}
printFn('ssss');
```
```ts
// interface 定义泛型
interface IPrint<T=number>{
  (arg: T): T
}
function print<T>(arg:T){
  return arg
}
const myPrint: IPrint<number> = print
myPrint(123); // 限制了 number 类型
print("123"); // 未限制类型
```
```ts
// 多个参数
function change<T, U>(arr: [T, U]): [U, T] {
  return [arr[1], arr[0]]
}
```
```ts
// 函数副作用

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

#### 常用配置
https://segmentfault.com/a/1190000021749847
```js
{
  "compilerOptions": { // 编译选项
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,         /* Enable incremental compilation */
    "target": "es5",                /* 指定编译之后的版本目录 Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",           /* 指定要使用的模板标准 Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "lib": ["ESNext", "DOM"],       /* 指定要包含在编译中的库文件 Specify library files to be included in the compilation. */
    "allowJs": true,                /* 是否允许编译JS文件 Allow javascript files to be compiled. */
    "checkJs": false,               /* 指定是否检查和报告JS文件中的错误 Report errors in .js files. */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    "composite": true,               /* 是否编译构建引用项目 Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    "removeComments": true,          /* 将编译后的文件注释删掉 Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                  /*是否启动所有类型检查 Enable all strict type-checking options. */
    "noImplicitAny": false,          /* ts会默认没有明确设置类型的为any，设置为true时，若没有设置会报错 */
    "strictNullChecks": false,       /* true时是说null和undefined值不能赋值给非这两种类型的值 */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */
    // "noUncheckedIndexedAccess": true,      /* Include 'undefined' in index signature results */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "skipLibCheck": true,                     /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true  /* Disallow inconsistently-cased references to the same file. */
  }
}

```