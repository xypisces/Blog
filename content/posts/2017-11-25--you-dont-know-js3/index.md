---
title: JS基础查缺补漏--异步与单线程
subTitle: 掌握了解js运行机制，才能更加方便你去理解和编写代码。
date: "2017-11-25"
path: "/know-js-3/"
cover: knowjs.png
---

## 异步与单线程
几个问题
- 同步和异步的区别
- 使用异步的场景
- 获取2017-11-11的格式日期
- 获取随机数，要求是长度一致的字符串格式
- 写一个能遍历对象和数组的通用foreach函数
### 异步
- 由于js是单线程,所以需要异步，比如Ajax,好处就是节约时间，不会阻塞
### 获取日期格式
```js
function formateDate(date){
    if(!date){
        date = new Date()
    }
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    if(month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + date
    }
    return year + '-' + month + '-' day
}
var date = new Date()
var Date = formateDate(date)
console.log(Date)
```
### 长度一致的字符串格式
```js
var random = Math.random()
var random = random + '0000000000'
var random = random.slice(0,10)
console.log(random)
```
### foreach函数
```js
function forEach(obj, fn) {
    var key
    if(obj instanceof Array) {
        obj.forEach(function (item, index) {
            fn(index, item)
        })
    } else {
        for (key in obj) {
            fn(key, obj[key])
        }
    }
}
```