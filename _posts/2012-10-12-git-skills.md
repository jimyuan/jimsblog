---
layout: post
title:  Git 常见问题
tags: Git
---

## 如何 Create 和 Clone 一个新的 git repo

### 创建一个 remote git repo

<!--more-->

```
git init --bare test.git
```

### Clone repo
```
git clone test.git
```

### 创建一些文件并 checkin
```
git add -A git commit -m "some message"
```

### 第一次 Push 到 remote repo 的 master branch
```
git push origin master
```

----

## 如何将 local repo 连接到新的 remote repo

### 创建一个新的 remote repo
```
git init --bare test.git
```

### 回到本地，将 remote repo 添加的 local repo
```
git remote add origin /xxx/test.git
```

### 初次将所有本地内容 push 到 remote repo 上，并建立 remote master branch
```
git push origin master
```

### 让本地 master branch 跟踪 remote, 让本地在 push 的时候自动与 remote branch 合并，在 pull 的时候自动从远程获取更新
```
git config branch.[branch-name].remote [remote-name]
git config branch.[branch-name].merge [remote-master]
```

---

## 如何删除远程的分支

### 假设已经用以下命令建立了一个远程分支
```
git push origin newfeature
```

### 可以用以下命令删除这个远程分支
```
git push origin :newfeature
```

### 如果要删除本地分支，可以用以下命令
```
git branch -d newfeature
```

---

## 合并多个 commit 至一个 commit 的简单方法

### 切换至主要分支，例如 master 或 releases/R3
```
git co releases/R3
git fetch
```

### 将 feature brach 合并入主要分支
```
git merge NS-168
```

### Reset 主要分支至远程 origin 的状态
```
git reset origin/releases/R3
```

### Git 将 unstage 所有本地新的更改,然后我们可以将这些在 feature_brach 的生成的更新作为一个 commit
