---
layout: post
title:  “codewars” 挑战代码赏析（一）
tags: js codewars
---

“[代码战争](http://prototypejs.org/)”这种网站，通过挑战一道道的既定习题来让自己逐步完善对一些代码和算法的掌握，并且支持 JS, RUBY, PYTHON... 等众多的语言，并且亮点在于等你挑战完后，可以查看其他大神对于此题的代码，往往有时自己觉得答的很满意的题，可看完那些高票答案后，还会被 shock 到，你写了 N 行的代码，人家1、2行搞定了，差距啊……

以下就挑选一些自己在挑战过程中挑选的一些觉得对自己受益较大的题目，记下来供自己参考揣摩：

<!--more-->

##1. 将句子的首字母大写
{% highlight text %}
'hello javascript' => 'Hello Javascript'
{% endhighlight %}
这是一道字符串操作题：
{% highlight js %}
String.prototype.toJadenCase = function () {
  return this.replace(/(^|\s)[a-z]/g, function(x){ return x.toUpperCase();});
};
{% endhighlight %}

__小结:__ 本体应该是挑战前期遇到的简单题目，主要考点应该是 `replace` 的高级用法，利用正则匹配，第二个参数是个 callback，我们用的比较少。

##2. 将数组扁平化，仅转化一层即可
{% highlight text %}
[1,[2,3],[4,5]] => [1,2,3,4,5]
{% endhighlight %}
先来看看我写的：
{% highlight js %}
var flatten = function (array){
  var arr = [];
  for(var i=0, x=array.length; i<x; i++) {
    Array.isArray(array[i]) ? [].push.apply(arr, array[i]) : arr.push(array[i]);
  }
  return arr;
}{% endhighlight %}

以为已经算比较完美的答案了，没想到提交后看到这个高票答案后，我的心是碎的……
{% highlight js %}
var flatten = function (array){
  return [].concat.apply([], array);
}
{% endhighlight %}

__小结:__ 就你会用 push.apply？人家巧妙的运用了 concat.apply，将需要扁平化的数组当做参数传递了进去，我还在傻乎乎的用循环一个一个去 push，唉~~~

##3. 为数组添加方法，寻找该数组中的最大值
本题总算找回些颜面，我做出的基本就是最优解之一：
{% highlight js %}
Array.prototype.max = function(){
  return Math.max.apply(null, this);
}
{% endhighlight %}
But, 一些大神们随便小露一手的奇技淫巧，也会让我们景仰一番：
{% highlight js %}
Array.prototype.max = function() {
  return Math.max(...this);
}
{% endhighlight %}
__小结:__ 这 `...` 何许意思？查了下资料，原来是 ES6 中新增的运算符，虽然现在用途还不大，不过还是开阔了眼界！那回头再看第二题，类推一下，那个高票答案也能改写成 `return [].concat(...array)` 了吧，嘿嘿！

##4. 设计一个只运行一次的函数
说实话，这个对我来讲，真有点摸不着头脑，只能看下现成答案了：
{% highlight js %}
function once(fn) {
  var call = true;
  return function() {
    if (call) {
      call = false;
      return fn.apply(this, arguments);
    }
  }
}
{% endhighlight %}
__小结:__ 利用闭包的特性，将判断变量常驻内存，closure is my short slab！

##5. 数组或字符串处理
{% highlight text %}
'abbdcc' => ['a','b','d','c']
[3,4,4,6,2,2] => [3,4,6,2]
{% endhighlight %}
编写一方法，将所给字符串或数组处理成如例子那样：
{% highlight js %}
function uniqueInOrder(it) {
  var result = [], last;
  for (var i = 0; i < it.length; i++) {
    it[i] !== last && result.push(last = it[i]);
  }
  return result;
}
{% endhighlight %}
__小结:__ 这题我做的时候复杂了点，还要先判断是 String 还是 Array，将 String 转成 Array 后才进行处理，后来这个高票答案告诉我，String 也是可以通过下标取值的，唉，low 了！另一个小技巧就是，last 变量赋值传参两不误！

##6. 将句子中单词长度>4的单词反写
{% highlight text %}
'black or white' => 'kcalb or etihw'
{% endhighlight %}
又是一道考数组操作的题，传统解法如下：
{% highlight js %}
function spinWords(str){
  return str.split(' ').map(function(word) {
    return (word.length > 4) ? word.split('').reverse().join('') : word;
  }).join(' ');
}
{% endhighlight %}
氮素！全能的大神此刻又淫荡了一回，正则大法，往往有时四两拨千斤：
{% highlight js %}
function spinWords(str){
  return str.replace(/\w{5,}/g, function(w) {
    return w.split('').reverse().join('')
  });
}
{% endhighlight %}
__小结:__ 类似这种字符串处理，有时用正则是最有效的手段，但正则也是一个比较难掌握的技巧，要苦练！另外这个 `replace` 的运用技巧，咱在第一题里已经见过了。

##7. 将rgb值转为16进制，参数范围在0-255，超出范围则取最近有效值
{% highlight text %}
128,180, 250 => 80B4FA
120,300, -10 => 78FF00
{% endhighlight %}
我的代码基本算是在最优代码范围内，不过以下代码的取值范围操作参考了最优代码的做法：
{% highlight js %}
function rgb(r, g, b){
  return [].slice.call(arguments).map(function(v){
    var c = Math.max(0, Math.min(255, v)).toString(16);
    return c.length===2 ? c : '0' + c;
  }).join('').toUpperCase();
}
{% endhighlight %}
__小结:__ 精华在此处 `Math.max(0, Math.min(255, v))`，巧妙的利用 `Math.min()` 和 `Math.max()` 运算，将 v 值限定在了指定的范围内！另外注意 `toString()` 的用法，此方法可以通过传入进制参数，将 Number 类型在转成 String 类型的同时，转换成指定的进制，进制范围在 2-36 之间。

##8. 在数组中寻找与给定单词含相同字母及长度的字符串
{% highlight text %}
给定字符串 'aabb'，则：
['abab', 'abcd', 'aabbb', 'bbaa', 'babac'] => ['abab', 'bbaa']
{% endhighlight %}
又是一道考 Array 和 String 操作的题，通过以上挑战的锻炼，这题基本没多大难度：
{% highlight js %}
function anagrams(word, words) {
  return words.filter(function(item){
    return item.split('').sort().join('') === word.split('').sort().join('');
  });
}
{% endhighlight %}
__小结:__ 这题主要考思路，思路对了，这个算法就简单了，将字符串拆分成数组，经过排列后再 join，这样就算再无序的两组 String 也可以在同一个基础上进行比较了。

##9. 根据给定的选择符字符串，计算2者的权重
{% highlight text %}
compare('div.class #id', 'div.class') => 'div.class #id'
compare('div.class', '#id') => '#id'
compare('div.class #id', 'span#id .class') => 'span#id .class' // 权重一样取最后一个
{% endhighlight %}
这题的主要运用场景，就是用来计算 CSS 选择器的权重，ID > CLASS > ELEMENT...，这题，说实话我写的方法，前面通过了一系列的功能测试，在2个超长字符串的测试中失败了，找不到原因，而且我也没啥好的思路，只好投降，将高票答案贴在下面，供自己分析欣赏：
{% highlight js %}
function compare(a,b){
  function d(h,c){ return c ? (c.match(h) || []).length : d(h,b) - d(h,a);}
  return (d(/#/g) || d(/\./g) || d(/(^| )\w/g)) < 0 ? a : b;
}
{% endhighlight %}
__小结:__ 这题没啥好小结，这就是算法的精妙，我读书少，甘拜下风！

##10. 将数组中的0移到末尾
{% highlight text %}
['a',0,0,3,'b',0,8] => ['a',3,'b',8,0,0,0]
{% endhighlight %}
相比上面这题，这道挑战就简单好多：
{% highlight js %}
var moveZeros = function (arr) {
  return arr.filter(function(x) {return x !== 0;}).concat(arr.filter(function(x) {return x === 0;}));
}
{% endhighlight %}
__小结:__ 连用2个 filter 将非0数组和为0数组过滤出来，用 concat 连接，简单高效！

作为第一部分，选了十道认为有必要的题，拿出来晒一晒，等我继续挑战，继续晒题…… がんばって！
