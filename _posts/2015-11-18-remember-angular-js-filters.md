---
layout: post
title:  Angularjs Filter 用法备忘
tags: angularjs
---

老是忘记 Angularjs 的一些语法和有哪些内置 filter，写个备忘，我这边用 ng 框架做开发的项目还真是不多，只能自己找点小项目练练手了，一段时间不做就立马生疏啊。

<!--more-->

## 在模板中使用 filter
最简单的，用管道符 “|”：
{% highlight html %}
{% raw %}
{{ expression | filter }}
{% endraw %}
{% endhighlight %}

多个 fitler 连用：
{% highlight html %}
{% raw %}
{{ expression | filter1 | filter2 | ... }}
{% endraw %}
{% endhighlight %}

filter 带参数，用“:”分隔：
{% highlight html %}
{% raw %}
{{ expression | filter:argu1:argu2:... }}
{% endraw %}
{% endhighlight %}

## 在 js 代码中使用 filter
要在 controller 或者 service 中使用 filter，最简单的用法，就是直接注入：
{% highlight js %}
app.controller('demoCtrl',function($scope, dateFilter){
  $scope.date = dateFilter(new Date());  
}
{% endhighlight %}

要使用多个filter的话，就注入“filter之父”——$filter
{% highlight js %}
app.controller('demoCtrl',function($scope, $filter){
  $scope.cash = $filter('currency')(123534);
  $scope.date = $filter('date')(new Date());  
}
{% endhighlight %}

## Angularjs 内置 filter 列表：

### 1. currency
将数字格式化为货币，默认是美元符号，你可以自己传入自定义符号，语法如下：
{% highlight html %}
{% raw %}
{{ currency_expression | currency : symbol : fractionSize }}

<!-- demo -->
{{ 1234.56 | currency }}              //-> $1234.56
{{ 1234.56 | currency : '￥' }}       //-> ￥1234.56
{{ 1234.56 | currency : '￥' : 0 }}   //-> ￥1235
{% endraw %}
{% endhighlight %}

当然，你也可以在 js 中使用该 filter：
{% highlight js %}
$filter('currency')(amount, symbol, fractionSize)
{% endhighlight %}

### 2. number
该 filter 可以将数字用千分位格式化一下，并且可以指定保留的小数位数：
{% highlight html %}
{% raw %}
{{ number_expression | number : fractionSize }}

<!-- demo -->
{{ 1234.56 | number }}            //-> 1,234.56
{{ 1234.56 | number : 1 }}        //-> 1,234.6
{% endraw %}
{% endhighlight %}

js 中用法：
{% highlight js %}
$filter('number')(number, fractionSize)
{% endhighlight %}

### 3. date
这个 filter 对 date 可以提供比较丰富的格式化处理，先看语法。

html template:
{% highlight html %}
{% raw %}
{{ date_expression | date : format : timezone }}

<!-- demo -->
{{ 1288323623006 | date:'yyyy-MM-dd HH:mm:ss' }}  //-> 2010-10-29 11:40:23
{% endraw %}
{% endhighlight %}

javascript:
{% highlight js %}
$filter('date')(date, format, timezone)
{% endhighlight %}

关键在于这个 format，[官网](https://code.angularjs.org/1.4.7/docs/api/ng/filter/date)中有详尽的描述，我就复制、黏贴吧：

- `'yyyy'`: 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010)
- `'yy'`: 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10)
- `'y'`: 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199)
- `'MMMM'`: Month in year (January-December)
- `'MMM'`: Month in year (Jan-Dec)
- `'MM'`: Month in year, padded (01-12)
- `'M'`: Month in year (1-12)
- `'dd'`: Day in month, padded (01-31)
- `'d'`: Day in month (1-31)
- `'EEEE'`: Day in Week,(Sunday-Saturday)
- `'EEE'`: Day in Week, (Sun-Sat)
- `'HH'`: Hour in day, padded (00-23)
- `'H'`: Hour in day (0-23)
- `'hh'`: Hour in AM/PM, padded (01-12)
- `'h'`: Hour in AM/PM, (1-12)
- `'mm'`: Minute in hour, padded (00-59)
- `'m'`: Minute in hour (0-59)
- `'ss'`: Second in minute, padded (00-59)
- `'s'`: Second in minute (0-59)
- `'sss'`: Millisecond in second, padded (000-999)
- `'a'`: AM/PM marker
- `'Z'`: 4 digit (+sign) representation of the timezone offset (-1200-+1200)
- `'ww'`: Week of year, padded (00-53). Week 01 is the week with the first Thursday of the year
- `'w'`: Week of year (0-53). Week 1 is the week with the first Thursday of the year
- `'G'`, `'GG'`, `'GGG'`: The abbreviated form of the era string (e.g. 'AD')
- `'GGGG'`: The long form of the era string (e.g. 'Anno Domini')

