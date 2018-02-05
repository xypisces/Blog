---
title: JS基础查缺补漏--变量类型与原型链
subTitle: 正所谓，欲穷千里目，先打好地基...
date: "2017-11-11"
path: "/know-js-1/"
cover: knowjs.png
---

## 变量类型与变量计算
相关知识点
- typeof能判断几种类型
- ===与==区别
- 内存空间问题
- 变量的存储方式
- 关于JSON

### typeof
typeof 只能分辨出值类型（即五种基本类型null,underfined,Boolean,Number,String），无法分辨出引用类型（Function, Array, Object等都会被识别为Object）（除了函数）。
```js
function fn() {}
console.log(typeof(fn)) //Function
```

### ===与==
下面几种情况会发生强制类型转换
- 字符串拼接  // 1+'1'  // '11'
- ==
- if语句 （if里面的判断会转换成true，false）
- 逻辑运算符
所以当需要判断进行判断的时候尽量用全等===，除了下面这个
```js
// 判断对象的属性是否存在
obj.a == null // obj.a === null || obj.a === underfined
```
### 内存空间问题
首先先理解三种数据结构
- 栈 （先进后出）  应用于执行上下文，函数调用栈
- 堆  （按key-value的形式） 应用于js运行中的变量存储
- 队列 （先进先出） 应用于事件循环机制

### 值类型和引用类型
像数字和字符串这类属于值类型，会单独分配地址。而像对象,数组,函数属于引用类型，使用地址进行引用。
```javascript
// 值引用
var a = 100
var b = a
a = 200
console.log(b) // 100
// 引用类型
var a = {age:20}
var b = a
a.age = 21
console.log(b.age) //21
```

###JSON
记住JSON是数据格式也是js对象
```js
//常用方法，可用于对象的深拷贝
JSON.stringify({a:10, b:20}) //对象变成字符串
JSON.parse('{"a":10,"b":20}') // 字符串变成对象
```

## 原型与原型链
- 判断变量是数组类型
- 写一个原型链继承的例子
- 描述new一个对象的过程
- zepto源码中如何使用原型链

### 构造函数
var a = {} // var a = new Object()
a instanceof Array //判断变量是不是数组
### 原型规则
所有引用类型都有__proto__属性 //obj.__proto__
所有的函数都有一个prototype属性 // func.prototype
所有的引用类型的__proto__属性指向它的构造函数的prototype属性值 // obj.__proto__ === Object.prototype
for(item in f){
 if(f.hasOwnPropety(item)){}
}
当试图得到一个对象的属性时，如果这个对象本身没有这个属性，那就会去它的__proto__中去寻找
### 原型链  
```js
function Elem(id){
   this.elem = document.getElementById(id);
}
Elem.prototype.html = function(val){
      var elem = this.elem
      if(val){
          elem.innerHTML = val
      }else{
         return elem.innerHTML 
      }
}
var div1 = new Elem('hello')
div1.html('hello wrold')
```
### instanceof
前面提到无法用typeof判断一个变量是否为数组，用instanceof就可以，instanceof会根据原型链，追寻到构造函数中去，因而可以进行判断。

### new的过程
简单来说就四个步骤
- 创建一个新的对象 
- 将this指向这个新的对象 // var this = {}
- 给对象添加属性和方法 // this.fn = {}
- 返回这个对象
