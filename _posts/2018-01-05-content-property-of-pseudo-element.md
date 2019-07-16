---
layout: post
title:  CSS 伪元素 content 属性的诸多取值
tags: css
---

2018 年的开篇 blog！大家新年好！这篇博客我们主要来讲一讲 CSS 伪元素中的 content 属性，仔细看了下 [{{site.icon.link}} MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content) 文档所述，其罗列的 "Formal syntax" 还真是好多啊！有许多我们平时不太用的，或者忽略的属性值还是很有意思的！
<!--more-->

有点 CSS 编写经验的人都知道，伪元素(Pseudo Element)可是个好东西，CSS 文档中的伪元素有好几个，这里我们着重介绍的是 `::before` 和 `::after` 两兄弟。借助它们，我们可以在布局中为正常的容器凭空添加两个虚拟的节点，配合一些 CSS 的“奇技淫巧”，便能展现一些 UI 交互上的 “黑魔法”。而让这两兄弟能够顺利生效的一个必备属性就是 `content` 了，没有它，这两兄弟就不起作用了。

下面，我罗列一下 content 属性的一些可取值，看看都有哪些妙用：

## 1. 字符串
这可是 content 的标准用法，来看下:
```css
.demo105-1::before {
  content: 'tips:';
  color: red;
}
```
```html
<div class="demo105-1">这是一段提示信息！</div>
```
我们会看到呈现在网页上的效果如下
> <div class="demo105-1">这是一段提示信息！</div>

只要使用了这个 class 的容器，其开头必然会有一段红色的 "tips" 字样跟随，这就是我们常见的 content 用法。

接下来，有人开始蠢蠢欲动，放荡不羁起来了……
```css
.demo105-2::before {
  content: '';
  display: inline-block;
  width: 0;
  height: 0;
  border: 0.5em solid transparent;
  border-left-color: red;
}
```
辣莫，现在是啥情况了呢？
> <div class="demo105-2">这是一段提示信息！</div>

我们用了一点点的小技巧，把一个空串的 content 通过 `display` 属性，硬是给改造出了维度来，再通过“挤边大法”给容器凭空造出了一个小三角。这是一个很有用的技巧，在一些交互 UI 中，弹出的对话框往往需要一些三角图标的指示，这时候不要再浪费资源引入外部图片，或者用 html 代码再写一个容器，我们充分利用现有容器的伪元素，一个 CSS 样式就解决啦！

暂且先抛砖引玉一翻，我们继续下一个话题

## 2. 引用符号
属于引用符号的取值有 4 种，共 2 对，在 CSS 中用了语义较为清晰的关键词来表示： `open-quote`、 `close-quote`、`no-open-quote`、`no-close-quote`。在技术文档中乍一看这类值的引用，觉得也就这样，没啥好讲的，且看：
```css
.demo105-3::before {
  content: open-quote;
}
.demo105-3::after {
  content: close-quote;
}
```
效果也就预料中的那样，容器中的内容被一对引号给引用起来了：
> <div class="demo105-3">这是一段提示信息！</div>

如果把上面两个取值给改成 `no-open-quote` 和 `no-close-quote`，测试下来，啥特殊情况都没发生，没有引号了，也没其他的改变，这啥鸡肋取值，这有啥好讲的？且慢，呵呵，这里有坑！

我们稍微深入一下，首先，我们可以自定义这个 quote 的形式吗？我用 "«" 和 "»" 行不？我学知乎，用 "『" 和 "』" 行吗？

