---
layout: post
title:  触摸的瞬间 - touch事件的分解
tags: iOS
---
#### 第一根手指放下
- 触发touchstart，除此之外什么都不会发生

#### 第二根手指放下
- 触发gesturestart
- 触发第二根手指的touchstart
- 触发gesturechange 

#### 手指移动
- 持续触发gesturechange

#### 第二根手指提起
- 触发gestureend，不再触发gesturechange 
- 触发第二根手指的touchend 
- 触发touchstart！ 

#### 提起第一根手指
- 触发touchend 

触完收工!