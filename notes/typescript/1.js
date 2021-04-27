"use strict";
var married = true;
var age = 10;
var firstName = 'zf';
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
// 元组类型 tuple 数量和类型已知的数组
var zhuFeng = ['zf', 10];
// 枚举类型
var Gender;
(function (Gender) {
    Gender[Gender["BOY"] = 0] = "BOY";
    Gender[Gender["GIRL"] = 1] = "GIRL";
})(Gender || (Gender = {}));
console.log(Gender.BOY);
console.log(Gender.GIRL);
var myColor = [0 /* RED */, 1 /* YELLOW */, 2 /* BLUE */];
// 任意类型
// any: 如果变量定义为any类型，则就跟js差不多，不进行类型检查
// let root:any = document.getElementById('root')
// root.style.color = 'red'
// let element: (HTMLElement|null) = document.getElementById('root');
// 感叹号  非空断言
// element!.style.color = 'green';
// null undefined 是其他类型的子类型
var x;
// x = 1;
// x = undefined;
// x = null;
// never 代表不会出现的值
// 1、作为不会返回的函数的返回值 类型
function error(message) {
    throw new Error('报错了');
}
function loop() {
    while (true) {
    }
    console.log('ok');
}
function fn(x) {
    if (typeof x === 'number') {
        console.log(x);
    }
    else if (typeof x === 'string') {
        console.log(x);
    }
    else {
        console.log(x);
    }
}
// void 和 never 
// void 代表没有任何类型
// 函数没有返回值，你那么就是 void 类型
function greeting() {
    // return undefined   // 可
    // return null;  // 不可
}
// void 可又被赋值为 null undefined ， never 不能包含任何类型
// 返回类型为 void 的函数还能执行，但是 never 的函数不能运行
// Symbol  不重复的值
var s1 = Symbol('key');
var s2 = Symbol('key');
// console.log(s1 == s2);
// BigInt 超大数字，即超过 2^52 - 1 的数字
var max = BigInt(Number.MAX_SAFE_INTEGER); // 2^52 - 1
console.log('bigint ', max + BigInt(1) === max + BigInt(2));
// 类型推导
// 联合类型
var name3;
// 类型断言
var name4;
console.log(name4.toFixed(2));
console.log(name4.length);
console.log(name4); // 双重断言
// 字面量类型和类型字面量
var up = 'Up';
var down = 'Down';
var left = 'Left';
var right = 'Right';
// 可以实现枚举的效果
function move(direction) { }
move('Down');
var p1 = {
    name: '',
    age: 20
};
