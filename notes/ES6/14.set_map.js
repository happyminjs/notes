// 数据类型 去重 set map
let set = new Set([13,4,2,11,4,4,5,5,11])
console.log(set)
console.log(set.entries())
console.log(set.keys())
console.log(set.values())


let map = new Map([
  ['a', 1],
  ['a', 3],
  ['v', 1],
])
map.set('r', 3)
console.log(map, typeof map)  // 不能有重复的 key
console.log(Object.prototype.toString.call(map)) // [object Map]

// 并集 交集 差集
let arr1 = [1,3,2,4]
let arr2 = [2,4,5,4,6]
function union(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])]
}
// [ 1, 3, 2, 4, 5, 6 ]
console.log(union(arr1, arr2))

// 并集
function intersection(arr1, arr2) {
  let s1 = new Set(arr1)
  let s2 = new Set(arr2)
  return [...s1].filter(item => {
    return s2.has(item)
  })
}
// [ 2, 4 ]
console.log(intersection (arr1, arr2))

function chaji(arr1, arr2) {
  let s1 = new Set(arr1)
  let s2 = new Set(arr2)
  return [...s1].filter(item => {
    return !s2.has(item)
  })
}
// [ 1, 3 ]
console.log(chaji (arr1, arr2))



// 浅拷贝
let o1 = { name: 'zf' }
let o2 = { age: { n: 12 }}

let o3 = {...o1, ...o2}
let o4 = Object.assign(o1, o2)
// o3 和 o4 作用相同，是浅拷贝，只展开一层

// typeof instanceof toString constructor
function deepClone(obj, hash = new WeakMap()) {
  if (obj == null) {
    return obj
  }
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if(typeof obj !== 'object') return obj
  
  if(hash.has(obj)) return hash.get(obj) 
  // 返回上次拷贝的结果，不再递归
  // 如果拷贝过的对象，不需要再次拷贝

  const copy = new Object();
  hash.set(obj, copy)

  for (let key in obj) {
    if (obj.hasOwnProperty(key)){ // 保证是自身的属性，也可以是循环 Object.keys(obj)
      copy[key] = deepClone(obj[key], hash);
    }
  }
  return copy;
}

// 循环引用
var obj1 = { a: 1}
obj1.b = {}
obj1.b.a = obj1.b
console.log(deepClone(obj1))


function sum(a,b){
  return a + b
}
function len(str){
  return str.length
}
function addPrefix(str){
  return '$' + str
}
// 要求实现 compose 方法， compose(addPrefix, len, sum)返回 
function compose(...fns) {
  return function (...args) {
    let lastFn = fns.pop()
    let r = lastFn(...args)
    return  fns.reduceRight((prev, current) => {
      return current(prev)
    }, r)
  }
}
console.log(compose(addPrefix, len, sum)('a', 'b') )