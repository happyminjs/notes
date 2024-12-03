// let title = require('./title')
// let content = require('./content.txt')
// console.log(title)
// console.log(content.default)
// console.log(process.env.NODE_ENV)

// const path = require('path')
// const memoryFileSystem = require('memory-fs')
// const fs = new memoryFileSystem();

// fs.mkdirpSync(path.resolve('dir'))
// fs.writeFileSync(path.resolve('dir/file.txt'), 'hello world', 'utf8')
// const content = fs.readFileSync(path.resolve('dir/file.txt'))
// console.log(content.toString())

// import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render('hello', document.getElementById('root'));

// /**
//  *
//  * @param {*} target
//  * @param {*} key
//  * @param {*} descriptor
//  */
// function readonly(target, key, descriptor) {
//   console.log(target, key, descriptor);
//   descriptor.writable = false;
// }
// class Circle {
//   @readonly PI=3.14;
// }

// const c1 = new Circle();
// c1.PI = 3.15;
// console.log(c1.PI);
