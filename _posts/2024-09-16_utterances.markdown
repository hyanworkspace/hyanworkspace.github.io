---
layout: post
title:  "用utterances为githubs pages加一个评论区"
date:   2024-09-16
is_project: false
categories: blogs
tags: ['blog-building']
---

utterances 是一款基于 GitHub issues 的评论工具。相比同类的工具 gitment、gitalk 以及 disqus 评论工具，优点如下：

* 极其轻量
* 加载非常快
* 配置比较简单

disqus配置也比较简单，也是免费的。但是，广告多，而且加载也比较慢。所以chatGPT 也推荐使用 utterances。

## 配置

### 1. 安装 utterances 应用程序
utterances 的安装相当简单，因为出品了一个 Github App。[这里](https://github.com/apps/utterances) 可以抵达安装页面。

首先安装这个 App ，选择要关联评论的仓库。
![utterances安装步骤1](/assets/images/utterances_github_1.png)

### 2. 使用

在需要添加评论的地方，添加如下代码：

```html
<script src="https://utteranc.es/client.js"
        repo="你的 github pages 仓库"
        issue-term="pathname"
        theme="github-light"
        crossorigin="visitor"
        async>
```

就在页面中添加一个评论区了！🎉

## 参考资料

* [utterances](https://utteranc.es/)
* [utterances-github-pages](https://github.com/apps/utterances)