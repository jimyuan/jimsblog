---
layout: post
title:  《CSS SECRETS》读书笔记——背景与边框
tags: css
---
## 背景与边框

### 1. 背景与边框关系
默认情况下啊，背景色会延伸到容器的 border 下（如果有 border 的话），其实，根据实际需要，我们还可以取以上的其他值。还有个 text 的取值，因兼容性问题，暂且不讨论。
<!--more-->

```
background-clip: border-box | padding-box | content-box
```
以下实例清楚的说明了 background-clip 的作用：

```css
/* 容器主要预设，
   background-clip 的取值如容器内所示 */
.container {
  ...
  padding: 1em;
  border: 0.5em dashed purple;
}
```
<div class="demo-content">
  <div class="csss-bg">border-box</div>
  <div class="csss-bg bgclip-pb">padding-box</div>
  <div class="csss-bg bgclip-cb">content-box</div>
</div>

### 2. 多重边框描绘方法

- border + box-shadow 的扩张半径属性（第四个参数）
- box-shadow inset 参数（内圈描边）
- box-shadow 接受多值特性创建多边框
- border + outline （outline 无法产生圆角，未来可能修改该特性）
- outline & box-shadow 共用， 前者叠加在前，但都无法响应事件

### 3. 背景图片与边框的关系
背景图片在容器内的铺设范围，可以用 `background-origin` 来设置背景图片在盒模型中的起始位置。很显然，从我们的经验来讲，默认值肯定为 `padding-box`，与 border 的占用范围错开，一直以来都是这样的。

```
background-origin: border-box | padding-box | content-box
```

可以看出，`background-origin` 的行为同 `background-clip` 非常像，只是针对的对象不同，一个是背景图片，一个是背景色。请注意观察设置不同的值后，背景图片的起始位置，也就是背景图开始的原点 (top left) 的不同变化：

```css
/* 容器主要预设，
   background-origin 的取值如容器内所示 */
.container {
  ...
  padding: 1em;
  border: 0.5em dashed purple;
  background-repeat: no-repeat;
}
```

<div class="demo-content">
  <div class="csss-bgi bgorigin-bb">border-box</div>
  <div class="csss-bgi bgorigin-pb">padding-box</div>
  <div class="csss-bgi bgorigin-cb">content-box</div>
</div>

<small>注意：上面的例子里，为了突出效果，我采用了 `background-size: 100% 100%` 让背景图充满了各自的盒模型范围。`background-origin` 仅仅只是设置背景的起始位置，如果该背景图片为平铺的，该属性并不能保证图片不延伸到 border 的下方。</small>

### 4. 边框内圆角效果
可利用容器 outline 直角，而其阴影扩张半径为圆角的特性，将阴影扩张半径的值取圆角半径的一半（其实大于 √<span class="gh">2</span> - 1 既可），证明见书。

```css
/* 主要代码，注意
   box-shadow 的第四个参数和 border-radius 的取值 */
.inner-rounding {
  ...
  border-radius: 0.8em;
  box-shadow: 0 0 0 0.4em #655;
  outline: 0.6em solid #655;
}
```
<div class="inner-rounding">边框内圆角的效果</div>

### 5. 条纹背景
说实话，第一次见到书中巧妙利用各种渐变背景的设置技巧，能够做出越来越复杂的背景图，真是叹为观。

能够设置渐变色的 CSS Function 有这么几个：

- linear-gradient
- repeating-linear-gradient
- radial-gradient
- repeating-radial-gradient

一言不合，先秀几段代码，生成条纹图：

```css
/* 生成间隔 15px 的条纹背景 */

/* 生成间 15px 的间隔条纹
   再利用 background-size 控制背景大小，形成条纹 */
.stripe-1 {
  background: linear-gradient(royalblue 15px, skyblue 0);
  background-size: 100% 30px;
}

/* 亦可用 shorthand 写法一写到底： */
.stripe-1 {
  background: linear-gradient(royalblue 15px, skyblue 0) 0 / 100% 30px;
}
```

