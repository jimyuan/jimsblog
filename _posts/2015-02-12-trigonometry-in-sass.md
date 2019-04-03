---
layout: post
title:  在Sass中实现三角函数计算
jsfile: Math
tags: Sass CSS
---

这是由一个瞎折腾的事件引发的，起因是这样的， 我想在web里画一个等边三角形，当然做法有好几种，canvas、svg、css…… 都可以，我在比较哪种方法更对我的路，当然是纯css代码搞定就很好，查了好多资料，其中最通常的就是用块对象的大粗边，这种做法已经不稀奇了，例如下面的例子：

<!--more-->

{% highlight css %}
.triangle{
  width: 0; height: 0;
  border-width: 50px;
  border-style: solid;
  border-color: blue red yellow black;
}
{% endhighlight %}

做出来就下面那样，要哪个角度，就将其他的颜色设成transparent就行了。
<div style="width: 0; height: 0;border-width: 50px; border-style: solid; border-color: blue red yellow black;"></div>

当然，在CSS3中还有种新的方法叫`clip-path`的，可以绘制多边形，用法非常灵活，但是去了 <span class="fa fa-link"></span> [caniuse](http://caniuse.com/#search=clip-path)网站查了下，支持度貌似还很不够，不过是个不错的方法，例如下面的代码：
{% highlight css %}
.polygon {
  width: 100px;
  height: 100px;
  background: #f00;
  -webkit-clip-path:polygon(50px 0, 100px 37px, 82px 100px, 19px 100px, 0 37px);
}
{% endhighlight %}

（在查阅文档的过程中，一个CSS3的新属性`shape-outside`也蛮有意思的，这个以后再说……）

看到下面的五边形了吗？没有？那你的浏览器蛮渣的，呵呵~~
<div style="width: 100px; height: 100px; background: #f00; -webkit-clip-path:polygon(50px 0, 100px 37px, 82px 100px, 19px 100px, 0 37px);"></div>

当然，这个等边五边形五个顶点的坐标为啥是这些数字，拜托，就是用三角函数算出来的，这不，咱快切入正题了…………

下面来道中学数学题：等边三角形高为y，求边长是多少？

用js的语法来表达，边长的长度`x = Math.tan(30 * Math.PI / 180) * y * 2`( JS里三角函数用的是弧度，要把角度转换一下才能计算 ), 问题解决了，我用该方法根据给定的高度，就能算出在一个矩形里用polygon画等边三角形路径时3个点得坐标了：`polygon(0.5x 0, x y, 0 y)`, y给定后，x的值通过以上方法就可以得出啦！

其实这么简单的事情，是不值得太高兴的，问题来了，如果我想在 <span class="fa fa-link"></span> [Sass](http://sass-lang.com/) 中要将这个东西封装一下，写一个mixin，传入高度，立刻给我生成一个等边三角形的CSS代码，那就省力了吧，嘿嘿，实现不了！

原因很简单，在Sass中，能够进行简单的加减乘除四则运算，但是没有内建的类似JS的`Math.sin()`或`Math.cos()`等三角函数的计算方法，傻眼了吧，没有三角函数，就没法做上面的事儿啊！

#### 数值方法 (NUMERICAL METHODS)
问题总是可以解决的，但是我的大部分数学知识早就灰飞烟灭了，如果你掌握了那啥 <span class="fa fa-link"></span> [数值分析](http://zh.wikipedia.org/wiki/数值分析), 那啥 <span class="fa fa-link"></span> [CORDIC算法](http://en.wikipedia.org/wiki/Cordic)，那啥 <span class="fa fa-link"></span> [Chebyshev多项式](http://en.wikipedia.org/wiki/Chebyshev_polynomial)，或者那啥 <span class="fa fa-link"></span> [极值逼近算法](http://en.wikipedia.org/wiki/Remez_algorithm)，这就不是问题啦！天哪，我在上面写了点啥？所以啊，我复制、粘贴了 <span class="fa fa-link"></span> [Taylor展开式](http://en.wikipedia.org/wiki/Taylor_series)来实现咱们的`sin()`或者`cos()`计算：
{% raw %}
<figure class="equation">$$ \begin{aligned} \sin x & = \sum _{n=0}^{\infty}{\frac {(-1)^{n}}{(2n+1)!}}x^{{2n+1}} = x - {\frac {x^{3}}{3!}} + {\frac {x^{5}}{5!}} - \cdots \\\\ \cos x & = \sum _{n=0}^{\infty}{\frac {(-1)^{n}}{(2n)!}}x^{{2n}} = 1 - {\frac {x^{2}}{2!}} + {\frac {x^{4}}{4!}} - \cdots \end{aligned} $$</figure>
{% endraw %}

哦，天那，上面又是啥玩意儿？习惯一下，随便看两眼…… 不管如何，我们要依靠上面的算法来解决问题啊亲！所以我们需要把以上的算法翻译成Sass能认的语法。

#### 乘方 (POWER)
上面的 <span class="fa fa-link"></span> [Taylor展开式](http://en.wikipedia.org/wiki/Taylor_series)中，我们需要对x<sup>2n+1</sup>和x<sup>2n</sup>进行展开操作，但是在现有的Sass中没有这种运算方法，所以我们先先写个 _power function_:
<figure class="equation">$$ \begin{aligned} b^{n} & = {\overbrace {b \times \cdots \times b}^{n}} \\\\ b^{-n} & = {\frac {1}{\underbrace {b \times \cdots \times b}_{n}}} \end{aligned} $$</figure>

将“火星语”翻译成Sass能理解的语法：
{% highlight scss %}
@function pow($number, $exp) {
  $value: 1;
  @if $exp > 0 {
    @for $i from 1 through $exp {
      $value: $value * $number;
    }
  }
  @else if $exp < 0 {
    @for $i from 1 through -$exp {
      $value: $value / $number;
    }
  }
  @return $value;
}
{% endhighlight %}

#### 阶乘 (FACTORIAL)
表达式(2n+1)!和(2n)!需要一个阶乘算法的函数，不过这要比上面简单的多：
<figure class="equation">$$ n! = { \begin{cases} 1 & \text{if } n = 0 \\\\ (n-1)! \times n & \text{if } n > 0 \end{cases} } $$</figure>

同样，将算法转换成Sass的语法：
{% highlight scss %}
@function fact($number) {
  $value: 1;
  @if $number > 0 {
    @for $i from 1 through $number {
      $value: $value * $i;
    }
  }
  @return $value;
}
{% endhighlight %}

#### 正弦、余弦和正切 (SINES, COSINES AND TANGENTS)
现在，必要的算法工具已准备妥当，可以创建我们的三角函数算法了，让我们跟随着 <span class="fa fa-link"></span> [Taylor展开式](http://en.wikipedia.org/wiki/Taylor_series)的脚步，奔跑吧，兄弟！
{% highlight scss %}
@function pi() {
  @return 3.14159265359;
}

@function rad($angle) {
  $unit: unit($angle);
  $unitless: $angle / ($angle * 0 + 1);
  // If the angle has 'deg' as unit, convert to radians.
  @if $unit == deg {
    $unitless: $unitless / 180 * pi();
  }
  @return $unitless;
}

@function sin($angle) {
  $sin: 0;
  $angle: rad($angle);
  // Iterate a bunch of times.
  @for $i from 0 through 10 {
    $sin: $sin + pow(-1, $i) * pow($angle, (2 * $i + 1)) / fact(2 * $i + 1);
  }
  @return $sin;
}

@function cos($angle) {
  $cos: 0;
  $angle: rad($angle);
  // Iterate a bunch of times.
  @for $i from 0 through 10 {
    $cos: $cos + pow(-1, $i) * pow($angle, 2 * $i) / fact(2 * $i);
  }
  @return $cos;
}

@function tan($angle) {
  @return sin($angle) / cos($angle);
}
{% endhighlight %}

看看效果如何，杠杠大！
{% highlight scss %}
@debug sin(pi()/4); // => 0.70711
@debug cos(45deg);  // => 0.70711
{% endhighlight %}
Yeah! Give me five!

有了以上利器，我刚才说的在Sass中写等边三角形，简直就易如反掌了啊！

*注：这里我在scss里把私有前缀省略了，建议编译的时候使用 [autoprefixer](https://www.npmjs.com/package/autoprefixer) 等 POSTCSS 工具帮助你自动添加前缀，在scss中，我们只写标准css语法*
{% highlight scss %}
@mixin equ-triangle($height){
  $h: $height;
  $w: tan(30deg) * 2 * $h;
  width: $w;
  height: $h;
  clip-path: polygon($w/2 0, $w $h, 0 $h);
}

.my-triangle {
  @include equ-triangle(100px);
  background: #f00;
}
{% endhighlight %}
编译出来的CSS代码如下：
{% highlight css %}
.my-triangle{
  width:115.47005px;
  height:100px;
  background:#f00;
  -webkit-clip-path:polygon(57.73503px 0, 115.47005px 100px, 0 100px);
     -moz-clip-path:polygon(57.73503px 0, 115.47005px 100px, 0 100px);
      -ms-clip-path:polygon(57.73503px 0, 115.47005px 100px, 0 100px);
          clip-path:polygon(57.73503px 0, 115.47005px 100px, 0 100px);
}
{% endhighlight %}

<div class="my-triangle"></div>
(啥，你又看不到？放着高大上的Chrome不用，那怪谁？)

#### 补充
利用以上计算出来的结果，我们用内联svg的语法来画一个等边三角形试试：
{% highlight html %}
<svg width="115.47" height="100">
    <polygon points="57.73 0, 115.47 100, 0 100" fill="red"></polygon>
</svg>
{% endhighlight %}
<svg width="115.47" height="100">
    <polygon points="57.73 0, 115.47 100, 0 100" fill="red"></polygon>
</svg>

当然啦，我们上面辛苦的来的_Sass function_不能白瞎，得充分利用！干脆把svg得到的图形作为背景图，用CSS定义出来如何？
{% highlight scss %}
.svg-triangle {
  $h: 100;
  $w: tan(30deg) * 2 * $h;
  width: $w + px;
  height: $h + px;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='#{$w}' height='#{$h}'><polygon points='#{$w/2},0 #{$w},#{$h} 0,#{$h}' fill='red'/></svg>");
}
{% endhighlight %}
编译后得到：
{% highlight css %}
.svg-triangle{
  width:115.47005px;
  height:100px;
  background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='115.47005' height='100'><polygon points='57.73503,0 115.47005,100 0,100' fill='red'/></svg>")
}
{% endhighlight %}
look! 这样做得好处就是内联svg的兼容性比上面的`clip-path`强好多。
<div class="svg-triangle"></div>
<hr>
以上内容基本参考自：[<span class="fa fa-link"></span> https://unindented.org/articles/trigonometry-in-sass/](https://unindented.org/articles/trigonometry-in-sass/)
