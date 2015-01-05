---
layout: post
title:  iOS下的Web App图片配置
tags: iOS HTML
---

####✱ 写在前面
以下代码真是有够搞的，还好iOS设备尺寸还不算多，网上查了一些资料，要么就是对retina的iPad不确定，要么就是没有对iPhone5的提及，还有对iPhone4、4S等retina设备的启动画面设定，官方只有一个尺寸，网上又流传其他设定方法，可能我查得还很不够，但是之前我的确已经糊涂了。

<!--more-->

经过我对4s、iPad1和new ipad的实物测试，以下代码完全起作用，晚些时候测以下iPhone4，说是支持有问题，我想可能跟iOS版本有关，我之前测试的这些设备都是最新版本的OS，当然ipad1是5.1.1，永远上不去了。

####✱ 桌面图标设置
在iPhone,iPad,iTouch的safari上可以使用添加到主屏按钮将网站添加到主屏幕上。apple-touch-icon是IOS设备的私有标签，如果设置了相应apple-touch-icon标签，则添加到主屏上的图标会使用指定的图片。在
区域加入下面代码即可。
对应不同的iOS设备，地道点的话，我们一般要准备4种不同尺寸的图片，推荐png格式，当然，jpg也可以。以下代码排列组合将能适应目前的iOS设备需求了。
{% highlight html %}
<!-- iPhone -->
<link href="touch-icon-57x57.png" rel="apple-touch-icon" sizes="57x57">
<!-- iPad-->
<link href="touch-icon-72x72.png" rel="apple-touch-icon" sizes="72x72">
<!-- iPhone Retina-->
<link href="touch-icon-114x114.png" rel="apple-touch-icon" sizes="114x114">
<!-- iPad Retina -->
<link href="touch-icon-144x144.png" rel="apple-touch-icon" sizes="144x144">
{% endhighlight %}
当然，rel值也可以设置成“apple-touch-icon-precomposed”，区别就在于是否会应用iOS中自动给图标添加的那层高光。

####✱ 动画面设置
apple-touch-startup-image是用来标示启动画面的，启动画面的图片尺寸并非完全等于设备的尺寸，在图片高度上，非retina设备要减去20px，retina设备要减去40px。
Web App运行起来要像Native App，那么就要去掉Safari的一些默认控件，比如地址栏、状态栏之类的。meta设置前面讲过了，这里就忽略了。
iPhone的启动画面就一个状态，而iPad则可以分成portrait和landscape两种。
{% highlight html %}
<!-- iPhone -->
<link href="startup-320x460.png" rel="apple-touch-startup-image" media="screen and (max-device-width: 320px)">
<!-- iPhone Retina --> 
<link href="startup-640x920.png" rel="apple-touch-startup-image" media="screen and (max-device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)">
<!-- iPhone5 -->
<link href="startup-640x1096.png" rel="apple-touch-startup-image" media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" />
<!-- iPad -->
<link href="startup-1024x748.png" rel="apple-touch-startup-image" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)">
<link href="startup-768x1004.png" rel="apple-touch-startup-image" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)">
<!-- iPad Retina -->
<link href="startup-2048x1496.png" rel="apple-touch-startup-image" media="screen and (min-device-width:481px) and (max-device-width:1024px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio: 2)">
<link href="startup-1536x2008.png" rel="apple-touch-startup-image" media="screen and (min-device-width:481px) and (max-device-width:1024px) and (orientation:portrait) and (-webkit-min-device-pixel-ratio: 2)">
{% endhighlight %}
