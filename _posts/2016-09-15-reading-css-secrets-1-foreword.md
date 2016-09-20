---
layout: post
title:  《CSS SECRETS》读书笔记——前言
tags: css
---
## 前言
[*CSS SECRETS*](https://www.amazon.cn/CSS%E6%8F%AD%E7%A7%98-Lea-Verou/dp/B01ET3FO86) 这本书，应该是属于到目前为止能够数得上重量级的为数不多的关于 CSS 技巧的前端书籍了。其作者 __Lea Verou__ 来头也不小，她是 W3C 的 CSS 规范制定小组的核心成员，从专业角度来讲，她对 CSS 的权威性是不容置疑的。[这里](http://lea.verou.me) 是她的博客地址，从中我们可以获取到她对 CSS 的一些精彩运用。
<!--more-->

![Lea Verou]({{'/img/css-secrets/Lea-Verou.jpg' | prepend: site.baseurl}})
_作者近照，标准程序媛一枚！_

以下所写内容，是我对这本书读了 2 遍（英文版电子书 + 中文版实体书）后写下的读书笔记，有些精妙的 CSS 黑魔法技巧看得直叫我击掌赞叹，写下精髓以免淡忘。

### 1. 基本常识
每一个 CSS 新特性，或者现有属性扩展，基本上都会经历这些阶段，越到后面，其在浏览器上的支持度就越会增加。

__ED__ | Editor’s Draft | 编辑草案
__FPWD__ | First Public Working Draft | 首个公开工作草案
__WD__ | Working Draft | 工作草案
__CR__ | Candidate Recommendation | 候选推荐规范
__PR__ | Proposed Recommendation | 提名推荐规范
__REC__ | Recommendation | 正式推荐规范

### 2. CSS 模块
CSS 规范从一开始可怜的一小撮，发展至今，其体系的扩展，可以说是即使是 CSS 规范工作小组的人，都不能夸口说他掌握了全部的规范内容。由此可见，前端技术体系的膨胀是很惊人的。

以下为模块列表，浮光掠影即可：

__模块名称__ | __W3C 文档地址__
语法 | [CSS Syntax](http://w3.org/TR/css-syntax-3)
层叠与继承 |[ CSS Cascading and Inheritance](http://w3.org/TR/css-cascade-3)
颜色 | [CSS Color](http://w3.org/TR/css3-color)
选择符 | [Selectors](http://w3.org/TR/selectors)
背景与边框 | [CSS Backgrounds & Borders](http://w3.org/TR/css3-background)
值与单位 | [CSS Values and Units](http://w3.org/TR/css-values-3)
文本排版 | [CSS Text](http://w3.org/TR/css-text-3)
文本装饰效果 | [CSS Text Decoration](http://w3.org/TR/css-text-decor-3)
字体 | [CSS Fonts](http://w3.org/TR/css3-fonts)
基本 UI 特性 | [CSS Basic User Interface](http://w3.org/TR/css3-ui)
变形 | [CSS Transforms](http://w3.org/TR/css-transforms-1)
图像混合效果 | [Compositing and Blending](http://w3.org/TR/compositing-1)
滤镜效果 | [Filter Effects](http://w3.org/TR/filter-effects-1)
遮罩 | [CSS Masking](http://w3.org/TR/css-masking-1)
伸缩盒布局 | [CSS Flexible Box Layout](http://w3.org/TR/css-flexbox-1)
网格布局 | [CSS Grid Layout](http://w3.org/TR/css-grid-1)

### 3. 编码技巧
主导思想：__DRY(Don't Repeat Yourself)__!

总结起来，同一段样式定义里，尽量少的出现一些独立的值的设置，针对具体场景，可以用相对单位或者 `inherit` 或 `currentColor` 等关键词继承相关的值。对于一些复合属性的 shorthands 写法，也要看具体代码，__谨慎使用__。有时候为了代码的简洁，还是需要拆成单一属性，可以看下面的代码：

```css
/* WET
   (We Enjoy Typeing) */
.wet {
  background: url(tr.png) no-repeat top right / 2em 2em,
              url(br.png) no-repeat bottom right / 2em 2em,
              url(bl.png) no-repeat bottom left / 2em 2em;
}

/* DRY
   (Don't Repeat Yourself) */
.dry {
  background: url(tr.png) top right,
              url(br.png) bottom right,
              url(bl.png) bottom left;
  background-size: 2em 2em;
  background-repeat: no-repeat;
}
```

另外，建议选择 [Autoprefixer](https://www.npmjs.com/package/autoprefixer) 等 CSS 后处理工具为一些非标属性添加浏览器前缀，自己专注标准属性的语法编写即可，各种浏览器的兼容性，可以查看 [caniuse](http://caniuse.com/) 网站。

CSS4 规范将出现变量概念：

```css
ul { --accent-color: purple; }
ol { --accent-color: rebeccapurple; }
li { background: var(--accent-color); }
```
