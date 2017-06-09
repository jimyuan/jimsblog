---
layout: post
title:  Sass 内建函数用法一览
tags: scss
---

总结帖，免得自己老忘！特别是 List 和 Map 类型的变量操作。当然还有一个大头，就是 Sass 内建的各种颜色操作函数，特别有用！以下，瞧好了。
<!--more-->

按作用对象分，这些函数大致可以分为：

1. 数值运算类
1. 字符串操作类
1. 颜色操作类
1. 列表对象操作类
1. Map 对象操作类
1. 选择符操作类
1. 一般工具类

## (1) 数值运算类
<span class="orange">_在 Sass 中，数字类型包括了长度、持续时间、频率、角度以及无单位数值等。Sass 允许在运行中计算这些度量值。_</span>

### <span class="red">▸ abs</span>($number)
返回一个数值的绝对值，类似 `Math.abs()`。

```scss
abs(10px) => 10px
abs(-10px) => 10px
```
---
### <span class="red">▸ ceil</span>($number)
对一个数值向上取整，类似 `Math.ceil()`。
```scss
ceil(10.4px) => 11px
ceil(10.6px) => 11px
```
---
### <span class="red">▸ comparable</span>($number1, $number2)
返回一个布尔值，判断传入的两个数值是否是可以进行比较或计算的。
```scss
comparable(2px, 1px) => true
comparable(100px, 3em) => false
comparable(10cm, 3mm) => true
```
---
### <span class="red">▸ floor</span>($number)
对一个数值向下取整，类似 `Math.floor()`。
```scss
floor(10.4px) => 10px
floor(10.6px) => 10px
```
---
### <span class="red">▸ max</span>($numbers...)
取最大值，类似 `Math.max()`。
```scss
max(1px, 4px) => 4px
max(5em, 3em, 4em) => 5em
```
---
### <span class="red">▸ min</span>($numbers...)
取最大值，类似 `Math.min()`。
```scss
min(1px, 4px) => 1px
min(5em, 3em, 4em) => 3em
```
---
### <span class="red">▸ percentage</span>($number)
将数字化为百分比的表达形式。
```scss
percentage(0.2) => 20%
percentage(100px / 50px) => 200%
```
---
### <span class="red">▸ random</span>, <span class="red">random</span>($limit)
无参数传入，则随机返回 0-1 区间内的小数（不包括 1）

如传入一个整数参数，则随机返回 1 至 `$limit` 之间的整数，包括 1 和 `$limit`。

---
### <span class="red">▸ round</span>($number)
返回最接近该数的一个整数，其实就是整数四舍五入啦， 类似 `Math.round()`
```scss
round(10.4px) => 10px
round(10.6px) => 11px
```
## (2) 字符串操作类
<span class="orange">_CSS 中不要求字符串必须用引号包裹，甚至是字符串中包含空格的。_</span>

### <span class="red">▸ quote</span>($string)
为传入的字符串添加双引号，如已有双引号，则不做操作，直接返回该字符串。
```scss
quote("foo") => "foo"
quote(foo) => "foo"
```
---
### <span class="red">▸ str-index</span>($string, $substring)
返回一个下标，标示 `$substring` 在 `$string` 中的起始位置。没有找到的话，则返回 `null` 值。

