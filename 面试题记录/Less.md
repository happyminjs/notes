#### 导入
```css
@import "./a.less"
/* import 之后， a.less 中的变量就可以全部使用了 */
```
#### 变量
```css
@width: 10px;
@height: @width + 10px;
#header{
  width: @width;
  height: @height;
}
```
#### 混合
```css
.bordered{
  border: 1px solid #000;
}
#menu a {
  color: #333;
  .bordered();
}
```
#### 嵌套
```css
#header{
  color: black;
  .logo{
    width: 30px
  }
}
```
#### 运算
会自动做单位转换，如果不同类型的单位，则以左侧操作数的单位为准
```css
@conversion1: 5cm + 10mm; /* 结果是 6cm */
@conversion2: 2-3cm-5mm; /* 结果是 -1.5cm */
@conversion3: 2 + 5px -3cm; /* 结果是4px */
```
* calc()
```css
@var: 50vh/2;
width: calc(50%+(@var-20px));
```
#### 转义
允许字符串作为属性或变量的值，需要字符串前加个 ～
```css
@min768: ～"min-width:768px"
.element {
  @media @min768 {
    font-size: 12px;
  }
}
/* 编译为 */
@media (min-width: 768px) {
  .element{
    font-size: 12px;
  }
}
```
#### 函数
```css
@base: #f04615;
@width: 0.5;
.class{
  width: percentage(@width); /* 返回的是 50% */
  color: saturate(@base, 5%); /* 颜色饱和度增加 5% */
  background-color: spin(lighten(@base, 25%), 8);  /* 颜色亮度降低 25% 并且色相值增加 8  */
}
```
#### 命名空间和访问符
```css
#bundle(){
  .button{
    display: block;
  }
  .tab{ ... }
  .citation { ... }
}
/* 使用 */
#header a {
  color: red;
  #bundle.button();
}
```
#### 映射
```css
#colors{
  primary: blue;
  secondary: green;
}
.button{
  color: #colors[primary];
  border: 1px solid #colors[secondary]
}
```
#### 作用域
先本地查找，然后父级。
```css
@var: red;
#page{
  @var: white;
  #header {
    color: @var; /* white */
  }
}
```
----------------
另外 Less 还有很多的函数方法，比如 if ，boolean，replace，，，，我都没有用过