为方便使用，angularjs 还预设了一些格式，你也可以用预设的别名：

- `'medium'`: equivalent to `'MMM d, y h:mm:ss a'` for en_US locale (e.g. Sep 3, 2010 12:05:08 PM)
- `'short'`: equivalent to `'M/d/yy h:mm a'` for en_US locale (e.g. 9/3/10 12:05 PM)
- `'fullDate'`: equivalent to `'EEEE, MMMM d, y'` for en_US locale (e.g. Friday, September 3, 2010)
- `'longDate'`: equivalent to `'MMMM d, y'` for en_US locale (e.g. September 3, 2010)
- `'mediumDate'`: equivalent to `'MMM d, y'` for en_US locale (e.g. Sep 3, 2010)
- `'shortDate'`: equivalent to `'M/d/yy'` for en_US locale (e.g. 9/3/10)
- `'mediumTime'`: equivalent to `'h:mm:ss a'` for en_US locale (e.g. 12:05:08 PM)
- `'shortTime'`: equivalent to `'h:mm a'` for en_US locale (e.g. 12:05 PM)

### 4. lowercase / uppercase
这是两个鸡肋 filter，望文生义，将给定的字符串转换成小写/大写的样式，当然了，对中文无效（废话！）
{% highlight html %}
{% raw %}
{{ lowercase_expression | lowercase }}
{{ uppercase_expression | uppercase }}
{% endraw %}
{% endhighlight %}

javascript：
{% highlight js %}
$filter('lowercase')()
$filter('uppercase')()
{% endhighlight %}

### 5. limitTo
用来截取数组或字符串，接收一个参数用来指定截取的长度，如果参数是负值，则从数组尾部开始截取，还可以指定一个起始参数，通常情况下，默认为0：
{% highlight html %}
{% raw %}
{{ limitTo_expression | limitTo : limit : begin }}
{% endraw %}
{% endhighlight %}

javascript：
{% highlight js %}
$filter('limitTo')(input, limit, begin)
{% endhighlight %}

### 6. orderBy
可以将一个数组中的元素进行排序，接收一个参数来指定排序规则，参数可以是一个字符串，表示以该属性名称进行排序。可以是一个函数，定义排序属性。还可以是一个数组，表示依次按数组中的属性值进行排序（若按第一项比较的值相等，再按第二项比较），可以在要排序的字段前加上“-”来进行降序排列。第二个reverse参数是一个布尔值，同样可以利用它来升序或者降序:
{% highlight html %}
{% raw %}
{{ orderBy_expression | orderBy : expression : reverse }}
{% endraw %}
{% endhighlight %}

javascript：
{% highlight js %}
$filter('orderBy')(array, expression, reverse)
{% endhighlight %}

### 7. json
这个 filter 可以把一个 js object 格式化成 json 对象，这个……有啥用？其实真没啥用，但在调试的时候，用处还是蛮大的哦！可以用它来把从 API 里吐出来的数据简单的显示到页面上，检查一下数据的格式或者值是否是预期的。spacing 参数可以让你控制缩进范围：
{% highlight html %}
{% raw %}
{{ json_expression | json : spacing }}
{% endraw %}
{% endhighlight %}

javascript：
{% highlight js %}
$filter('json')(object, spacing)
{% endhighlight %}

### 8. filter
这是一个叫 filter 的 filter…… 这名字起得，太 TM 有水平了，哈哈…… 就是用来处理一个数组，然后可以过滤出含有某个子串的元素，作为一个子数组来返回。可以是字符串数组，也可以是对象数组。如果是对象数组，可以匹配属性的值。它接收一个参数，用来定义子串的匹配规则，还可以跟一个比较器参数，来进一步自定义过滤规则：
{% highlight html %}
{% raw %}
{{ filter_expression | filter : expression : comparator }}
{% endraw %}
{% endhighlight %}

javascript：
{% highlight js %}
$filter('filter')(array, expression, comparator)
{% endhighlight %}

## 自定义 filter
filter 的自定义方式也很简单，使用 module 的 filter 方法，返回一个函数，该函数接收输入值，并返回处理后的结果。话不多说，我们来写一个看看。比如我需要一个过滤器，它可以返回一个数组中下标为偶数的元素，代码如下：
{% highlight js %}
app.filter('evenItems',function(){
  return function(inputArr){
    var arr = [];
    for(var i = 0, x = inputArr.length; i < x; i ++){
      (i % 2 === 0) && arr.push(inputArr[i]);
    }
    return arr;
  }
});
{% endhighlight %}