技术文档上对于引用符号的取值描述是：
> These values are replaced by the appropriate string from the [{{site.icon.link}} quotes](https://developer.mozilla.org/en-US/docs/Web/CSS/quotes) property.

居然还有个叫 `quotes` 的 CSS 属性！点开 quotes 属性说明页面，这个 CSS 属性可真是……默默无闻啊，咱从来没正眼瞧过啊，从 CSS2 开始就默默存在着，面对着我们的无视，它依然傲立（类似这种默默无闻的 CSS 属性还有一些，今后可能会慢慢讲到）！上代码我们来瞧瞧：
```css
.demo105-4 {
  quotes: "『" "』";
}
.demo105-4::before {
  content: open-quote;
}
.demo105-4::after {
  content: close-quote;
}
```
> <div class="demo105-4">这是一段提示信息！</div>

再仔细看下 quotes 的 formal syntax: `[ <string> <string> ]+`，我们了解到，quotes 可以设置多组引用符号，用以应对次级引用。为什么说这茬呢，因为…… 我们又要说一下刚才觉得鸡肋的另一组取值 `no-open-quote` 和 `no-close-quote`。文档上对此对取值的解释是：
> 不会生产任何内容，但是会改变（增加或降低）引号层级。

不过这句话不太好理解啊，我们来看代码：
```css
.demo105-5 {
  quotes: "«" "»" "‹" "›";
}
.demo105-5::before {
  content: no-open-quote open-quote;
}
.demo105-5::after {
  content: close-quote;
}
```
> <div class="demo105-5">这是一段提示信息！</div>

按我的理解，`no-open-quote` 起了一个无形的“占位”作用，把一级的引用符给用掉了，但又不输出任何东西，也就是文档里所说的“会改变（增加或降低）引号层级”。而 `close-quote` 则按着 `quotes` 属性的定义，总是和 `open-quote` 自动匹配。

关于引用符号是否还有其他有意思的玩法，大家自己再探索一下吧。

## 3. 属性值的引用
将元素的属性以字符串形式返回。如果该元素没有该属性，则返回一个空字符串。Don't talk, show me the code!
```html
<div id="obj" class="demo105-6">该容器的 id 是：</div>
```
```css
.demo105-6::after {
  content: '#' attr(id);
  color: red;
}
```
> <div id="obj" class="demo105-6">该容器的 id 是：</div>

我们可以看到，采用 CSS 的内置方法 `attr()` 我们不但取到了指定属性的值，而且从中我们还可以了解到，content 中不同的取值可以通过空格的方式串联起来。巧妙的采用属性值引用，可以为我们的交互带来一些有趣的效果。

我们来看下下面这个响应式表格的例子，改变表格的宽度，将会呈现不同的效果。我们可以试着开关 SCSS 按钮，看看可视区域改变后，表格样式的变化情况：

<p data-height="240" data-theme-id="light" data-slug-hash="bdxJdP" data-default-tab="css,result" data-user="jimyuan" data-embed-version="2" data-pen-title="respond table" class="codepen">See the Pen <a href="https://codepen.io/jimyuan/pen/bdxJdP/">respond table</a> by Jim Yuan (<a href="https://codepen.io/jimyuan">@jimyuan</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## 4. 计数器
又有两个平时不太注意，但又非常有用的方法来了，`counter()` 和 `counters()`，因为这个属性值需要结合 CSS 计数器相关属性的使用，例如 `counter-reset`、`counter-increment` 等，不能单拆开来说，所以给大家两个参考：一个也是我几年前写的一篇博客：[{{ site.icon.link }} 《CSS 计数器的使用》](http://jimyuan.github.io/blog/2015/02/25/use-counters-in-css.html)，另一篇是个小小的代码演示：看看我们使用计数器还能做到哪些事情：

<p data-height="240" data-theme-id="light" data-slug-hash="KZPaRx" data-default-tab="result" data-user="jimyuan" data-embed-version="2" data-pen-title="CSS 计数器" class="codepen">See the Pen <a href="https://codepen.io/jimyuan/pen/KZPaRx/">CSS 计数器</a> by Jim Yuan (<a href="https://codepen.io/jimyuan">@jimyuan</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## 5. 外部资源
这又是一个看似平凡但又强大的取值类型。通过 `url()` 方法，我们可以像引用背景图片的方式在 content 中引入“图片内容”，不但可以以路径方式引用，而且同样支持以 data URI 的方式对外部资源进行加载。
```css
.demo105-7::before {
  content: url('http://jimyuan.github.io/blog/favicon.ico');
}
.demo105-7::after {
  content: url('data:image/svg+xml, \
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"> \
      <circle cx="16" cy="16" r="16" fill="#1296db" /> \
      <circle cx="16" cy="16" r="10" fill="#ffffff" /> \
      <circle cx="16" cy="16" r="6" fill="#1296db" /> \
    </svg>');
}
```
> <div class="demo105-7"> 各种资源尽管来啊！ </div>

从以上示例可以看出，我们采用了 CSS 中一种通用的方法，就能将外部图片资源给引入。上面讲了，我们熟悉的背景图片引用就采用类似的方法，使用了内置的 `url()` 函数。我们这时候是否能发散一下想到，在 CSS3 标准下，我们不但可以使用 `background-image: url(http://your/data/uri)` 的方式引用图片资源，我们还可以使用一些渐变函数创造资源。是的，content 属性确实可以接受使用渐变函数！

```css
.demo105-8::before {
  content: radial-gradient(circle at 35% 35%, white 10%, pink 70%);
  display: block;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  overflow: hidden;
}
```
> <div class="demo105-8"></div>

( _艹！文章发表后发现，貌似 safari(v11, High Sierra) 不支持 content 中使用渐变函数嘛，在背景中是支持的，这……，看来兼容……性方面还是有问题_ )

瞧瞧，我们在 content 里实现了渐变。如果再深入一下的话，那我们还可以知道，要实现渐变，CSS 提供了 `linear-gradient()`, `gadial-gradient()`, `repeat-linear-gradient()`, `repeat-radial-gradient` 等 4 种函数，据说将来 CSS4 还会增加一个叫做 `conic-gradient()` 的渐变函数，我们称之为角向渐变(也称作圆锥渐变)。


插个题外话，巧妙的利用 CSS 背景色、渐变、多背景堆叠、背景混合模式等，将会产生一些意想不到的美妙效果，具体例子可以参看 [{{ site.icon.link }} 这里](http://verou.me/css3patterns/) 赞叹一下吧！

下面有个发散型的思考，伪元素的 content 和背景里都能设置渐变图案，那究竟选择哪个合理点呢？我的感觉是：要插入一些简单的渐变图形，写在 content 里吧，就当做一张普通图片内容就好；如果是一些复杂的背景图，那还是用 background 的多背景加其他一些手段来实现吧。

对于 content 研究的补充，先进行到这里，以后有了新发现我们再补充呗！


<hr>

参考文章：

{{ site.icon.link }} <https://developer.mozilla.org/zh-CN/docs/Web/CSS/content>
