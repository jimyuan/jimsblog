---
layout: post
title:  用纯CSS代码画乐高人偶头像
tags: CSS
---

这个是昨天想起来的一个有趣的事情，看我网站底部，用了个乐高人偶的头像作为我的图标，昨天想着，以前看人家用很简单的DOM结构，用CSS代码画出了许多很复杂的图案，我看着这个头像还不算复杂，向来对CSS不是最拿手，不过借此也想着写一个试试看。

写了之后才发现，有很多地方需要很多的想象力，在我这个小头像绘制的过程中，有着对 `border`、`border-radius`、`box-shadow`等属性的反复运用，当然，为了减少DOM容器的滥用，类似 `selector::before` 和 `selector::after` 等伪对象也是必不可少的。

<!--more-->

昨天用了纯CSS先写了点，把大致的难点都搞定了，由于代码里牵涉到许多计算，所以今天干脆用 <span class="fa fa-link"></span> [Sass](http://sass-lang.com/) 重写了一下，这下轻松多了。Sass代码我就不贴了，把生成好的CSS贴出来吧，对了，有点需要声明的是，由于在页面中引用了 <span class="fa fa-link"></span> [Bootstrap](http://v3.bootcss.com/) 的样式框架，页面中所有的对象都被重新赋予了 `box-sizing: border-box` 的值，已不同于标准的盒模型size的定义。

对了，这里的css绘制我没有把 `clip-path` 和内联SVG方法算在里面，他们都具备矢量路径绘制功能，啥形状不能画出来啊，而且前者由于浏览器的影响，支持度不高，就不在此讨论了。关于 `clip-path` 我在前面的blog [在Sass中实现三角函数计算]({{'/2015/02/12/trigonometry-in-sass.html' | prepend: site.baseurl}})中有写过示例代码。


__HTML:__
{% highlight html %}
<div class="lego-block">
  <div class="head">
    <div class="emotion"></div>
  </div>
</div>
{% endhighlight %}

用了三个容器，由外向内依次是画布、头像、表情。下面的CSS代码好长，Sass的好处体现多多啊！

__CSS:__
{% highlight css %}
.lego-block {
  width: 800px;
  height: 800px;
  position: relative;
  border: 30px solid #000;
  background-color: #e93f33;
}

.head {
  width: 400px;
  height: 340px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -170px;
  border: 20px solid #000;
  background-color: #fff;
  border-radius: 60px;
  box-shadow: 0 0 0 20px #fcf731;
}

.head:before {
  position: absolute;
  content: "";
  display: block;
  width: 200px;
  height: 80px;
  border: 20px solid #000;
  background-color: #fff;
  left: 50%;
  margin-left: -100px;
  border-bottom-width: 0;
  top: -100px;
  border-radius: 20px 20px 0 0;
  box-shadow: -10px -10px 0 10px #fcf731, 10px -10px 0 10px #fcf731;
}

.head:after {
  position: absolute;
  content: "";
  display: block;
  width: 260px;
  height: 50px;
  border: 20px solid #000;
  background-color: #fff;
  left: 50%;
  margin-left: -130px;
  border-top-width: 0;
  bottom: -70px;
  border-radius: 0 0 20px 20px;
  box-shadow: -10px 10px 0 10px #fcf731, 10px 10px 0 10px #fcf731;
}

.emotion {
  width: 120px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -60px;
  margin-top: -100px;
  border-bottom: 15px solid #000;
}

.emotion:before {
  content: "";
  display: block;
  background-color: #000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 80px;
  left: -40px;
}

.emotion:after {
  content: "";
  display: block;
  background-color: #000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 80px;
  right: -40px;
}
{% endhighlight %}