<div class="demo-content">
<div class="stripe stripe-90">.stripe-1</div>
</div>

以上条纹效果就形成了，其关键的 CSS 函数 `linear-gradient()` 中的参数写法，也很有讲究：

这里我们是省略了方向参数，其默认值为 `to bottom` 或者 `180deg`，他们是一个意思。

其次，如果后一种颜色的起始位置同前一种颜色的终止位置相同，可以认为他们之间的过渡无限小，从效果来看，就能产生两段清晰的纯色了，完整的参数形式应该是这样：`linear-gradient(royalblue 0, royalblue 15px, skyblue 15px, skyblue 30px)`。

最后，从 DRY 的角度来分析一下，能否简化这段代码？规范上讲，颜色过渡肯定从 0 开始，所以 `royalbue 0` 可以省略不写了，后一个颜色的起始位置如果小于前一个颜色的终止位置，则其默认是从前一个颜色的终止位开始。所以我们可以为后一个颜色的起始位定一个 0 的值，避免定义的值写 2 遍了，然后，我们再抛弃掉最后一个颜色的默认终止位是100%，就写成了上面代码那样 `linear-gradient(royalblue 15px, skyblue 0)`。

```css
/* 生成 45 度角的条纹背景 */

.stripe-2 {
  background: linear-gradient(45deg,
    royalblue 25%, skyblue 0, skyblue 50%,
    royalblue 0, royalblue 75%, skyblue 0);
  background-size: 30px 30px
}

.stripe-3 {
  background: linear-gradient(45deg,
    royalblue 25%, skyblue 0, skyblue 50%,
    royalblue 0, royalblue 75%, skyblue 0);
  background-size: 42px 42px
}

.stripe-4 {
  background: repeating-linear-gradient(45deg,
    royalblue, royalblue 15px, skyblue 0, skyblue 30px);
}
```

<div class="demo-content">
  <div class="stripe stripe-45">.stripe-2</div>
  <div class="stripe stripe-45 stripe-45-good">.stripe-3</div>
  <div class="stripe stripe-45-real">.stripe-4</div>
</div>

.stripe2 的代码生成了 45 度的倾斜条纹，这里先生成一个 30x30 的条纹方块，然后 45 度方向 4 次平铺它，这样才能在整个平面内平铺行成倾斜条纹。但是然而…… 实际效果有点奇怪，仔细查看，原来条纹太细，其间距根本不是 15px，而是 15 ÷ √<span class="gh">2</span>。

![条纹间隔距离示意]({{'/img/css-secrets/45deg-stripe.png' | prepend: site.baseurl}})

想要形成真正 15px 间隔的条纹，我们通过勾股定理简单计算得出，其基本单位定义的边长应该扩大为 30 * √<span class="gh">2</span> ≈ 42.426，取个整，42px，条纹间隔近似 15px 了。

我们花费了一番周折却只得到个近似的效果，所以，另一个属性 `repeating-linear-gradient` 给了我们解决问题的一道曙光。看代码就知，真正的 15px 间隔！并且无需再去寻找啥最小单位的无缝贴片用来平铺，45 度看似还好解决，73 度咋办？用了该属性，任何角度的斜向条纹都不在话下了。

<small>__注意：采用 `repeating-linear-gradient` 创建双色斜线条纹，必须要用到 4 个色标，如果我们要的是垂直或者水平条纹效果，那我想，用 `linear-gradient` 还是比较合适的，毕竟，能少写点代码呀！__</small>

### 6. 扩展：波点图背景

既然讲了线性渐变的一些使用技巧，那我们用也可使用径向渐变函数创造一些可用的效果来：

```css
.drop-init {
  background: #556 radial-gradient(rgba(255,255,255,0.1) 30%, transparent 0);
  background-size: 40px 40px;
}

.drop-real {
  background: #556;
  background-image:
    radial-gradient(rgba(255,255,255,0.1) 20%, transparent 0),
    radial-gradient(rgba(255,255,255,0.1) 20%, transparent 0);
  background-size: 40px 40px;
  background-position: 0 0, 20px 20px;
}

.drop-real.drop-fixed {
  background-position: -8px -8px, 12px 12px;
}
```

