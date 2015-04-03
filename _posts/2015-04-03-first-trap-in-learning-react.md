---
layout: post
title:  React入门坑小记
tags: JS
---
话说如今的互联网开发状态，前后端的各类框架满天飞，咱大前端近几年也是重磅框架层出不穷，Angularjs唱罢，如今该轮到facebook这个不存在的公司再次发声音了。

现在最热门的前端框架，毫无疑问是脸书的 [React](https://facebook.github.io/react/) 。它起源于 Facebook 的内部项目，因为该公司对市场上所有 JavaScript MVC 框架，都不满意，就决定自己写一套，用来架设 Instagram 的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。

上周，基于 React 的 [React Native](http://facebook.github.io/react-native/) 发布，结果一天之内，就获得了 5000 颗星，受瞩目程度可见一斑。

<!--more-->

![React](http://image.beekka.com/blog/2015/bg2015033101.png)

既然这么热门，既然作为一个前端框架，那咱就熟悉熟悉吧，来点小demo看看？好，入门就一坑！，我们来看下Hello World例子：

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React Demo 01</title>
  <script src="../build/react.js"></script>
  <script src="../build/JSXTransformer.js"></script>
</head>
<body>
  <div id="example"></div>
  <script type="text/jsx">
    React.render(
      <h1>Hello, world!</h1>,
      document.getElementById('example')
    );
  </script>
</body>
</html>
{% endhighlight %}

上面代码有两个地方需要注意。首先，最后一个 script 标签的 type 属性为 text/jsx 。这是因为 React 独有的 JSX 语法，跟 JavaScript 不兼容。凡是使用 JSX 的地方，都要加上 type="text/jsx" 。

其次，React 提供两个库： react.js 和 JSXTransformer.js ，它们必须首先加载。其中，JSXTransformer.js 的作用是将 JSX 语法转为 JavaScript 语法。

这第一个坑就是JSX！我们想想，在正式开发项目的时候，我们是不太可能将 JSX 直接以 in-browser 方式来写代码的，这样很难对项目文件进行有效的管理。OK，让我们借鉴一下 JS 的思路，将JSX 代码单独保存成一个文件，就好比以下代码：

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React Demo 01</title>
  <script src="../build/react.js"></script>
  <script src="../build/JSXTransformer.js"></script>
</head>
<body>
  <div id="example"></div>
  <script type="text/jsx" src="demo01.jsx"></script>
</body>
</html>
{% endhighlight %}

如果我们在做这个入门教程的时候，是在一个 http server 下做得，那恭喜你，没啥大问题！但是，我偏偏是双击html文件打开的，这个时候控制台报错来，报啥错呢，报的是一个 XMLHttpRequest 的跨域错误，估计 JSXTransformer 解析的时候是用 ajax 方式将代码读进来，然后解析成标准 JS 代码的，直接打开页面当然不能执行 ajax 请求了。

所以大家在开发的时候注意了，这个坑别踩到了。

JSXTransformer.js 将 JSX 转为 JavaScript 这一步其实很消耗时间，在开发的时候没关系，但是实际上线的时候，官方还是建议将 JSX 文件先预编译成标准 JS 语法文件部署到生产环境，脸书提供了基于 Nodejs 的 react-tools 命令行工具，运行 `npm install -g react-tools` 进行安装。

通常， 我习惯将 JSX 文件以 <kbd>.jsx</kbd> 后缀进行保存，用来与js文件进行区分，运行命令 `jsx -x jsx build/js/ dist/js/` 就可以了，其他参数及用法，自己运行 `jsx --help` 去看看就知道了。

{% highlight js %}
/* JSX coding */
React.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
{% endhighlight %}

{% highlight js %}
/* JS Coding after precompile */
React.render(
  React.createElement("h1", null, "Hello, world!"),
  document.getElementById('example')
);
{% endhighlight %}

这样一来，在部署到生产环境时，这个 `JSXTransformer.js` 文件就可以不用引入了，我们看下面的代码就知。这个时候千万别踩到又一个隐藏小坑：`<script>` 标签中的 `type="text/jsx"` 千万不要再加了，否则你又要丈二和尚了。

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React Demo 01</title>
  <script src="../build/react.js"></script>
</head>
<body>
  <div id="example"></div>
  <script src="demo01.js"></script>
</body>
</html>
{% endhighlight %}
