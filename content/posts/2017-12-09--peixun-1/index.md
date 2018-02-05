---
title: 实习生培训--ES6相关知识
subTitle: 给公司刚来的实习生做培训，留下资料备份，后续补充。
date: "2017-12-09"
path: "/peixun-es6/"
cover: dva.jpg
---

## Dva中的ES6知识点

### const 与 let

目的：创建块级作用域，let声明变量，const声明常量

let与var用法类似，但是let声明的变量只在所处的代码块中有效
```js
{
    let a = 1;
    var b = 2;
}
console.log(a) //报错
console.log(b) // 2
```
再看一道经典面试题，下面代码会输出什么？
```js
for (var i=1; i<=5; i++) {
    setTimeout( function timer() {
        console.log(i);
    }, i*1000 );
}
```
for循环并不会生成一个作用域，每次循环是跟随变量所在的作用域，而var声明的是全局变量，因此for每次循环中访问的i都是全局中同一个i变量

闭包解决方案
```js
for (var i=1; i<=5; i++) {
    (function(i) {
        setTimeout( function timer() {
            console.log(i);
        }, i*1000 );
    })(i)
}
```

let解决方案
```js
for (let i=1; i<=5; i++) {
    setTimeout( function timer() {
        console.log(i);
    }, i*1000 );
}
```
使用let的时候，每次循环i都是let声明的一个新变量，每次循环都会有类似代码块包起来执行，本质上达到了立即执行函数的作用

const声明的变量，需要赋值且不可以修改，不可以重复声明。
```js
const obj = {
    a: 1,
    b: 2,
}
obj.a = 2
console.log(obj)
```
const所谓的不可以修改值，指的是改变量的地址不会被修改。简单数据类型的值指向的就是地址，而对于对象和数组，只能保证他的内存地址指针不变。

### 模板字符串
目的：方便拼接字符串
```js
const user = 'wrold'
console.log(`hello,${world}`)
```

### 箭头函数
目的：简化匿名函数，让this指向固定化。
```js
const f = function(v) {
    return v+1
}
// 等同于
const f = (v) => {
    return v+1
}
// 等同于
const f = v => v+1
```
箭头函数本身没有this,箭头函数中的this绑定在定义时所在的作用域而是引用外层的this
```js
var obj = {
    a: 2,
    f: function() {
        console.log(this.a)
    }
}
obj.f()

var obj = {
    a: 2,
    f: () => {
        console.log(this.a)
    },
}
obj.f()
```

### 对象解构
```js
const user = { name: 'xxx', age: 2 };
const { name, age } = user;
console.log(`${name} : ${age}`); 
```
可以析构传入的函数参数
```js
const payload = {
    name: 'xxx',
    age: '22',
}
const add = ({name}) => {
    console.log(name)
}
add(payload)
```
反向解构
```js
const name = 'xxx';
const age = 8;
const user = { name, age };  // { name: 'xxx', age: 8 }
```

### spread operator
Spread Operator 即 3 个点 ...

几个用法
```js
//组装函数或者对象
const arr = [1,2,3,4]
const arr2 = [11, 22, 33, ...arr]
console.log(arr2)
const obj = {a:"1",b:"2"}
const obj1 = {a: "3",...obj}
console.log(obj1)
```

### promise
用途：优雅处理异步请求
```js
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```
### generators
用途：异步编程解决方案，用同步写异步
```js
//fetch
getJson = (url) => {
    return fetch(url)
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(err => ({ err }));
}
getJson('/api/xxxxx').then((data) => {
    console.log(data)
}, (err) => {
    console.log(err)
})
//generator
function* request() {
  try {
    let data = yield fetch('/api/xxxxx');
    console.log(data);
  } catch (error) {
    console.log('Oops, error: ', error);
  }
}
```
//例子：依次读取两个文件
//回调函数
```js
fs.readFile(fileA, 'utf-8', function (err, data) {
    //.....
  fs.readFile(fileB, 'utf-8', function (err, data) {
    //......
  });
});
// promies
var readFile = require('fs-readfile-promise');
readFile(fileA)
.then(function (data) {
  console.log(data.toString());
})
.then(function (data) {
  return readFile(fileB);
})
.then(function (data) {
  console.log(data.toString());
})
.catch(function (err) {
  console.log(err);
});
// generators
getData = (url) => {
   return readFile(url)
    .then(data => ({ data })) 
}
function* readfile() {
    let data1 = yield getData(fileA)
    console.log(data1)
    //...
    let data2 = yield getData(fileB)
    //.....
}
```
### Set
```js
// 去重
//对象自带去重
//数组去重
arr = [1,2,3,4,5,1,2,3]
add = (arr) => {
    const arr2 = []
    for(let i=0; i<arr.length; i++) {
        if(arr2.indexOf(arr[i]) === -1){
            arr2.push(arr[i])
        }
    }
    console.log(arr2)
}
add(arr)
//es6去重
arr = [1,2,3,4,5,1,2,3]
arr2 = [1,2,3,4,5,1,2,3]
const arr2 = new Set([...arr2, ...arr])
console.log(arr2)
```