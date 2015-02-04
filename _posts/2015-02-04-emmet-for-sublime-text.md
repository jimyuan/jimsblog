---
layout: post
title:  Sublime中Emmet快捷键一览表
tags: HTML CSS
---

Emmet是啥，如果说出它的前身——Zen Coding，或许大家就有印象了。

<!--more-->

在前端开发的过程中，一大部分的工作是写 HTML、CSS 代码。特别是手动编写HTML代码的时候，效率会特别低下，因为需要敲打很多尖括号，而且很多标签都需要闭合标签等。于是，就有了 Emmet，它可以极大的提高代码编写的效率，它提供了一种非常简练的语法规则，然后立刻生成对应的 HTML 结构或者 CSS 代码，同时还有多种实用的功能帮助进行前端开发。

#### Emmet的重要特性
- [HTML结构缩写](http://docs.emmet.io/abbreviations/syntax/)（早有了）
- [CSS样式缩写](http://docs.emmet.io/css-abbreviations/)，自动[浏览器前缀添加](http://docs.emmet.io/css-abbreviations/vendor-prefixes/)和[渐变缩写](http://docs.emmet.io/css-abbreviations/gradients/)等
- [随机语句生成](http://docs.emmet.io/abbreviations/lorem-ipsum/)
- [自动继承默认tag](http://docs.emmet.io/abbreviations/implicit-names/)
- [将图片资源转换成data url](http://docs.emmet.io/actions/)

当然，Emmet的特性不止这么点，要完全了解，可以直接去看[官方文档](http://docs.emmet.io/)。

#### 各种快捷键一览
[官方文档](http://docs.emmet.io/)中演示的快捷键大都是不对的，下表中所列的快捷键经测试，至少在Mac下是正确的 ^o^
<table class="table table-bordered">
  <thead>
    <tr>
      <td>Action</td>
      <td>Mac</td>
      <td>Win</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[扩展缩写](http://docs.emmet.io/actions/expand-abbreviation/)</td>
      <td><kbd>Tab</kbd> or <kbd>^E</kbd></td>
      <td><kbd>Tab</kbd> or <kbd>Ctrl+E</kbd></td>
    </tr>
    <tr>
      <td>交互式扩展缩写</td>
      <td><kbd>^⌥Enter</kbd></td>
      <td><kbd>Ctrl+Alt+Enter</kbd></td>
    </tr>
    <tr>
      <td>[向外逐步配对](http://docs.emmet.io/actions/match-pair/)</td>
      <td><kbd>^D</kbd></td>
      <td><kbd>Ctrl+,</kbd></td>
    </tr>
    <tr>
      <td>[向内逐步配对](http://docs.emmet.io/actions/match-pair/)</td>
      <td><kbd>^J</kbd></td>
      <td><kbd>Shift+Ctrl+0</kbd></td>
    </tr>
    <tr>
      <td>[在匹配行之间跳转](http://docs.emmet.io/actions/go-to-pair/)</td>
      <td><kbd>⇧⌃T</kbd></td>
      <td><kbd>Ctrl+Alt+J</kbd></td>
    </tr>
    <tr>
      <td>[用缩写方式包裹已有节点](http://docs.emmet.io/actions/wrap-with-abbreviation/)</td>
      <td><kbd>⌃W</kbd></td>
      <td><kbd>Shift+Ctrl+G</kbd></td>
    </tr>
    <tr>
      <td>[在编辑点之间切换](http://docs.emmet.io/actions/go-to-edit-point/)</td>
      <td><kbd>^⌥→</kbd> or <kbd>^⌥←</kbd></td>
      <td><kbd>Ctrl+Alt+→</kbd> or <kbd>Ctrl+Alt+←</kbd></td>
    </tr>
    <tr>
      <td>[在各个tag间循序切换](http://docs.emmet.io/actions/select-item/)</td>
      <td><kbd>⇧⌘.</kbd> or <kbd>⇧⌘,</kbd></td>
      <td><kbd>Shift+Ctrl+.</kbd> or <kbd>Shift+Ctrl+,</kbd></td>
    </tr>
    <tr>
      <td>[添加/删除注释](http://docs.emmet.io/actions/toggle-comment/)</td>
      <td><kbd>⇧⌥/</kbd></td>
      <td><kbd>Shift+Ctrl+/</kbd></td>
    </tr>
    <tr>
      <td>[在自封闭tag和配对tag形式间切换](http://docs.emmet.io/actions/split-join-tag/)</td>
      <td><kbd>⇧⌘'</kbd></td>
      <td><kbd>Shift+Ctrl+`</kbd></td>
    </tr>
    <tr>
      <td>[移除标签](http://docs.emmet.io/actions/remove-tag/)</td>
      <td><kbd>⌘'</kbd></td>
      <td><kbd>Shift+Ctrl+;</kbd></td>
    </tr>
    <tr>
      <td>[获取图片尺寸](http://docs.emmet.io/actions/update-image-size/)</td>
      <td><kbd>⇧⌃I</kbd></td>
      <td><kbd>Ctrl+U</kbd></td>
    </tr>
    <tr>
      <td>[计算功能](http://docs.emmet.io/actions/evaluate-math/)</td>
      <td><kbd>⇧⌘Y</kbd></td>
      <td><kbd>Shift+Ctrl+Y</kbd></td>
    </tr>
    <tr>
      <td>[批量修改不同前缀的同属性CSS值](http://docs.emmet.io/actions/reflect-css-value/)</td>
      <td><kbd>⇧⌘R</kbd></td>
      <td><kbd>Shift+Ctrl+R</kbd></td>
    </tr>
    <tr>
      <td>[编码/解码图片的data URL](http://docs.emmet.io/actions/base64/)</td>
      <td><kbd>⇧⌃D</kbd></td>
      <td><kbd>Ctrl+'</kbd></td>
    </tr>
    <tr>
      <td>重命名tag</td>
      <td><kbd>⇧⌘K</kbd></td>
      <td><kbd>Shift+Ctrl+'</kbd></td>
    </tr>
  </tbody>
</table>