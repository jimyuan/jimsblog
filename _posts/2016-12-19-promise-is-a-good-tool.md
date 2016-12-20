---
layout: post
title:  Promise 是个好东西啊！
tags: js es6
---

基于 js 的异步计算，很多初学者往往忘记了其执行的滞后性，在结果尚未返回前就急于要获得其结果，忘记了需要 callback 才能正确获取异步过程的值。于是，渐渐熟悉该现象的人们开始熟练的运用起了 callback，愉快的接受着异步返回的值，直到有一天，他们不约~~儿童~~而同地陷入了一个叫“回调陷阱”的玩意儿里……
<!--more-->

以下是某绝密项目源码的最后一页，Like this：

```js
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
```

_（以下 demo 代码用 setTimeout 来模拟异步过程，用 ECMAScript 2015 语法编写）_

## 初学者的迷茫

一个初学者往往会写出以下代码来计算结果：

```js
function getValue() {
  let val = 0
  setTimeout(() => { val = 2 }, 100)
  return val
}

function compute() {
  let x = getValue()
  console.log(x * x)
}

compute() // 0
```

为啥这样写法最后却输出了 0 ？那是当然了！要是你能让 js 计算出来的结果是你心目当中的 4 的话，我打算当场把笔记本吞下去。很显然，当 `r=2` 这个异步过程尚未开始时，函数 `getValue` 已经将 `r=0` 给 return 了。

## 入门者的蜜汁回调

异步嘛，就是要相应的回调啊，回调是个好东西啊！

```js
function getValue(callback) {
  let val = 0
  setTimeout(callback, 100, val = 2)
}

function compute(x) {
  console.log(x * x)
}

getValue(compute) // 4
```
Good boy! 乖乖的回调出 4 啦！

## 牛逼闪闪： I PROMISE!

我许诺，我会拿到你异步的值以后再行动！I promise！

```js
function getValue() {
  let val = 0
  return new Promise(resolve => {
    setTimeout(resolve, 100, val = 2)
  })
}

function compute(x) {
  console.log(x * x)
}

getValue().then(compute) // 4
```

## 打碎回调陷阱！

假如我们有多个异步过程，而下一个异步过程需要用到上一个异步得到的值，在传统 callback 写法中，可怕的“回调陷阱”就是这样产生的。让 `Promise.all` 来拯救吧！

```js
function getValue() {
  let val = 0
  return Promise.all([
    // 回调一
    new Promise(resolve => {
      setTimeout(resolve, 300, val = 2)
    }),
    // 回调二
    new Promise(resolve => {
      setTimeout(resolve, 200, val *= val)
    }),
    // 回调三
    new Promise(resolve => {
      setTimeout(resolve, 100, val *= val)
    })
  ])
}

function compute(data) {
  console.log(data[2])
}

getValue().then(compute) // 16
```

`Promise.all` 之后得到的 data 参数是所有异步回调值的一个数组，所有异步，会按照书写顺序依次进行异步操作，避免了回调嵌套的恐怖景象。

## 新一代的朋友看过来，Generator 函数来啦

ES6 引入 Generator 函数，作用就是可以完全控制函数的内部状态的变化，依次遍历这些状态。

```js
function getValue() {
  let val = 0
  setTimeout(() => { it.next(val=2) }, 100)
}

function* compute() {
  let x = yield getValue()
  console.log(x * x)
}

let it = compute()
it.next() // 4
```

## 终极武器： async/await

ES6 还没普及，ES7 又带来了一个异步操作的终极方案。

```js
function getValue() {
  let val = 0
  return new Promise(resolve => {
    setTimeout(resolve, 100, val=2)
  })
}

async function compute() {
  let x = await getValue()
  console.log(x * x)
}

compute() // 4
```

以上的异步处理方法，除了最后这个 async/await 无法在现有 Chrome(Ver54.) 下运行外，其他都能原生支持。当然，通过 Babel 预处理后，以上代码都能愉快地执行了。

整理自原文([https://zhuanlan.zhihu.com/p/24404144]())，对代码稍作了修改。