同样的，这里的下标都是从 1 开始。
```scss
str-index(abcd, a)  => 1
str-index(abcd, ab) => 1
str-index(abcd, X)  => null
str-index(abcd, c)  => 3
```
---
### <span class="red">▸ str-insert</span>($string, $insert, $index)
在字符串的 `$index` 位置插入内容为 `$insert` 的子字符串。
```scss
str-insert("abcd", "X", 1) => "Xabcd"
str-insert("abcd", "X", 4) => "abcXd"
str-insert("abcd", "X", 5) => "abcdX"
```
---
### <span class="red">▸ str-length</span>($string)
返回字符串的长度。
```scss
str-length("foo") => 3
```
---
### <span class="red">▸ str-slice</span>($string, $start-at, $end-at:-1)
从 `$string` 中截取子字符串，通过 `$start-at` 和 `$end-at` 设置始末位置，未指定结束索引值则默认截取到字符串末尾。
```scss
str-slice("abcd", 2, 3)   => "bc"
str-slice("abcd", 2)      => "bcd"
str-slice("abcd", -3, -2) => "bc"
str-slice("abcd", 2, -2)  => "bc"
```
---
### <span class="red">▸ to-lower-case</span>($string)
将传入字符串转成小写。
```scss
to-lower-case(ABCD) => abcd
```
---
### <span class="red">▸ to-upper-case</span>($string)
将传入字符串转成大写。
```scss
to-upper-case(abcd) => ABCD
```
---
### <span class="red">▸ unique-id</span>
返回一个无引号的随机字符串作为 id。不过也只能保证在单次的 Sass 编译中确保这个 id 的唯一性。
```scss
unique-id() => uad053b1c
```
---
### <span class="red">▸ unquote</span>($string)
剥离字符串的引号，如该字符串本身就不带引号，则原样返回。
```scss
unquote("foo") => foo
unquote(foo) => foo
```
## (3) 颜色操作类
<span class="orange">_颜色在 CSS 中占有重要地位，在 Sass 中接受 HSL、RGB、HEX 以及预命名色等不同的颜色表达方式。_</span>

### <span class="red">▸ adjust_color</span>($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])
这个函数能够调整给定色彩的一个或多个属性值，包括 RGB 和 HSL 色彩的各项色值参数，另外还有 alpha 通道的取值。这些属性值的调整依赖传入的关键值参数，通过这些参数再与给定颜色相应的色彩值做加减运算。

所有属性调整参数都为可选值。但是你不能同时调整 RGB （$red, $blue, $green）和 HSL （$hue, $saturation, $lightness）两套不同颜色体系的参数。

以下 demo 供参考揣摩：
```scss
adjust-color(#102030, $blue: 5) => #102035
adjust-color(#102030, $red: -5, $blue: 5) => #0b2035
adjust-color(hsl(25, 100%, 80%), $lightness: -30%, $alpha: -0.4) => hsla(25, 100%, 50%, 0.6)
```
---
### <span class="red">▸ adjust-hue</span>($color, $degrees)
对给定色彩的 hue 值做调整。给出一个角度值参数，与给定色彩的 hue 角度值相加，返回一个新的色值。可以看做是对 `adjust-color($color, $hue)` 的二度封装。

