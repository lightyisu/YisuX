---
catalog:
  - jishu
date: '2023-08-06 08:00:00'
type: Post
slug: newBlogFromNobelium
title: 新的博客 来自Nobelium
status: 已发布
urlname: cb560c23-a833-4f05-b803-cd3f349ecfe2
updated: '2025-08-05 19:25:00'
---

### 起因


       今天终于，找到一个非常不错的博客解决方案。


       Vercel+Nobelium！最近几天总是想更新我的博客，但总是想到需要用 `Typeora` 去很麻烦地在本地去写 Markdown 就觉得非常难受。这简直是世界上最难受的一种写笔记的方式！虽然我以前觉得蛮好的，因为高度的定制化使我能控制前端的每一个部分，觉得可以随便修改，但是现在只会感觉枯燥和折磨。我急切的寻求一种更为优雅的解决方法来书写东西。


### CMS or Static Blog ?


        可选的不多，我去 `V2EX` 逛了一圈，估算下来大部分人用的是 hexo 或者 hugo , jekyll等静态生成器，虽然不太清楚别人的自动化流程是什么，但我已经对 hexo 和 hugo 非常不感兴趣。原因不下这些，里面的主题不太合我的胃口，想要定制化这些前端必须得学一下模板语法等等。转而我更想加入CMS的队列，CMS现在的发展也比较百花齐放，有无头的 `ghost` `strapi` 也有老牌的 `wordpress` `typecho` 。我想试试 `typecho` 但是由于我想接入免费的 planetscale 的数据库，卡在了 planetscale 的连接需要 SSL 而我不知道如何配置 `typecho` 而放弃。


### Vercel+notion+nobelium


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/ed141b76-e4f4-4030-b3c9-9f8f9925cc4f/0ecc86b3-acdd-477f-ab59-852a7f533d4c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466634R6S5D%2F20250805%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250805T152854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECcaCXVzLXdlc3QtMiJHMEUCIQCmKj8gGncvc1%2B8Yoc3QSPyO8Hk4AASkgCMTYF%2Bi80N%2FgIgedjzrjerSqjRQYkSXOcYFtSj6cwP75dsweF03WjB%2F6Yq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDG09CDCuFah6H2oMzCrcA0l6doprA9yPok%2F2f8isGc0iAazXZvB6PDp%2FzSRcKL2cOBdoOHX%2FnE7M%2FrlHWduAwVqn1Pp2ks%2B5eX%2BQ3C1%2FI2Nq3wgRCSfbAfFuwMZt3coD5zPpYbENKnFHtnUuuQMpvMc138XoQfipKmtfCnnHnT0ZvqZdDxnFDtW2wcSNeFYQLaGFH5gpQRCQFqtB3u3ehLy%2BiSTWgnB5iiorFpc02N7t0sSgM4Zqjdv9gFH0dmv1szXUr0PwLO3Z3DGvQkKv64%2FcVzMd4Lc54SGi6M7llsJUNLqQQbCnLwD9NxH7ynidIY%2BplFdFs%2FcJslgPACoo717CTm%2BWirkHNHUsTxHv%2FBf7XEPlBSCGbv%2FPsJ2JVM0C9GUy%2FNae0NeS4SR96sxM27GThyDU%2Fh56fEdbMdWckoNpOG%2FRRjTIEnJthP4c2IhY5S8zzrKRuwiouljA803ieGmWFzFqG%2B%2Fw4YxYgdXumOcEUqJgWhFYc9U%2BMmbAdZR%2BY1jqCVLd4wvdzatEQ87US7jGxAQ5dYC3o7yIXvioQNR%2Bp2cGKE71ctmmuOn46z5RBkakPspv9ER51f4S%2F3UNfmp9idYz3ZBxjUwUfZX8MBUtRMHurmr%2FXFcuXxiiaAPwAOdPt6YCN0LIBemQMMWnyMQGOqUB37F20LpGtOdYEBGg9nvsOP5GXKF3YBZKrgh0r0hdDLJChuvUjW4smM2Q3BFaXeKs5csecGo74bTPdFcJiy7CMSO4VeFT%2FpSUFUTbcgwAFdBVEaSAQKs55qYAuj7USL597BvzdnM986M7soqegGggRaNFNPnJ9hzydb9aENLhR84co5cWZGKcwU2UnGq6XpxC7zR1rT51QHBZu5n3uSnOuSQCELBb&X-Amz-Signature=39ff951ea2d20db87859d9dfa46f5356ff86f1be18ad0b2a085c967e4af29849&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


         Notion+Vercel 其实也是 `V2EX` 一个比较流行的博客搭配方案。一开始我是被 Notion 劝退，因为之前莫名有 Notion 很复杂，网络不好的印象。但是我在少数派上搜到了一篇教程，开始起手尝试，发现，真香！🔗[少数派 Nobelium教程](https://sspai.com/post/66641#) 


[nobelium官网](https://nobelium.js.org/)


### 优点


        **专注于写作 |** ⭐⭐⭐⭐


        Notion天生拥有极其优雅的智能编辑器，适合写作和分享文字。相比于之前自开发的基于Nuxt.js 的博客，注意力极其被容易分散在博客的功能上，总想动手去修改某些地方，想去把博客变成一块试验田去试验新东西，其实感觉这个是大忌，博客的内容是尤为重要的。写作被浓缩在了 Notion 的服务里，可以在手机上写，可以在 Web 写，可以在客户端写！如果还有人没体验过这么方便的体验，真的是应该体验一下！


         **超级方便的自动化 |** ⭐⭐⭐⭐⭐


        Notion的自动化难以想象！在 Notion 里修改一个字，博客文章约 10s 内自动更新！媲美具有后端数据库的体验！虽然我现在还不是很懂 Nobelium 是怎么做到的，大致推测是通过 Notion 的页面Publish 到互联网的功能作为数据来源，可能有个 Notion API 钩子服务，当文章变更时候自动触发 Vercel 再一次部署抓取最新的数据来源实现更新。实际上我推测还是一个静态页面生成器，通过不断NotionAPI 主动触发达到类似 CMS 的功能。


### 缺点


        缺点我觉得还是相对的，依赖于 Notion 的服务，Notion 的策略决定了博客的继续走通与否。与传统的 Hexo , Hugo的静态博客相比，Github 不会存在文章的备份，可能不好迁移但是相对于大部分 CMS 的博客已经是最方便迁移的了。其实这些也不算缺点，我猜即使以后没有 Notion 以后也会诞生一个类似服务的平台，也会有新的解决方案。

