---
layout: post
title:  Javascript 拾遗篇
tags: js
---

好久没有写 blog 了，去了新地方后实在是没时间。JS 发展到现在，其最新的标准 ES6 已经在前端开发中崭露头角了，虽然为了浏览器的兼容性考虑，用 ES6 编写的脚本需要由 babel 来编译成 ES5 的代码，但这并不影响很多项目，如 React、Vuejs 等在开发过程中如火如荼的运用。接下来，为避免遗忘，给自己总结和回顾一些 JS 容易混淆的概念、小技巧，或者小代码，权作拾遗了。
<!--more-->

## 数据类型
废话不多说，JS 的数据类型，基本类型就 5 个：
{% highlight text %}
- Undefined
- Null
- Boolean
- Number
- String
{% endhighlight %}
别跟我扯啥还有数组啊，对象啊这些类型，那些都是引用类型，凡是 typeof 后的值是 `object` 或 `function` 的，都是引用类型。当然，我们还是要摒除那个著名的例外： `typeof null` 的值也为 `object`，至于原因么…… 网上也是一大堆的解释，我这里就不表了。

所以呢，如果我们要精确地判断一个对象的数据类型，应该如何做？目前来讲，最佳方法当然是用 `Object.prototype.toString.call` 来判断，不废话，show you my code:

{% highlight js %}
// 不介意我用 ES6 语法吧？介意也没用，It's my blog!

let toString = Object.prototype.toString // 懒得一遍遍写这么长的东东，赋个变量

toString.call(undefined)      // "[object Undefined]"
toString.call(null)           // "[object Null]"
toString.call(true)           // "[object Boolean]"
toString.call(1234)           // "[object Number]"
toString.call('ok')           // "[object String]"
toString.call(/^/)            // "[object RegExp]"
toString.call([])             // "[object Array]"
toString.call({})             // "[object Object]"
toString.call(new Date())     // "[object Date]"
toString.call(new Error())    // "[object Error]"
toString.call(function(){})   // "[object Function]"

{% endhighlight %}

其实，还有个数据类型容易被人忽略，那就是函数的传参，这种 Array-like 的数据它也有自己的数据类型，如果用以上方法测试的话，会返回 `[object Arguments]`，BUT…… 在一种叫 IE 的垃圾下，IE < 9 时对 arguments 调用 `Object.prototype.toString.call`，结果是 `[object Object]`，而并非我们期望的 `[object Arguments]`。咋整？我们可以用该元素是否含有 callee 属性来判断，或者，我建议，无视它！你懂的！

## 用 void(0) 代替 undefined
先给个结论，用 `void(0)` 代替 `undefined` 这个取值，是最吼滴！原因很简单，`undefined` 在 JS 中不是一个保留词，所以在低版本的 IE 中会有被当做变量重定义的危险。当然，现代浏览器不会发成这种事情，但是，从安全、兼容的角度来讲，用 `void(0)` 来返回 `undefined` 这个值，是一个最佳的选择。

## 位运算的使用场景
在最基本层次上，JS 的数值操作都可以近似看做对 32 位二进制数的操作，具体的解释可以看 [这篇](http://www.cnblogs.com/zichi/p/4787145.html) 博客，我想已经讲得很清楚了。

常用的位操作符有:

- 非 `~`
- 和 `&`
- 或 `|`
- 亦或 `^`
- 右移 `>>`
- 左移 `<<`
- 无符号右移 `>>>`
- 无符号左移 `<<<`

这些操作符可以让你在最基础的二进制层面对数值进行操作，减小系统开销，提高代码效率，下面就讲讲几个运用场景：

### 奇偶判断
{% highlight js %}
2 & 1 // 0
3 & 1 // 1
100 & 1 // 0
777 & 1 // 1
{% endhighlight %}
从以上返回值可以知道，任何数和 1 做一个与运算，返回 0 的必然是偶数，返回 1 的是奇数，比用除以 2 看余数的方法来的简便。

### 向下取整
{% highlight js %}
2.308 | 0 // 2
13.96 | 0 // 13
{% endhighlight %}
利用“或”操作能达成 `Math.floor` 那样的运算结果。其实，连续采用两次“非”操作，也能达成如上的效果，例如：`~~103.95` 会返回数值 `103`。

### 向上取整
{% highlight js %}
2.308 | 1 // 3
{% endhighlight %}
试验几个数字就可得知，数值与偶数做“或”操作，可以向下取整，与奇数做“或”操作，则向上取整

### 变量交换
{% highlight js %}
let num1 = 1, num2 = 2
num1 ^= num2
num2 ^= num1
num1 ^= num2
console.log(num1) // 2
console.log(num2) // 1
{% endhighlight %}
利用“亦或”操作符，装的一手好 X!

### 有符号的左移和右移
2 的 n 次方的装 X 写法！
{% highlight js %}
function power(n) {
    return 1 << n
}
power(5); // 32
{% endhighlight %}

求一个数的二分之一，连这个都要装 X?
{% highlight js %}
let num = 64 >> 1 // 32
{% endhighlight %}

### 无符号右移来判断一个数的正负
{% highlight js %}
function isPos(n) {
  return (n === n >>> 0) ? true : false
}

isPos(-1) // false
isPos(10) // true
{% endhighlight %}

### 总结
以上的例子在平常可能会比较容易用到或看到，也是属于比较容易理解的。一些比较复杂的、难理解的，我觉得应该尽量少用，因为会给阅读者带来困难，也会给自己带来麻烦。

OK, 先“拾遗”到此，后继如还有类似小知识，我继续写！
