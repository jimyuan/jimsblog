---
layout: post
title:  用纯 CSS 代码绘制时钟
tags: css
---

俗话说，半年不开张，开张吃半年。你看这半年都不更新的博客，终于又要上新啦！其实这次的动机，源于昨天在知乎上看到有篇文章，有个小朋友号称用纯 CSS 做了一个时钟，于是点进去看了下，啥乱七八糟的啊，基本上还是一大坨 JS 代码啊！看评论，大家跟我一个想法，这算哪门子“纯” CSS 啊？
<!--more-->

看完之后，我自己回头想了想，如果真用“pure CSS” 来实现，是不是具有可行性？粗略一考虑，发觉表盘的绘制一定没问题，而用 `animation` 动画可以解决三根指针的旋转，剩下的当前时间获取，看来只能依靠 JS 了，当然，如果没有 JS，这个时钟还是能够运行的，只不过不能初始化当前时间而已。

考虑好后，咱就动手做吧，昨天弄了一个下午，初具雏形了。当然跟漂亮、美观啥的没多大关系，毕竟纯 CSS 的局限性还是有的，接下来我们就来逐步揭示一下这个时钟是如何用 CSS 来完成的。以下代码，为了简洁起见，HTML 使用 [pug](https://pugjs.org/api/getting-started.html) 来书写，CSS 当然用我最熟悉的 [SCSS](http://sass.bootcss.com/) 语法, 那一点点 JS 则采用 ES6 语法。

## 第一步：表盘设计
HTML(pug):
```
- var val = 1;
div.clock
  ul.mark
    while val <= 12
      li(data-time=val++)
```
很简单，编译成 HTML 就是:
```html
<div class="clock">
  <ul class="mark">
    <li data-time="1"></li>
    <li data-time="2"></li>
    <li data-time="3"></li>
    ...
    <li data-time="12"></li>
  </ul>
</div>
```

CSS 方面，必要的东东都初始化一下：
```scss
// 封装容器长宽定义
@mixin size($w, $h: $w) {
  width: $w;
  height: $h;
}
 
// 封装了一下容器定位的 CSS 代码
@mixin position($position, $args) {
  @each $o in top right bottom left {
    $i: index($args, $o);
    @if $i and 
        $i + 1 <= length($args) and 
        type-of(nth($args, $i + 1)) == number {
      #{$o}: nth($args, $i + 1);
    }
  }
  position: $position;
}
 
// 再次封装一下绝对定位的 mixin， 其他定位方式本次用不到，就先不封装了
@mixin absolute($args: '') {
  @include position(absolute, $args);
}

// 初始化全局的盒模型定义
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
```

然后我们就开工了，对表盘你进行 CSS 定义：

```scss
// 给表盘设个基本尺寸(直径长度)，这个变量后面计算定位的时候，会反复用到
$cw: 200px;
// 表盘刻度所在容器的尺寸，基本定位为表盘直径的 1/10
$mw: $cw / 10;

// 表盘
.clock {
  // 表盘大小
  @include size($cw);
  position: relative;
  border-radius: 50%;
  // 以下是给表盘居中定位和搞点边框效果，这个不是主要代码
  margin: 5% auto;
  box-shadow: 0 0 0 5px #333,
              0 0 0 10px #555,
              0 0 0 15px #777,
              0 0 0 20px #aaa;
}
```
嗯，现在大概就是…… 这个样子：

![clock: face]({{ '/img/clock/face-1.gif' | prepend: site.baseurl }})

下面来加刻度，如 HTML 所示，所有 1-12 的数字，都写在了一个 `ul.mark>li*12` 的列表里：
```scss
// 1-12 time mark
.mark {
  // 先给 ul 定个位，使容器左、右、上都紧贴父容器
  @include absolute(top 0 left 0 right 0);
  // 以下三项，清洗掉 ul 容器的各种预设值
  margin: 0;
  padding: 0;
  list-style-type: none;
  > li {
    // 定义刻度所在容器，先全给水平居中了，给一个合适的 top 值，让刻度容器和父容器隔开一定空间
    @include absolute(left 50% top $mw / 2);
    // 刻度所在容器大小定义
    @include size($mw);

    display: block;
    // 修正一下偏移量，使其妥妥居中
    margin-left: $mw / -2;
    // 重要：给即将要做旋转的刻度容器定义旋转中心，根据计算，定位在父容器的中心
    transform-origin: $mw / 2 ($cw - $mw) / 2;
    // 所有 1-12 的时刻不直接写在容器内，而是映射到它的伪元素中
    &::after {
      // 设置伪元素的大小，同 li 大小相当
      @include absolute(top 0 right 0 bottom 0 left 0);
      // 通过 attr 函数接收之前写在容器属性里的时间刻度值
      content: attr(data-time);
      text-align: center;
      // 字体大小，可以进行微调以适应不同的字体
      font-size: 20px;
      line-height: $mw;
    }
  }
  // 做一个循环，让 12 个刻度按照 30 度，也就是 1/12 圈为间隔，绕之前定义的中心散开
  @for $time from 1 through 12 {
    > li:nth-child(#{$time}) {
      transform: rotate($time / 12 * 1turn);
      // 这就是要把刻度映射到伪元素的原因，将伪元素按父元素旋转的角度逆转，保持刻度字体水平
      &::after {
        transform: rotate($time / 12 * -1turn)
      }
    }
  }
}
```
Look! 这个表盘有了！有点意思吧，请自动忽略配色：

![clock: face]({{ '/img/clock/face-2.gif' | prepend: site.baseurl }})

## 第二步：安装指针

按照我自己的设想，以表盘宽度的一半做三个容器，左下角定位在表盘中心处，同时定义这三个容器的左边样式当做指针，而后绕这个表盘中心进行旋转，基本上就成了。这里预设秒、分、时三根针的宽度分别为 1px, 3px, 5px，配色为红、绿、蓝，够乡村吧！我滴老家，就住在这个屯。。。

HTML 代码添加三个指针容器：
```
- var val = 1;
div.clock
  ul.mark
    while val <= 12
      li(data-time=val++)
  div.hand-wrap
    div.hand-hour
    div.hand-minute
    div.hand-second
```
指针组的 CSS 代码如下：
```scss
.hand-wrap {
  // 指针组容器所在定位，表盘的右上 1/4 处
  @include absolute(top 0 right 0 bottom 50% left 50%);
}
```
三根指针的初步 CSS 代码，因时针和分针都有不同的宽度，所以为了使其水平中心对着表盘中心，分别偏移 2px 和 1px 用以修正。同时，赋以不同的 top 值用来影响其表现出的长度，并且在 z 轴方向定义不同的值使其按照现实中秒、分、时由上而下的堆叠顺序：
```scss
// 时针
.hand-hour {
  @include absolute(top 50% right 0 bottom 0 left -2px);

  z-index: 10;
  border-left: 5px solid blue;
  transform-origin: 2px bottom;
}

// 分针
.hand-minute {
  @include absolute(top 25% right 0 bottom 0 left -1px);

  z-index: 20;
  border-left: 3px solid green;
  transform-origin: 1px bottom;
}

// 秒针
.hand-second {
  @include absolute(top 5% right 0 bottom 0 left 0);

  z-index: 30;
  border-left: 1px solid red;
  transform-origin: left bottom;
}
```

OK! 很幸运没碰到啥麻烦，我们就定义好了三根指针，只不过现在它们都处于初始状态，都指着 12 点的位置：

![clock: hands]({{ '/img/clock/hands-group.gif' | prepend: site.baseurl }})

## 第三步：指针运动

接下来就是指针的动画效果了，如何保证三根针的运动效果，一开始可能会毫无头绪，可仔细一想，一点也不难啊！秒针 60 秒转一圈，分针 60 × 60 秒一圈，时针 60 × 60 × 12 秒一圈，定义一个 keyframes，为每个指针赋予不同的动画时间，这个效果细想下来，比想象中容易千倍啊！

来，为三根指针添加 animation 动画，直接看代码：

```scss
// 时针
.hand-hour {
  animation: round linear infinite 60s * 60 * 12;
}

// 分针
.hand-minute {
  animation: round linear infinite 60s * 60;
}

// 秒针
.hand-second {
  // 这里采用 steps 的时间轴运动方式，主要是为了模仿现实中秒针一顿一顿的运动状态
  animation: round steps(60, end) infinite 60s;
}

// 关键帧定义
@keyframes round {
  to { transform: rotate(1turn) }
}
```

看，这个动画定义，简单到令人发指了！接下来，为了稍作一些美化，我要设计一个小菠萝头，盖住三根指针那用以旋转的根部，使其显得不是那么突兀，也不用再添加一个 DOM 节点了，充分利用 `.hand-wrap` 的一个伪元素当容器即可：

```scss
.hand-wrap {
  ...
  
  &::before {
    // 以刻度容器的一半为容器尺寸
    @include size($mw / 2);
    // 以表盘中心为基准居中定位
    @include absolute(bottom $mw / -4 left $mw / -4);

    content: '';
    z-index: 50;
    display: block;
    background: silver;
    border-radius: 50%;
  }
}
```

太好了，此时，依据以上代码，这只钟表已经绝对能走了，只不过每次都是从午夜 12 点，也就是三针合一的时候开始，如何为之指定当前的时间呢？也就是说如何为三根针指定初始的旋转角度？

![clock: all]({{ '/img/clock/clock.gif' | prepend: site.baseurl }})

这里有一个关于 `animation-delay` 属性的运用小技巧，如果我们设置正常的时间，如 5s，我们知道这个动画将延迟 5 秒后播放。那如果我们设置成负数呢，负数值的 delay 有什么意义吗？且看，我们之前定义了秒针 60s 旋转一圈，如果我们设定 `animation-delay: -20s` 的话，那实际的效果就是：这个动画将从第 20 秒开始播放！Amazing!

有了这个运用技巧后，那真是太方便了，初始化的时候，我们用 JS 计算出已用秒数，为三个指针容器添加 `animation-delay` 的 style 属性，那初始化不就成功了吗？

以下是一个简单的 JS， 为各个指针赋予一个 `animation-dalay` 的样式，值为当前时间每根针已用去的秒数。记住，这个 JS 不是必须的，只是 CSS 没有获取当前时间的功能，这个迫不得已只能由 JS 来代劳：
```js
// 获取当前 delay 的秒数
const current = new Date()
const ss = -current.getSeconds()
const ms = ss - current.getMinutes() * 60
const hs = ms - current.getHours() % 12 * 3600
// 当前指针的指向角度，用 animation-delay 实现
document.querySelector('.hand-second').style.animationDelay = `${ss}s`
document.querySelector('.hand-minute').style.animationDelay = `${ms}s`
document.querySelector('.hand-hour').style.animationDelay   = `${hs}s`
```

## 最终效果展示：

<div class="clock">
  <ul class="mark">
    <li data-time="1"></li>
    <li data-time="2"></li>
    <li data-time="3"></li>
    <li data-time="4"></li>
    <li data-time="5"></li>
    <li data-time="6"></li>
    <li data-time="7"></li>
    <li data-time="8"></li>
    <li data-time="9"></li>
    <li data-time="10"></li>
    <li data-time="11"></li>
    <li data-time="12"></li>
  </ul>
  <div class="hand-wrap">
    <div class="hand-hour"></div>
    <div class="hand-minute"></div>
    <div class="hand-second"></div>
  </div>
</div>
<script>
var current = new Date();
var ss = -current.getSeconds();
var ms = ss - current.getMinutes() * 60;
var hs = ms - current.getHours() % 12 * 3600;
document.querySelector('.hand-second').style.animationDelay = ss + 's';
document.querySelector('.hand-minute').style.animationDelay = ms + 's';
document.querySelector('.hand-hour').style.animationDelay = hs + 's';
</script>

附：完整例子可以参考 [codepan](https://codepen.io/jimyuan/pen/LywKXg/)