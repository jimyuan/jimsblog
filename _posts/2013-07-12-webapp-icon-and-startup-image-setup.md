---
layout: post
title:  iOS下的Web App图片配置
tags: iOS HTML
---

#### 写在前面
以下代码真是有够搞的，还好iOS设备尺寸还不算多，网上查了一些资料，要么就是对retina的iPad不确定，要么就是没有对iPhone5的提及，还有对iPhone4、4S等retina设备的启动画面设定，官方只有一个尺寸，网上又流传其他设定方法，可能我查得还很不够，但是之前我的确已经糊涂了。

<!--more-->

经过我对4s、iPad1和new ipad的实物测试，以下代码完全起作用，晚些时候测以下iPhone4，说是支持有问题，我想可能跟iOS版本有关，我之前测试的这些设备都是最新版本的OS，当然ipad1是5.1.1，永远上不去了。

#### 桌面图标设置
在iPhone,iPad,iTouch的safari上可以使用添加到主屏按钮将网站添加到主屏幕上。apple-touch-icon是IOS设备的私有标签，如果设置了相应apple-touch-icon标签，则添加到主屏上的图标会使用指定的图片。在
区域加入下面代码即可。
对应不同的iOS设备，地道点的话，我们一般要准备4种不同尺寸的图片，推荐png格式，当然，jpg也可以。以下代码排列组合将能适应目前的iOS设备需求了。
{% highlight html %}
<!-- iPad retina icon -->
<link href="apple-touch-icon-precomposed-152x152.png"
      sizes="152x152"
      rel="apple-touch-icon-precomposed">

<!-- iPad retina icon (iOS < 7) -->
<link href="apple-touch-icon-precomposed-144x144.png"
      sizes="144x144"
      rel="apple-touch-icon-precomposed">

<!-- iPad non-retina icon -->
<link href="apple-touch-icon-precomposed-76x76.png"
      sizes="76x76"
      rel="apple-touch-icon-precomposed">

<!-- iPad non-retina icon (iOS < 7) -->
<link href="apple-touch-icon-precomposed-72x72.png"
      sizes="72x72"
      rel="apple-touch-icon-precomposed">

<!-- iPhone 6 Plus icon -->
<link href="apple-touch-icon-precomposed-180x180.png"
      sizes="120x120"
      rel="apple-touch-icon-precomposed">

<!-- iPhone retina icon (iOS < 7) -->
<link href="apple-touch-icon-precomposed-114x114.png"
      sizes="114x114"
      rel="apple-touch-icon-precomposed">

<!-- iPhone non-retina icon (iOS < 7) -->
<link href="apple-touch-icon-precomposed-57x57.png"
      sizes="57x57"
      rel="apple-touch-icon-precomposed">
{% endhighlight %}
当然，rel值也可以设置成“apple-touch-icon-precomposed”，区别就在于是否会应用iOS中自动给图标添加的那层高光。

#### 启动动画面设置
apple-touch-startup-image是用来标示启动画面的，启动画面的图片尺寸并非完全等于设备的尺寸，在图片高度上，非retina设备要减去20px，retina设备要减去40px。
Web App运行起来要像Native App，那么就要去掉Safari的一些默认控件，比如地址栏、状态栏之类的。meta设置前面讲过了，这里就忽略了。
iPhone的启动画面就一个状态，而iPad则可以分成portrait和landscape两种。
补充： iphone 6+ 也有portrait和landscape两种状态了。
{% highlight html %}
<!-- iPad retina portrait startup image -->
<link href="apple-touch-startup-image-1536x2008.png"
      media="(device-width: 768px) and (device-height: 1024px)
             and (-webkit-device-pixel-ratio: 2)
             and (orientation: portrait)"
      rel="apple-touch-startup-image">

<!-- iPad retina landscape startup image -->
<link href="apple-touch-startup-image-1496x2048.png"
      media="(device-width: 768px) and (device-height: 1024px)
             and (-webkit-device-pixel-ratio: 2)
             and (orientation: landscape)"
      rel="apple-touch-startup-image">

<!-- iPad non-retina portrait startup image -->
<link href="apple-touch-startup-image-768x1004.png"
      media="(device-width: 768px) and (device-height: 1024px)
             and (-webkit-device-pixel-ratio: 1)
             and (orientation: portrait)"
      rel="apple-touch-startup-image">

<!-- iPad non-retina landscape startup image -->
<link href="apple-touch-startup-image-748x1024.png"
      media="(device-width: 768px) and (device-height: 1024px)
             and (-webkit-device-pixel-ratio: 1)
             and (orientation: landscape)"
      rel="apple-touch-startup-image">

<!-- iPhone 6 Plus portrait startup image -->
<link href="apple-touch-startup-image-1242x2148.png"
      media="(device-width: 414px) and (device-height: 736px)
             and (-webkit-device-pixel-ratio: 3)
             and (orientation: portrait)"
      rel="apple-touch-startup-image">

<!-- iPhone 6 Plus landscape startup image -->
<link href="apple-touch-startup-image-1182x2208.png"
      media="(device-width: 414px) and (device-height: 736px)
             and (-webkit-device-pixel-ratio: 3)
             and (orientation: landscape)"
      rel="apple-touch-startup-image">

<!-- iPhone 6 startup image -->
<link href="apple-touch-startup-image-750x1294.png"
      media="(device-width: 375px) and (device-height: 667px)
             and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image">

<!-- iPhone 5 startup image -->
<link href="apple-touch-startup-image-640x1096.png"
      media="(device-width: 320px) and (device-height: 568px)
             and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image">

<!-- iPhone < 5 retina startup image -->
<link href="apple-touch-startup-image-640x920.png"
      media="(device-width: 320px) and (device-height: 480px)
             and (-webkit-device-pixel-ratio: 2)"
      rel="apple-touch-startup-image">

<!-- iPhone < 5 non-retina startup image -->
<link href="apple-touch-startup-image-320x460.png"
      media="(device-width: 320px) and (device-height: 480px)
             and (-webkit-device-pixel-ratio: 1)"
      rel="apple-touch-startup-image">
{% endhighlight %}

