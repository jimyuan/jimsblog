---
layout: post
title:  “last 2 versions” 之遗祸
tags: babel
---

这是一篇译文，讲的是配置 babel 时的浏览器兼容性配置问题，一些我们觉得非常理所当然的配置项，再仔细琢磨之后，往往会发现一个惊人的错误。我觉得人家讲的非常有道理，特此做了点翻译，原文 [{{site.icon.link}} 在此](https://jamie.build/last-2-versions)。
<!--more-->

我们每一个开发人员在工作中都有可能被一些习以为常的东西给误导，例如前端人员在写 ES6 时为开发环境配置的 `babel-preset-env`，还记得配置文件如何写的吗？

```json
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": [ "last 2 versions" ]
      }
    }]
  ]
}
```
我们被告知，这样写是要让 babel 知道一个我们需要兼容的浏览器范围，而一旦所定义的浏览器都支持了 ES6 的新特性，例如“箭头函数”等，那在转译时，我们就可以不把这个特性转换成 ES5 的写法了。

可事实上，假如我们真如上面这样写了，我们应该永远无法使用原生箭头函数那样的特性了，它总是会被编译，因为你看看，_last 2 versions_ 到底意味着什么？（[浏览器覆盖情况](https://jamie.build/last-2-versions)）

当你使用 _last 2 versions_ 时，你可能不知道这个覆盖率有多恐怖，看看以下浏览器：

- Internet Explorer Mobile (0.23% market share globally)
- Blackberry Browser (0.07%)
- Opera Mobile (0.01%)
- QQ Browser (0%)
- Baidu Browser (0%)

_last 2 versions_ 将永远覆盖以上这些浏览器，你猜为啥？拿 IE 举例，它本身已被 Edge 取代并且在 IE11 以后将不会再发布任何新的版本了。如果你使用 _last 2 versions_ 选项，那就表示你的目标浏览器列表里将永远会为 IE10 & 11 留下一席之地，明白这个选项的可怕之处了吗？

## 我们将如何才能彻底革了 IE 的命？

一个建议的配置如下：
```json
"browsers": [
  ">0.25%",
  "not ie 11",
  "not op_mini all"
]
```
查看一下这个配置的浏览器覆盖情况吧： [{{site.icon.link}} See browserlist coverage](http://browserl.ist/?q=%3E0.25%25%2C+not+ie+11%2C+not+op_mini+all)

好好利用以上这个网站，你可以很直观的看到你的 browserlist 所覆盖的实际范围。采用浏览器占用百分比作为选项应该是一个可靠的方法。去看一下 [{{site.icon.link}} browserlist documentation](https://github.com/browserslist/browserslist#queries)，然后去查看一下你现有项目对浏览器的覆盖情况，适当的调整一个配置，或许将会给你的 app 瘦身做出不小的贡献。