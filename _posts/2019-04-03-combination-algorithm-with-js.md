---
layout: post
title:  关于组合算法的 JS 实现
jsfile: Math
tags: js combination permutation
---
之前遇到一个实际问题，想做一个关于双色球兑奖的小功能，输入本期开奖号码和自己买的号，实现自动兑奖。但如果我是复式投注的话，我们首先要将购买组合号码拆分出来。大家都读过高中代数，我们学习过排列组合的相关知识，通过它我们能很快计算出复式投注实际的注数。但如何用 JS 将这些组合号码都一个不漏地显示出来呢？
<!--more-->

在各种组合中，排列英文名叫 Permutation，如果与排列顺序有关的组合，我们用数学表达式记做 $$P_{m}^{n}$$，与顺序无关的话，就叫做组合了，英文名叫 Combination，数学表达式记做 $$C_{m}^{n}$$，而今天我们先来了解一下用 JS 如何来实现 $$C_{m}^{n}$$。

在着手解决这个问题时，深感自己的算法水平匮乏，于是上网搜索了一下，希望能得到前辈们的启发，果不其然，让我找到一篇多年前的[博客](https://www.cnblogs.com/purediy/p/3375537.html)，其中的思路让我大受启发，具体算法请移驾该博客自行观赏，但其中精髓，作者称之为“01转换法”。

假设有一个长度为 m 的数组，我每次选取 n 个数组成一组，将所有的可能列举出来：
1. 创建一个由 “0” 和 “1” 组成的数组，长度为 m，数组中 “1” 表示其下标所在的数被选中，为 “0” 则没选中；
2. 初始化该数组，将数组前 n 个元素置 “1” ，表示第一个组合为前 n 个数；
2. 然后从左到右扫描数组元素值的 “10” 组合，找到第一个 “10” 组合后将其变为 “01” 组合；
3. 同时将其左边的所有 “1” 全部移动到数组的最左端；
4. 当 n 个 “1” 全部移动到最右端时，就得到了最后一个组合，组合结束。

举个列子，数组 ['a', 'b', 'c', 'd'] 4 选 3：
```javascript
[1, 1, 1, 0] // ["a", "b", "c"]
[1, 1, 0, 1] // ["a", "b", "d"]
[1, 0, 1, 1] // ["a", "c", "d"]
[0, 1, 1, 1] // ["b", "c", "d"]
```

仔细分析了一下博客里前辈的代码，发现他用了很多循环来实现 $$C_{m}^{n}$$，我想是否可以不用这么多 for 循环来简化代码，实现同样的效果呢？突然灵机一动，不就是 “0011” 吗，把它当做字符串处理不就得了？再说现在 ES6 早已大行其道，前辈兄的代码是该优化一下了。

以下就是我琢磨出来的代码，为了能方便和原代码做对比，一些必要函数和变量名我都尽量保持和原来一致，得罪了前辈哥：

```javascript
/**
 * 获得指定数组的所有组合
 */
function arrayCombine(targetArr = [], count = 1) {
  if (!Array.isArray(targetArr)) return []

  const resultArrs = []
  // 所有组合
  const flagArrs = getFlagArrs(targetArr.length, count)
  while (flagArrs.length) {
    const flagArr = flagArrs.shift()
    resultArrs.push(targetArr.filter((item, idx) => flagArr[idx] === 1))
  }
  return resultArrs
}
/**
 * 获得从 m 中取 n 的所有组合
 * 思路如下：
 * 生成一个长度为 m 的数组，
 * 数组元素的值为 1 表示其下标代表的数被选中，为 0 则没选中。
 *
 * 1. 初始化数组，前 n 个元素置 1，表示第一个组合为前 n 个数；
 * 2. 从左到右扫描数组元素值的 “10” 组合，找到第一个 “10” 组合后将其变为 “01” 组合；
 * 3. 将其左边的所有 “1” 全部移动到数组的最左端
 * 4. 当 n 个 “1” 全部移动到最右端时（没有 “10” 组合了），得到了最后一个组合。
 */
function getFlagArrs(m, n = 1) {
  if (n < 1 || m < n)  return []

  // 1
  let str = '1'.repeat(n) + '0'.repeat(m-n)
  const resultArrs = [Array.from(str, x => Number(x))]

  const keyStr = '10'
  let flag
  while(str.indexOf(keyStr) > -1) {
    flag = str.indexOf(keyStr)
    // 2
    str = str.replace(keyStr, '01')
    // 3
    str = Array.from(str.slice(0, flag))
      .sort((a, b) => b-a)
      .join('') + str.slice(flag)
    // 4
    resultArrs.push(Array.from(str, x => Number(x)))
  }
  return resultArrs
}
```
我们看到，我在组合时就用了一个 while 作了一个不定循环，其他的都用隐式迭代暗度陈仓了。看一下实际效果：

```javascript
// 数组中 5 选 3
arrayCombine(['a', 'b', 'c', 'd', 'e'], 3)
```
返回结果为：`[["a", "b", "c"], ["a", "b", "d"], ["a", "c", "d"], ["b", "c", "d"], ["a", "b", "e"], ["a", "c", "e"], ["b", "c", "e"], ["a", "d", "e"], ["b", "d", "e"], ["c", "d", "e"]]`，完美，哈哈。
