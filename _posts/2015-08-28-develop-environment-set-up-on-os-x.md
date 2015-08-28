---
layout: post
title:  Mac系统中高效开发环境设置
tags: Mac
---

_前言：其实这份文档是写给自己用作备份的。以下设置针对在 Mac 下做开发，特别是前端开发的小伙伴做参考。_

<!--more-->

### 设置树

* [__Xcode:__](https://itunes.apple.com/cn/app/xcode/id497799835?mt=12) 去 App Store 下载吧，免费大！
* [__HomeBrew:__](http://brew.sh/) 安装—— `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`，以下环境用 `brew install` 命令安装
  * node: node.js 环境，以下工具用 `npm install` 安装
      * gulp: 前端自动化工具
      * bower: 前端框架管理工具
      * cnpm: 安装—— `npm install -g cnpm --registry=https://registry.npm.taobao.org`，npm 的淘宝镜像，你懂的！
  * git: 版本控制工具
  * tmux: 终端复用工具
  * [__cask:__](http://caskroom.io/) 安装—— `brew install caskroom/cask/brew-cask`， 以下 app 用 `brew cask install` 命令安装
      * atom: 开源前端 IDE
      * google-chrome: 那啥，不解释
      * iterm2: 系统终端替代工具
      * dash: 开发文档查询工具
      * alfred: 逆天工具
      * xtrafinder: 系统 Finder 增强工具
* [__oh my zsh:__](http://ohmyz.sh/) 安装—— `sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`
