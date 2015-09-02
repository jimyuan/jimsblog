---
layout: post
title:  用 CSS 绘制文档图标
tags: css
---

貌似前两天在看微信公众号推送来得一些技术文章，其中有一个叫 cssmagic 的小伙，他写了篇[重拾 CSS 的乐趣](https://github.com/cssmagic/blog/issues/52)的文章，蛮有意思，有时候用 css 来实现一些图形效果，对于当事人来讲，目的是什么？作者和我的观点一致：主要是好玩！文章中提及到了一个叫 [fileicon.css](https://github.com/picturepan2/fileicon.css) 的开源项目，的确蛮好玩，不过去看看该项目的 [issue](https://github.com/picturepan2/fileicon.css/issues/2) 就知道，实现上存在着一些瑕疵，cssmagic 通过了一些“奇淫技巧”解决了使用该 css 框架生成 file icon 时右上角无法透明的缺点，不过仍然还存在着代码冗余等一些问题，不过目前看来，还没有一个更好的解决方法。

<!--more-->

通常来讲，我们有更简单的方法来实现文档图标，例如使用 [fontawesome](http://fortawesome.github.io/Font-Awesome/) 这个字体图标框架，字体作为一种矢量图形，在页面中能够很方便的通过样式定义大小和颜色，这个……大家都知道，就不啰嗦了，Look：

<h1 class="css-icon">
  <span class="fa fa-file-word-o"></span>
  <span class="fa fa-file-excel-o"></span>
  <span class="fa fa-file-powerpoint-o"></span>
</h1>

采用这种方案一个不好的地方在于…… 图标要受人家字库的限制，下面我按着 cssmagic 的思路，用 pure css 来实现看看，每个图标只采用一个容器，不准备采取多层 DOM 结构将事情复杂化，这里，我用 Scss 重新实现了一遍，为啥？主要还是因为……好玩！

文档结构：
{% highlight html %}
<div class="file-type file-doc" data-type="DOC"></div>
<div class="file-type file-xls" data-type="XLS"></div>
<div class="file-type file-ppt" data-type="PPT"></div>
{% endhighlight %}

scss 代码：
{% highlight scss %}
$iw: 100px;       // icon width
$ih: $iw * 1.32;  // icon height
$br: $ih / 20;    // icon radius

// define icon type & colors
$types: (
  'doc': blue,
  'xls': green,
  'ppt': orange
);

.file-type {
  width: $iw;
  height: $ih;
  display: inline-block;
  margin-bottom: 20px;
  position: relative;
  border-style: solid;
  border-width: 0 0 $iw $ih / 2;
  border-radius: $br;
  box-sizing: border-box;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ($ih - $iw) / 2 ($iw / 2 - $ih / 4);
    box-sizing: border-box;
  }

  &:before {
    z-index: 2;
    border-bottom-left-radius: $br;
  }

  &:after {
    content: attr(data-type);
    z-index: 1;
    border-top-color: transparent;
    border-right-color: transparent;
    font-family: Monaco, monospace;
    font-size: $iw * 0.18;
    color: white;
    text-indent:  -$iw * 0.7;
    line-height: $ih * 1.4;
  }
}

@each $type, $bg in $types {
  .file-#{$type} {
    border-color: $bg;

    &:before {
      border-color: lighten($bg, 10%);
      box-shadow: -5px 5px 5px darken($bg, 5%);
    }

    &:after {
      border-color: $bg;
    }

    &:before,
    &:after {
      border-top-color: transparent;
      border-right-color: transparent;
    }
  }
}

{% endhighlight %}

现在，我们看看效果，我认为还是挺漂亮的 :-)

<div class="file-type file-doc" data-type="DOC"></div>
<div class="file-type file-xls" data-type="XLS"></div>
<div class="file-type file-ppt" data-type="PPT"></div>

其实，只用一个容器，通过 CSS 实现一些复杂的图案，一直有大神在搞啊，请看这个网站  [one-div.com](http://one-div.com/)，你看了某些图标大概会惊叹，这玩意儿用一个容器就实现了？呵呵……
