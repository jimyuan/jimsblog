---
layout: post
title:  Git 常见问题
tags: Git
---

#### 如何Create和Clone一个新的 git repo

#####创建一个remote git repo

<!--more-->

<kbd>git init --bare test.git</kbd>

#####Clone repo
<kbd>git clone test.git</kbd>

#####创建一些文件并checkin
<kbd>git add -A git commit -m "some message"</kbd>

#####第一次 Push到remote repo的 master branch
<kbd>git push origin master</kbd>

----

#### 如何将local repo连接到新的remote repo

#####创建一个新的remote repo
<kbd>git init --bare test.git</kbd>

#####回到本地，将remote repo添加的local repo
<kbd>git remote add origin /xxx/test.git</kbd>

#####初次将所有本地内容push到remote repo上，并建立remote master branch
<kbd>git push origin master</kbd>

#####让本地master branch跟踪remote, 让本地在push的时候自动与remote branch合并,在pull的时候自动从远程获取更新
<kbd>git config branch.[branch-name].remote [remote-name] </kbd><br>
<kbd>git config branch.[branch-name].merge [remote-master]</kbd>

---

#### 如何删除远程的分支

#####假设已经用以下命令建立了一个远程分支
<kbd>git push origin newfeature</kbd>

#####可以用以下命令删除这个远程分支
<kbd>git push origin :newfeature</kbd>

#####如果要删除本地分支，可以用以下命令
<kbd>git branch -d newfeature</kbd>

---

#### 合并多个commit至一个commit的简单方法

#####切换至主要分支，例如master或releases/R3
<kbd>git co releases/R3</kbd><br>
<kbd>git fetch</kbd> (# this may be necessary (depending on your git config) to receive updates on origin/master git pull)

#####将feature brach合并入主要分支
<kbd>git merge NS-168</kbd>

#####Reset 主要分支至远程origin的状态
<kbd>git reset origin/releases/R3</kbd>

#####Git 将unstage所有本地新的更改,然后我们可以将这些在feature_brach的生成的更新作为一个commit