<div class="demo-content">
  <div class="drop-dots drop-init"></div>
  <div class="drop-dots drop-real"></div>
  <div class="drop-dots drop-real drop-fixed"></div>
</div>

第一个波点图示例看上去有点怪怪的，实际上，大多数的波点图都类似第二个例子，行与行之间是错开的，利用 CSS3 对 background 属性规范的扩展，设置多层背景，并错开一点，看上去舒服多了吧。这段代码看上去还是有点重复代码，但是很遗憾，这次没法再精简了。第三个例子里，我们又做了点人工干预，让波点图看上去更符合视觉，虽然代码又复杂了一些，不过总要有点取舍，check & balance 吧！

当然，我们可以利用 Scss 等预处理工具写一段 mixin，偷懒是我们的最大特色！

### 7. 补充备忘：方向参数

__方向__ | __关键词__ | __角度(deg)__
<i class="fa fa-arrow-up"></i> | to top | 0deg
<i class="fa fa-arrow-right"></i> | to right | 90deg
<i class="fa fa-arrow-down"></i> | to bottom | 180deg (__default value__)
<i class="fa fa-arrow-left"></i> | to left | 270deg

### 8. 伪随机条纹

直接上代码：

```css
/* 第一段 */
.random-part-1 {
  background-image: linear-gradient(90deg, #fb3 11px, transparent 0);
  background-size: 41px 100%;
}

/* 第二段 */
.random-part-2 {
  background-image: linear-gradient(90deg, #ab4 23px, transparent 0);
  background-size: 61px 100%;
}

/* 第三段 */
.random-part-3 {
  background-image: linear-gradient(90deg, #655 41px, transparent 0);
  background-size: 83px 100%;
}

/* 混合 */
.random-stripe {
  background-image:
      linear-gradient(90deg, #fb3 11px, transparent 0),
      linear-gradient(90deg, #ab4 23px, transparent 0),
      linear-gradient(90deg, #655 41px, transparent 0);
  background-size: 41px 100%, 61px 100%, 83px 100%;
}
```
<div class="demo-content">
  <div class="random-part random-part-1"></div>
  <div class="random-part random-part-2"></div>
  <div class="random-part random-part-3"></div>
</div>
<div class="random-stripe"></div>

巧妙的利用了互质数的最小公倍数是其乘积的原理，大大扩大了循环单位的值，产生了一种“伪随机”的效果，以上例子中，其条纹的最小循环单位达到了 41x61x83=207,583px，已经基本上看不出规律了。

### 9. 多重背景妙用（伪图片边框）

仍然采用背景图来制作图片边框的效果，而不是那个难用的 `border-image` 属性，且看关键代码：

```css
.stripe-border {
  padding: 0.8em;
  border: 0.8em solid transparent;
  background:
    linear-gradient(#fff, #fff) padding-box,
    repeating-linear-gradient(135deg,
      #f00, #f00 15px, transparent 0, transparent 30px,
      #058 0, #058 45px, transparent 0, transparent 60px)
      border-box 0 / 100% 100%;
}
```
<div class="stripe-border">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>

利用 `background-origin` 的不同为多重背景添加不同的覆盖范围，可以为容器添加这种奇妙的效果。我们再来看一个“蚂蚁行军”效果，就是大家在图片编辑软件里常看到的那种虚线框效果：

```css
@keyframes ants {
  to {
    background-position: 100% 100%;
  }
}

.select-rect {
  ...
  padding: 1em;
  border: 1px solid transparent;
  background: linear-gradient(#fff, #fff) padding-box,
              repeating-linear-gradient(-45deg,
                #000, #000 25%,
                transparent 0, transparent 50%) 0 / .6em .6em;
  animation: ants 60s linear infinite;
}
```
<div class="stripe-rect"></div>

咦？在 v53 版本的 chrome 下渲染的有点奇怪啊，扔这儿再说！
