---
title: JS基础查缺补漏--作用域与闭包
subTitle: 面试必考题，说明其必须掌握的重要性。
date: "2017-11-18"
path: "/know-js-2/"
cover: knowjs.png
---

## 作用域与闭包
先看几个问题：
- 对变量提升的理解
- 说明this几种不同的使用场景
- 创建10个<a>标签，点击的时候弹出对应的序号
- 如何理解作用域
- 实际开发中闭包的作用

知识点：
- 执行上下文
- 作用域
- 作用域链
- 闭包
- this

### 执行上下文
首先知道js是单线程的，当一个函数调用时会创建一个执行上下文，然后推人函数调用栈，调用结束后会推出栈
```js
var color = 'blue';
function changeColor() {
    var anotherColor = 'red';
    function swapColors() {
        var tempColor = anotherColor;
        anotherColor = color;
        color = tempColor;
    }
    swapColors();
}
changeColor();
```
![1](https://user-images.githubusercontent.com/15880978/34150833-894ad738-e4e4-11e7-9455-e932f1680119.png)
当执行上下文创建的时候有两个生命周期
![599584-391af3aad043c028](https://user-images.githubusercontent.com/15880978/34150979-e9b9cb56-e4e4-11e7-9613-1c3e85690147.png)
而生产变量对象过程中有几个步骤，这些都是在函数执行前作用的，而已函数声明比变量声明优先，当声明变量与函数声明同名时，会被跳过不执行。
![599584-7d131cfe82a20d37](https://user-images.githubusercontent.com/15880978/34151050-216a2730-e4e5-11e7-9655-70a647320b45.png)

### 作用域
作用域只是一套规则，用来管理不同子作用域的变量，例如js在es6之前没有块级作用域，使得各函数间容易污染变量。

### 作用域链
你可以把作用域链当做一条绳子，你可以顺着绳子访问到每个节点上的值

### 关于this
关于this只要记住几句话
- this要在执行时才能确认值，定义时无法确认
- this的指向为调用者函数的拥有者，独立调用则为underfined，非严格模式为window

this的几种执行方法
- 作为构造函数执行
- 作为对象属性执行
- 作为普通函数执行
- call,apply bind

### 闭包
所谓闭包就是在其他执行上下文中，访问到函数的内部变量，当函数被推出后，变量的引用保留而不被销毁，一般应用于模块化私有变量。

闭包的形成的两个条件
- 在函数内部创建新的函数
- 新的函数在执行时访问了函数的变量对象
```js
//闭包的应用
(function () {
    var a = 10;
    var b = 20;

    function add(num1, num2) {
        var num1 = !!num1 ? num1 : a;
        var num2 = !!num2 ? num2 : b;

        return num1 + num2;
    }

    window.add = add;
})();

add(10, 20);
```












