// 展开运算符
function spread(x, ...args) {
  // sum.apply(null, args);
  sum(...args);
}
function sum (a,b,c,d) {
  console.log(a,b,c,d)
}
spread('x', 1, 2, 3, 4)
 

// ... 是浅拷贝
// slice 是一层深拷贝，多层个浅拷贝
// 