当然，在实际 Sass 编译中，在不同的编译引擎下，得到的色彩格式可能不一定跟原始格式相同，有可能经过了 convert，当然这并不影响新颜色的表达：
```scss
adjust-hue(hsl(120, 30%, 90%), 60deg) => hsl(180, 30%, 90%)
adjust-hue(hsl(120, 30%, 90%), -60deg) => hsl(60, 30%, 90%)
adjust-hue(#811, 45deg) => #886a11
```
---
### <span class="red">▸ alpha</span>($color), _aka:_ <span class="red">opacity</span>($color)
返回给定颜色的 alpha 通道值。返回值必定在 0-1 之间。
```scss
alpha(hsla(120, 30%, 90%, 0.6)) => 0.6
alpha(#ccc) => 1
```
---
### <span class="red">▸ blue</span>($color)
给定一个颜色，取蓝色部分的 10 进制色值（0-255）。HSL 颜色会根据相应[算法](https://www.w3.org/TR/css3-color/#hsl-color) convert 成 RGB 表达式后进行取值。
```scss
blue(#333) => 51
blue(rgb(100, 200, 70)) => 70
blue(hsl(240, 100%, 50%)) => 255
```
---
### <span class="red">▸ change-color</span>($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha])
跟上面 `adjust-color` 类似，只是在该函数中传入的参数将直接替换原来的值，而不做任何的运算。

原则上，所有的参数都是选传的，同样，不允许同时传递 RGB 和 HSL 两套颜色命令体系所属的参数。
```scss
change-color(#102030, $blue: 5) => #102005
change-color(#102030, $red: 120, $blue: 5) => #782005
change-color(hsl(25, 100%, 80%), $lightness: 40%, $alpha: 0.8) => hsla(25, 100%, 40%, 0.8)
```
---
### <span class="red">▸ complement</span>($color)
返回一个颜色的补色，其实就是对 `adjust-color($color, $hue: 180deg)` 的再次封装。

---
### <span class="red">▸ darken</span>($color, $amount)
加深一个给定的颜色，将给定色的亮度值减去传入的 `$amount` 值，得到一个新的色值。亮度值的取值区间在 0% ~ 100%。等价于 `adjust-color($color, $lightness: -$amount)`
```scss
darken(hsl(25, 100%, 80%), 30%) => hsl(25, 100%, 50%)
darken(#800, 20%) => #200
```
---
### <span class="red">▸ desaturate</span>($color, $amount)
调低一个颜色的饱和度后产生一个新的色值。同样，饱和度的取值区间在 0% ~ 100%。等同于 `adjust-color($color, $saturation: -$amount)`
```scss
desaturate(hsl(120, 30%, 90%), 20%) => hsl(120, 10%, 90%)
desaturate(#855, 20%) => #726b6b
```
---
### <span class="red">▸ opacify</span>($color, $amount), _aka:_ <span class="red">fade-in</span>($color, $amount)
降低颜色的透明度，取值在 0-1 之。等价于 `adjust-color($color, $alpha: $amount)`
```scss
opacify(rgba(0, 0, 0, 0.5), 0.1) => rgba(0, 0, 0, 0.6)
opacify(rgba(0, 0, 17, 0.8), 0.2) => #001
```
---
### <span class="red">▸ transparentize</span>($color, $amount), _aka:_ <span class="red">fade-out</span>($color, $amount)
提升颜色的透明度，取值在 0-1 之间。等价于 `adjust-color($color, $alpha: -$amount)`
```scss
transparentize(rgba(0, 0, 0, 0.5), 0.1) => rgba(0, 0, 0, 0.4)
transparentize(rgba(0, 0, 0, 0.8), 0.2) => rgba(0, 0, 0, 0.6)
```
---
### <span class="red">▸ grayscale</span>($color)
将给定颜色的饱和度降到 0，可以看做是对 `desaturate($color, 100%)` 的再次封装，也可以这么理解：`change-color($color, $saturation: 0%)`。

---
### <span class="red">▸ green</span>($color)
获取给定颜色的绿色部分色值，取值范围（0-255）。

---
### <span class="red">▸ hsl</span>($hue, $saturation, $lightness)
返回一个 HSL 色值。

---
### <span class="red">▸ hsla</span>($hue, $saturation, $lightness, $alpha)
返回一个带 alpha 通道的 HSL 色值。

---
### <span class="red">▸ hue</span>($color)
返回颜色在 HSL 色值中的角度值。
```scss
hue(hsl(0, 100%, 50%)) => 0deg
hue(blue) => 240deg
```
---
### <span class="red">▸ ie-hex-str</span>($color)
将色值转换成 IE 浏览器能理解的扩展 HEX 格式。
```scss
ie-hex-str(#abc) => #FFAABBCC
ie-hex-str(#3322BB) => #FF3322BB
ie-hex-str(rgba(0, 255, 0, 0.5)) => #8000FF00
```
---
### <span class="red">▸ invert</span>($color)
去一个颜色的反色。具体来讲，就是取 RGB 色的红、绿、蓝色值与 255 的差值，重新合成一个新的颜色。当然，如果是 HEX 色值，那就是与 FF 的差值，一样。
```scss
invert(rgb(255, 128, 45)) => rgb(0, 127, 210)
invert(#ccc) => #333333
```
---
### <span class="red">▸ lighten</span>($color, $amount)
提升一个色值的亮度。当然，其取值范围必定在 0% ~ 100% 内。等同于 `adjust-color($color, $lightness: $amount)`
```scss
lighten(hsl(0, 0%, 0%), 30%) => hsl(0, 0%, 30%)
lighten(#800, 20%) => #e00
```
---
### <span class="red">lightness</span>($color)
获取颜色的亮度值。
```scss
lightness(hsl(0, 100%, 70%)) => 70%
lightness(#ccc) => 80%
```
---
### <span class="red">▸ mix</span>($color1, $color2, $weight:50%)
混色操作。将两个颜色的红、绿、蓝色值按比例重新计算后，返回一个新的颜色。

默认 `$weight` 为 50%，表明新颜色各取 50% `$color1` 和 `$color2` 的色值相加。如果 `$weight` 为 25%，那表明新颜色为 25% `$color1` 和 75% `$color2` 的色值相加。

当然，该函数也支持 alpha 通道的混合，不过这个混合算法貌似同上面不太一样，我再研究一下。
```scss
mix(#f00, #00f) => #7f007f
mix(#f00, #00f, 25%) => #3f00bf
mix(rgba(255, 0, 0, 0.5), #00f) => rgba(64, 0, 191, 0.75)
```
---
### <span class="red">▸ red</span>($color)
返回一个颜色的 red 色值（0-255）。

---
### <span class="red">▸ rgb</span>($red, $green, $blue)
创建一个 RGB 色。

---
### <span class="red">▸ rgba</span>($red, $green, $blue, $alpha), <span class="red">rgba</span>($color, $alpha)
原生 `rgba()` 函数的加强版。

根据传入的 RGB 值和 alpha 通道值返回一个 rgba 色。

或者，给传入的颜色添加 alpha 通道值。

---
### <span class="red">▸ saturate</span>($color, $amount)
提高传入颜色的色彩饱和度。等同于 `adjust-color($color, $saturation: $amount)`
```scss
saturate(hsl(120, 30%, 90%), 20%) => hsl(120, 50%, 90%)
saturate(#855, 20%) => #9e3f3f
```
---
### <span class="red">▸ saturation</span>($color)
获取一个颜色的饱和度值。

---
### <span class="red">▸ scale-color</span>($color, [$red], [$green], [$blue], [$saturation], [$lightness], [$alpha])
另一种实用的颜色调节函数。`adjust-color` 通过传入的参数简单的与本身的色值参数做加减，有时候可能会导致累加值溢出，当然，函数会把结果控制在有效的阈值内。而 `scale-color` 函数则避免了这种情况，可以不必担心溢出，让参数在阈值范围内进行有效的调节。

举个例子，一个颜色的亮度 `lightness` 取值在 0% ~ 100% 之间，假如执行 `scale-color($color, $lightness: 40%)`，表明该颜色的亮度将有 (100 - 原始值) × 40% 的增幅。

另一个例子，执行 `scale-color($color, $lightness: -40%)`，表明这个颜色的亮度将减少 (原始值 - 0) × 40% 这么多的值。

所有传参的取值范围都在 0% ~ 100% 之间，并且 RGB 同 HSL 的传参不能冲突。
```scss
scale-color(hsl(120, 70%, 80%), $lightness: 50%) => hsl(120, 70%, 90%)
scale-color(rgb(200, 150, 170), $green: -40%, $blue: 70%) => rgb(200, 90, 229)
scale-color(hsl(200, 70%, 80%), $saturation: -90%, $alpha: -30%) => hsla(200, 7%, 80%, 0.7)
```
## (4) 列表对象操作类
<span class="orange">_列表就是 Sass 的数组。列表是一个一维的数据结构，用于保存任意类型的数值（包括列表，从而产生嵌套列表）_</span>

<span class="orange">_所有对列表对象做的增删改操作，都不会影响原队列，只会返回一个新的列表对象作为结果。_</span>

### <span class="red">▸ append</span>($list, $val, $separator:auto)
将值加入到一个列表的尾部，类似 JS 的 `Array.prototype.push`。
$separator 分隔符参数默认会自动侦测队列中的分隔符，除非你强行指定一个（取值：`comma` | `space`）。

另外，列表中的只有一个元素时，如果没有传入 $separator 参数，此时分隔符的取值在内部会指定为 `space`。

```scss
append(10px 20px, 30px) => 10px 20px 30px
append((blue, red), green) => blue, red, green
append(10px 20px, 30px 40px) => 10px 20px (30px 40px)
append(10px, 20px, comma) => 10px, 20px
append((blue, red), green, space) => blue red green
```
---
### <span class="red">▸ index</span>($list, $value)
返回给定值在列表中的位置，如果值未找到，则返回 `null`。

在我大 CSS 领域，下标都从 1 开始，切记！

这个函数也能作用于 map 类型的变量。
```scss
index(1px solid red, solid) => 2
index(1px solid red, dashed) => null
index((width: 10px, height: 20px), (height 20px)) => 2
```
---
### <span class="red">▸ join</span>($list1, $list2, $separator:auto)
合并两列表，类似 JS 的 `Array.prototype.concat` 操作。

如不指定 $separator， 则以第一列表的分隔符为准。如果两列表中的 item 数都小于 2 个，则用空格作为分隔符。
```scss
join(10px 20px, 30px 40px) => 10px 20px 30px 40px
join((blue, red), (#abc, #def)) => blue, red, #abc, #def
join(10px, 20px) => 10px 20px
join(10px, 20px, comma) => 10px, 20px
join((blue, red), (#abc, #def), space) => blue red #abc #def
```
---
### <span class="red">▸ length</span>($list)
返回一列表的长度。

这个函数同样适合于 map 类型的变量。
```scss
length(10px) => 1
length(10px 20px 30px) => 3
length((width: 10px, height: 20px)) => 2
```
---
### <span class="red">▸ list-separator</span>($list)
返回一列表的分隔符类型（`comma` or `space`）。如队列内少于 2 个成员而无法呈现分隔符时，则总是返回 `space`。
```scss
list-separator(1px 2px 3px) => space
list-separator(1px, 2px, 3px) => comma
list-separator('foo') => space
```
---
### <span class="red">▸ nth</span>($list, $n)
获取列表中第 `$n` 项的值。

这个函数同样也可以用在 map 数据类型中。

如传入负数索引值，则从列表的尾部开始计数获取相应的元素。
```scss
nth(10px 20px 30px, 1) => 10px
nth((Helvetica, Arial, sans-serif), 3) => sans-serif
nth((width: 10px, length: 20px), 2) => length, 20px
```
---
### <span class="red">▸ zip</span>($lists...)
将多个列表按照以相同索引值为一组，重新组成一个新的多维度列表。

生成的列表长度以最短的那个传入列表为准。
```scss
zip(1px 1px 3px, solid dashed solid, red green blue)
=>  1px solid red, 1px dashed green, 3px solid blue
```

## (5) Map 对象操作类
<span class="orange">_在 Sass 中，样式开发者可以使用 map 这种数据结构映射关联数组、哈希表甚至是 Javascript 对象。_</span>

<span class="orange">_所有对 Map 对象做的增删改操作，都不会影响原队列，只会返回一个新的 Map 对象作为结果。_</span>

### <span class="red">▸ map-get</span>($map, $key)
查找 map 对象中 key 所对应的 value 值。如没有对应的 key，则返回 null 值。
```scss
map-get(("foo": 1, "bar": 2), "foo") => 1
map-get(("foo": 1, "bar": 2), "bar") => 2
map-get(("foo": 1, "bar": 2), "baz") => null
```
---
### <span class="red">▸ map-has-key</span>($map, $key)
检测 map 中是否含有所需查询的 key
```scss
map-has-key(("foo": 1, "bar": 2), "foo") => true
map-has-key(("foo": 1, "bar": 2), "baz") => false
```
---
### <span class="red">▸ map-keys</span>($map)
提取 map 中的 key 值，并返回由这些 key 组成的队列。
```scss
map-keys(("foo": 1, "bar": 2)) => "foo", "bar"
```
---
### <span class="red">▸ map-merge</span>($map1, $map2)
合并两个 map 形成一个新的 map 类型，如果两个 map 中出现相同 key 值，$map2 将会覆盖 $map1 中的键值。

这个一个给现有 map 添加键值对的最合理方法。

新 map 中键值对的排列顺序遵循 $map1 的排列顺序，新的键值对添加在原有键值对后。
```scss
map-merge(("foo": 1), ("bar": 2)) => ("foo": 1, "bar": 2)
map-merge(("foo": 1, "bar": 2), ("bar": 3)) => ("foo": 1, "bar": 3)
```
---
### <span class="red">▸ map-values</span>($map)
类似于 `map-keys($map)`，提取 map 中所有的 value 值，形成一个队列。
```scss
map-values(("foo": 1, "bar": 2)) => 1, 2
map-values(("foo": 1, "bar": 2, "baz": 1)) => 1, 2, 1
```
## (6) 选择符操作类
<span class="orange">_CSS 中的选择符具有一定的特殊性，与一般的字符串对象有一些区别，针对选择符的一些必要操作，Sass 提供了如下一些函数工具：_</span>

### <span class="red">▸ selector-append</span>($selectors...)
连接多个传入的 CSS 选择符，达到类似 `$selector1 { &$selector2 { ... } }` 这样的效果
```scss
selector-append(".foo", ".bar", ".baz") => .foo.bar.baz
selector-append(".a .foo", ".b .bar") => "a .foo.b .bar"
selector-append(".foo", "-suffix") => ".foo-suffix"
```
---
### <span class="red">▸ selector-extend</span>($selector, $extendee, $extender)
还木有完全理解这个函数的作用：
> Returns a new version of `$selector` with `$extendee` extended with `$extender`. 

```scss
selector-extend(".a .b", ".b", ".foo .bar") => .a .b, .a .foo .bar, .foo .a .bar
```
---
### <span class="red">▸ selector-nest</span>($selectors...)
层叠传入的 CSS 选择符，形成类似 `$selector1 { $selector2 { ... } }` 的新选择符。

传入的选择符，还允许附带 Sass 的父选择器 `&`，当然，它肯定不能出现在第一个传参内。
```scss
selector-nest(".foo", ".bar", ".baz") => .foo .bar .baz
selector-nest(".a .foo", ".b .bar") => .a .foo .b .bar
selector-nest(".foo", "&.bar") => .foo.bar
```
---
### <span class="red">▸ selector-parse</span>($selector)
将字符串的选择符转换成实际可用的一个选择符队列。
```scss
selector-parse(".foo .bar, .baz .bang") => ('.foo' '.bar', '.baz' '.bang')
```
---
### <span class="red">▸ selector-replace</span>($selector, $original, $replacement)
给定一个选择符，用 `$replacement` 替换 `$original` 后返回一个新的选择符队列。
```scss
selector-replace(".foo .bar", ".bar", ".baz") => ".foo .baz"
selector-replace(".foo.bar.baz", ".foo.baz", ".qux") => ".bar.qux"
```
---
### <span class="red">▸ selector-unify</span>
将两组选择符合成一个复合选择符。如两个选择符无法复合，则返回 `null` 值。

从测试的结果来看，如果遇到组合选择符之间的复合，这个函数不会把所有的复合可能性都返回出来，以免造成结果呈指数级增长。它只会返回两组选择符最后一项进行复合，而之前部分只做简单的交换组合。（看不懂这段描述的可以看 demo，反正我也没看懂原文的那一大段晦涩描述）
```scss
selector-unify(".a", ".b") => .a.b
selector-unify(".a .b", ".x .y") => .a .x .b.y, .x .a .b.y
selector-unify(".a.b", ".b.c") => .a.b.c
selector-unify("#a", "#b") => null
```
---
### <span class="red">▸ simple-selectors</span>($selector)
将复合选择符拆为单个选择符。

注意，这里的传参 `$selector` 仅指复合选择符(compound selector)，所以传入的选择符内不应包含逗号或者空格。
```scss
simple-selectors(".foo.bar") => ".foo", ".bar"
simple-selectors(".foo.bar.baz") => ".foo", ".bar", ".baz"
```

## (7) 一般工具类
### <span class="red">▸ call</span>($name, $args...)
函数的动态调用。支持 CSS 内建函数，Sass 内建函数和自定义函数。
```scss
call(rgb, 10, 100, 255) => #0a64ff
call(scale-color, #0a64ff, $lightness: -10%) => #0058ef

$fn: nth;
call($fn, (a b c), 2) => b
```
---
### <span class="red">▸ feature-exists</span>($feature)
这是什么鬼，咋用啊？
```scss
feature-exists(some-feature-that-exists) => true
feature-exists(what-is-this-i-dont-know) => false
```
---
### <span class="red">▸ function-exists</span>($name)
检测某个函数是否存在，内建、自建的都行。
```scss
function-exists(lighten) => true

@function myfunc { @return "something"; }
function-exists(myfunc) => true
```
---
### <span class="red">▸ global-variable-exists</span>($name)
检测某个全局变量是否定义。
```scss
$a-false-value: false;
global-variable-exists(a-false-value) => true

.foo {
  $some-var: false;
  @if global-variable-exists(some-var) { /* false, doesn't run */ }
}
```
---
### <span class="red">▸ if</span>($condition, $if-true, $if-false)
根据传入的条件来返回对应的值，有点像 JS 里三元运算符的作用。
```scss
if(true, 1px, 2px) => 1px
if(false, 1px, 2px) => 2px
```
---
### <span class="red">▸ inspect</span>($value)
Return a string containing the value as its Sass representation.

看例子自己体会下：
```scss
$breakpoints: (
  'tiny':   ( max-width:  767px ),
  'small':  ( min-width:  768px ),
  'medium': ( min-width:  992px ),
  'large':  ( min-width: 1200px ),
  'custom': ( min-height:  40em )
);

@mixin breakpoint($name) {
  @if map-has-key($breakpoints, $name) {
    @media #{inspect(map-get($breakpoints, $name))} {
      @content;
    }
  }
  @else {
    @warn "Couldn't find a breakpoint named `#{$name}`.";
  }
}
```
---
### <span class="red">▸ is-superselector</span>($super, $sub)
比较两组选择符，看看传入的选择符哪组 match 的范围大（可以通过选择符优先级比较法比较，优先级底的选择范围大）。也可以从简单选择符通常比复杂选择符 match 范围大这一特性加以判断。
```scss
is-superselector(".foo", ".foo.bar") => true
is-superselector(".foo.bar", ".foo") => false
is-superselector(".bar", ".foo .bar") => true
is-superselector(".foo .bar", ".bar") => false
```
---
### <span class="red">▸ keywords</span>($args)
将传入 `@function` 或 `@mixin` 的参数列表转换成 map 格式的变量。转换后的 key 变成一个字符串，并且没有了 $ 符号。
```scss
@mixin foo($args...) {
  @debug keywords($args); //=> (arg1: val, arg2: val)
}

@include foo($arg1: val, $arg2: val);
```
---
### <span class="red">▸ mixin-exists</span>($name)
检测指定 mixin 是否存在。
```scss
mixin-exists(nonexistent) => false

@mixin red-text { color: red; }
mixin-exists(red-text) => true
```
---
### <span class="red">▸ type-of</span>($value)
返回值类型。
```scss
type-of(100px)  => number
type-of(asdf)   => string
type-of("asdf") => string
type-of(true)   => bool
type-of(#fff)   => color
type-of(blue)   => color
```
---
### <span class="red">▸ unit</span>($number)
返回传入数字的单位（或复合单位）。
```scss
unit(100) => ""
unit(100px) => "px"
unit(3em) => "em"
unit(10px * 5em) => "em*px"
unit(10px * 5em / 30cm / 1rem) => "em*px/cm*rem"
```
---
### <span class="red">▸ unitless</span>($number)
返回一个布尔值，判断传入的数字是否带有单位。
```scss
unitless(100) => true
unitless(100px) => false
```
---
### <span class="red">▸ variable-exists</span>($name)
判断一个变量是否在当前上下文或者全局中存在。
```scss
$a-false-value: false;
variable-exists(a-false-value) => true

variable-exists(nonexistent) => false
```
