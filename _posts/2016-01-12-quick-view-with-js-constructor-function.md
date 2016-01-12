---
layout: post
title:  10 分钟搞清 JS 构造函数
tags: js function constructor
---

新年第一篇！

JS 的构造函数可以模拟其他语言“类”的功能，在其原型链（prototype）上进行方法的继承，之中涉及到一些概念，例如公有、私有属性方法，静态属性方法等等……，之前很多概念我也是模糊的很，直到看到一段 demo……。且看以下这段例子，花个10分钟读懂它，那对于构造函数的一些概念，也能清楚很多了。

<!--more-->

其实该段代码来自[这里](http://www.cnblogs.com/jikey/archive/2011/05/13/2045005.html)，我只是稍作排版，向原作者致意！
{% highlight js %}
/*
  构造函数
  使自己的对象多次复制，同时实例根据设置的访问等级可以访问其内部的属性和方法
  当对象被实例化后，构造函数会立即执行它所包含的任何代码
*/
function myObject(msg){
  //特权属性(公有属性)，只在被实例化后的实例中可调用
  this.myMsg = msg;
  this.address = '上海';

  //私有属性
  var name = '豪情';
  var age = 29;
  var that = this;

  //私有方法
  function sayName(){
    alert(that.name);
  }

  //特权方法(公有方法)，能被外部公开访问，这个方法每次实例化都要重新构造而 prototype 是原型共享，所有实例化后，都共同引用同一个
  this.sayAge = function(){
    alert(name); //在公有方法中可以访问私有成员
  }

  /*
    私有和特权成员在函数的内部，在构造函数创建的每个实例中都会包含同样的私有和特权成员的副本，
    因而实例越多占用的内存越多
  */
 }

/*
  公有方法
  适用于通过new关键字实例化的该对象的每个实例
  向prototype中添加成员将会把新方法添加到构造函数的底层中去
*/
myObject.prototype.sayHello = function(){
  alert('hello everyone!');
}

/*
  静态属性
  适用于对象的特殊实例，就是作为Function对象实例的构造函数本身
*/
myObject.name = 'china';

/*
  静态方法
*/
myObject.alertname = function(){
  alert(this.name);
};

//实例化
var m1 = new myObject('111');

//---- 测试属性 ----//
console.log(m1.name); //undefined, 静态属性不适用于一般实例
console.log(m1.constructor.name); //china, 想访问类的静态属性，先访问该实例的构造函数，然后在访问该类静态属性，在此，constructor 的意义很明显了
console.log(m1.address); //上海 此时 this 指的是实例化后的m1
console.log(myObject.name); //china
console.log(myObject.address); //undefined, myObject中的 this 指的不是函数本身，而是调用 address 的对象，而且只能是对象
console.log(myObject.constructor === Function); //true 体会下含义

//---- 测试方法 ----//
myObject.alertname(); //china,直接调用函数的类方法
m1.alertname(); //FF: m1.alertname is not a function, alertname 是myObject类的方法，和实例对象没有直接关系
m1.constructor.alertname(); //china, 调用该对象构造函数（类函数）的方法（函数）
m1.sayHello(); //hello everyone, myObject类的prototype原型下的方法将会被实例继承
myObject.sayHello(); //myObject.sayHello is not a function，sayHello是原型方法，不是类的方法

//---- 测试 prototype ----//
console.log(m1.prototype); //undefined, 实例对象没有prototype
console.log(myObject.prototype); //Object
alert(myObject.prototype.constructor); console.log返回myObject(msg)，此时alert()更清楚，相当于myObject
console.log(myObject.prototype.constructor.name); //china, 相当于myObject.name;
{% endhighlight %}

还有那啥非常复杂的原型链调用图，我就不贴了，仔细研究以下以上代码，我觉得至少90%的概念应该是清楚了。
