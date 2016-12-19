---
layout: post
title:  《CSS SECRETS》读书笔记——形状
tags: css
---
## 形状

### 1. 自适应圆与椭圆
凡是刚开始接触 CSS3 的人，通常会被介绍到一个典型的新属性，叫 `border-radius`，介绍说，通过这个属性，我们就可以很容易的为容器定义圆角，再也不会出现在 CSS2 时代那样，要造一个圆角容器，要么上一张固定背景图，要么来一个恐怖的九宫格布局，想想也是真恐怖……
<!--more-->

有了这个属性，除了通常的圆角容器，我们还能玩出其他的花样，例如我们能轻易想到的以下这种形状的绘制：

```css
/* 圆形 */
.block-1 {
  border-radius: 100%;
}

/* 纺锤形 */
.block-1 {
  border-radius: 100% 0;
}

/* 四分之一圆 */
.block-1 {
  border-radius: 0 100% 0 0;
}
```

<div class="square-content">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>

椭圆的定义也很简单，只要准备一个长方形的容器即可，通过 `border-radius` 可以分别对 x 和 y 轴进行定义的特点，可以定义出半椭圆的形状。

```css
/* 椭圆 */
.block-1 {
  border-radius: 50%;
}

/* 四分之一椭圆 */
.block-2 {
  border-radius: 100% 0 0 0;
}

/* 半椭圆 */
.block-3 {
  border-radius: 50% / 100% 100% 0 0;
}
```

<div class="square-content">
  <div class="rectangle"></div>
  <div class="rectangle"></div>
  <div class="rectangle"></div>
</div>

好了，但是通过纯 `border-radius` 没办法生成三分之一、八分之一圆（或者椭圆）的形状，不用多想了。

### 2. 平行四边形
思路很简单，采用 `translate` 的 `skew` 属性，就能很方便的达到平行四边形的效果，不过为了防止容器内容也跟着变形，所以采用的技巧是让该容器的伪元素变形衬托在后面，从视觉上达到要求。主要代码如下：

```css
.parallelogram {
  ...
  position: relative;
}
.parallelogram::before {
  content: '';
  background: #058;
  transform: skew(-30deg);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  z-index: -1;
}
```

<div class="parallelogram">平行四边形</div>

### 3. 菱形
首先，从传统思路考虑，很好解决，将正方形旋转 45 度，就是菱形了。但是再想想，如果容器内有内容，或者说是，我想直接把一张方形的图片显示成菱形，除了 PS 以外，有没有完美的 CSS 方法可以解决这个问题？

按着上面的思路，外层容器旋转 45 度，内层图片逆转 45 度用以修正角度，此时图片的宽度应以容器的对角线的长度为准，以我们所学的勾股定理可以知道，正方形的对角线长度为边长的 √<span class="gh">2</span> 倍嘛，因此，稍作调整就能较为完美的显示该效果了：

```css
.diamond {
  transform: rotate(45deg);
  overflow: hidden;
}
.diamond > img {
  width: 100%;
  transform: rotate(-45deg) scale(1.42);
}
```
<div class="diamond"><img src="{{'/img/ios/touch-icon-180.png' | prepend: site.baseurl }}"></div>

其实，CSS3 蕴藏了一个强大的多边形路径裁切属性 `clip-path`，有了它，任意复杂的图形描边都可以实现，只是…… 浏览器对它的兼容性支持稍微差了那么一点点。另外，该属性还能参与动画与过渡，实在是完美。

```css
img {
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  transition: 1s;
}
img:hover {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
```

<img src="{{'/img/ios/touch-icon-180.png' | prepend: site.baseurl }}" class="diamond-img">


### 4. 梯形
梯形的实现手法，同平行四边形有些类似，都可以运用 `translate` 变形来实现，梯形可以运用 `translate3d` 在 X 轴的旋转透视产生所需要的视觉效果，当然，为了防止容器内元素变形，仍然需要请出伪元素来做替身。请看代码：

```css
.tab-1 {
  ...
  position: relative;
  display: inline-block;
  padding: .5em 1em .35em;
  color: white;
}
.tab-1::before {
  /* 用伪元素来生成一个矩形 */
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: -1;
  background: #58a;
  /* 微调变形参数，以符合视觉效果 */
  transform: scaleY(1.3) perspective(.5em) rotateX(5deg);
  transform-origin: bottom;
}

/* 右倾斜直角梯形 */
.tab-2::before {
  transform-origin: bottom left;
}

/* 左倾斜直角梯形 */
.tab-3::before {
  transform-origin: bottom right;
}
```
<div class="center">
<div class="echelon">echelon</div>
<div class="echelon ec-2">echelon</div>
<div class="echelon ec-3">echelon</div>
</div>

简单的改变一下 `transform-origin`，也就是变形的原点，我们就能得到不同倾斜形状的梯形了。
