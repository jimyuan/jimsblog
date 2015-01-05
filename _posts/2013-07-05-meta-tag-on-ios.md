---
layout: post
title: 移动开发之META标记
tags: iOS meta
---

####✱ viewport
代码大概是这样的：
{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1">
{% endhighlight %}

<!--more-->

取值如下：

    height=[pixel_value] | device-height
    width=[pixel_value] | device-width
    initial-scale=[float_value]
    minimum-scale=[float_value]
    maximum-scale=[float_value]
    user-scalable=yes | no
    target-densitydpi=[dpi_value] | device-dpi | high-dpi | medium-dpi | low-dpi

iOS专属META标记：

<table class="table table-striped table-bordered">
  <thead>
    <tr>
      <td>name</td>
      <td>content</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>apple-mobile-web-app-capable</td>
      <td>yes | no</td>
    </tr>
    <tr>
      <td>apple-mobile-web-app-status-bar-style</td>
      <td>default | black | black-translucent</td>
    </tr>
    <tr>
      <td>format-detection</td>
      <td>telephone=no | yes</td>
    </tr>
    <tr>
      <td>apple-mobile-web-app-title</td>
      <td></td>
    </tr>
  </tbody>
</table>
    