---
layout: post
title:  CSS计数器的使用
tags: CSS
---

**过完年的第一篇博客，先恭祝自己羊年顺利，阖家平安！这里是我的新家，虽然之前也写了很多博客，但大都是过时的文章，就不从其他地方再搬过来了，如果有人搜到了本博客，那恭喜了，您在2015必将一飞冲天，哈哈~~**

言归正传，开始正文了！在CSS中，我们很多人会忽略掉控制CSS计数器的几个CSS属性，例如 `counter-reset` 和 `counter-increment`：

<!--more-->

* `counter-reset`: 声明一个计数器变量，并初始化默认值。
* `counter-increment`: 递增或递减该计数器的值。

#### 基本使用

至于这两个属性怎么用，查手册？我觉得不如咱先看下代码，比看一大段描述文字来的直观的多，先看最简单的一个应用：

__HTML:__
```html
<h6>HTML and CSS</h6>
<h6>JavaScript</h6>
<h6>PHP</h6>
<h6>Java</h6>
```
__CSS:__
```css
body {
  /* 重置计数器成0 */
  counter-reset: section;
}
h6:before {
  /* 增加计数器值 */
  counter-increment: section;
  /* 显示计数器 */
  content: "Section " counter(section) ": ";
}
```

那么这段HTML看上去应该是这个样子的：
<div class="counter-demo counter-demo-1">
  <h6>HTML and CSS</h6>
  <h6>JavaScript</h6>
  <h6>PHP</h6>
  <h6>Java</h6>
</div>

好了，有点感觉了吧，那我看再来看一个例子：

__HTML:__
```html
<h5>Programming languages</h5>
<h6>HTML and CSS</h6>
<h6>JavaScript</h6>
<h6>PHP</h6>
<h6>Java</h6>

<h5>Database management systems</h5>
<h6>MySQL</h6>
<h6>MariaDB</h6>
<h6>PostgreSQL</h6>
<h6>Oracle</h6>
```

__CSS:__
```css
body {
  counter-reset: chapter;  
}

h5 {
  counter-reset: section;
  counter-increment: chapter;
}

h6 {
  counter-increment: section;
}

h5:before {
  content: "Chapter " counter(chapter) ". ";
}

h6:before {
  content: counter(chapter) "." counter(section) " ";
}
```

那么，它应该是这个样子的…… 有点酷吧 ^o^
<div class="counter-demo counter-demo-2">
  <h5>Programming languages</h5>
  <h6>HTML and CSS</h6>
  <h6>JavaScript</h6>
  <h6>PHP</h6>
  <h6>Java</h6>
  <h5>Database management systems</h5>
  <h6>MySQL</h6>
  <h6>MariaDB</h6>
  <h6>PostgreSQL</h6>
  <h6>Oracle</h6>
</div>

#### 计数器样式
通常情况下，计数器默认是用阿拉伯数字来表示的，当然，我们也可以用其他计数器样式，上头代码里那个`counter()`函数还可以传入样式参数：
```css
counter( counter_name, list_style_type )
```
在这里：

* `counter_name`： 当然指的就是`counter-reset`中定义的计数器变量。
* `list_style_type`: 计数器显示样式，可以是css中允许的任何 [list-style-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type) 的值，当然也包括 __disc__, __circle__, __square__ 或者 __none__。

这里，我们将上门的CSS代码稍微重定义一下：

__CSS:__
```css
h5:before {
  content: "Chapter " counter(chapter, upper-roman) ". ";
}
```
再来看看该定义的结果：
<div class="counter-demo counter-demo-3">
  <h5>Programming languages</h5>
  <h6>HTML and CSS</h6>
  <h6>JavaScript</h6>
  <h6>PHP</h6>
  <h6>Java</h6>
  <h5>Database management systems</h5>
  <h6>MySQL</h6>
  <h6>MariaDB</h6>
  <h6>PostgreSQL</h6>
  <h6>Oracle</h6>
</div>
一级标题现在以大写罗马字母进行计数了！

#### 计数器嵌套
CSS计数器对创建有序列表特别有用，因为在孩子元素中会自动创建一个CSS计数器的实例。使用 counters() 函数，在不同级别的嵌套计数器之间可以插入字符串。比如这个例子：

__CSS:__
```css
ol {
  // 为每个ol元素创建新的计数器实例
  counter-reset: ol-list;
  list-style-type: none;
}
li:before {
  // 只增加计数器的当前实例
  counter-increment: ol-list;
  // 为所有计数器实例增加以“.”分隔的值
  content: counters(ol-list, ".") " ";
}
```
__HTML:__
```html
<ol>
  <li>item</li>
  <li>item
    <ol>
      <li>item</li>
      <li>item</li>
      <li>item
        <ol>
          <li>item</li>
          <li>item</li>
        </ol>
        <ol>
          <li>item</li>
          <li>item</li>
          <li>item</li>
        </ol>
      </li>
      <li>item</li>
    </ol>
  </li>
  <li>item</li>
  <li>item</li>
</ol>
<ol>
  <li>item</li>
  <li>item</li>
</ol>
```

看看，嵌套后的效果……
<div class="counter-demo counter-demo-4">
  <ol>
    <li>item</li>
    <li>item
      <ol>
        <li>item</li>
        <li>item</li>
        <li>item
          <ol>
            <li>item</li>
            <li>item</li>
          </ol>
          <ol>
            <li>item</li>
            <li>item</li>
            <li>item</li>
          </ol>
        </li>
        <li>item</li>
      </ol>
    </li>
    <li>item</li>
    <li>item</li>
  </ol>
  <ol>
    <li>item</li>
    <li>item</li>
  </ol>
</div>

好神奇的计数器，CSS2就有的属性，被我们大部分人遗忘的好用的属性，以后要勤加利用啦~~~~

<hr>

参考文章：

[<span class="fa fa-link"></span> https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Counters](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Counters)

[<span class="fa fa-link"></span> http://basicuse.net/articles/pl/textile/html_css/how_to_use_counters_in_css](http://basicuse.net/articles/pl/textile/html_css/how_to_use_counters_in_css)
