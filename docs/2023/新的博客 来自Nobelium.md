---
catalog:
  - '2023'
date: '2023-08-06 08:00:00'
type: Post
slug: newBlogFromNobelium
title: 新的博客 来自Nobelium
status: 已发布
urlname: cb560c23-a833-4f05-b803-cd3f349ecfe2
updated: '2024-04-13 22:58:00'
---

### 起因


       今天终于，找到一个非常不错的博客解决方案。


       Vercel+Nobelium！最近几天总是想更新我的博客，但总是想到需要用 `Typeora` 去很麻烦地在本地去写 Markdown 就觉得非常难受。这简直是世界上最难受的一种写笔记的方式！虽然我以前觉得蛮好的，因为高度的定制化使我能控制前端的每一个部分，觉得可以随便修改，但是现在只会感觉枯燥和折磨。我急切的寻求一种更为优雅的解决方法来书写东西。


### CMS or Static Blog ?


        可选的不多，我去 `V2EX` 逛了一圈，估算下来大部分人用的是 hexo 或者 hugo , jekyll等静态生成器，虽然不太清楚别人的自动化流程是什么，但我已经对 hexo 和 hugo 非常不感兴趣。原因不下这些，里面的主题不太合我的胃口，想要定制化这些前端必须得学一下模板语法等等。转而我更想加入CMS的队列，CMS现在的发展也比较百花齐放，有无头的 `ghost` `strapi` 也有老牌的 `wordpress` `typecho` 。我想试试 `typecho` 但是由于我想接入免费的 planetscale 的数据库，卡在了 planetscale 的连接需要 SSL 而我不知道如何配置 `typecho` 而放弃。


### Vercel+notion+nobelium


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/ed141b76-e4f4-4030-b3c9-9f8f9925cc4f/0ecc86b3-acdd-477f-ab59-852a7f533d4c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466REZR5BNU%2F20250530%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250530T102630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICQOYY7EqEsYAgHO3yOjX%2Bs3jOwtOUnFKECa9XvdzlRAAiEAu9kl5MJdJs7w7qP7BATgPTwd6Esu4XbdWGgbIuxGiPcqiAQIo%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDB8N621R8I9bzrg5PCrcA5NJJYPUNtZBSYsBP52k16KDD%2FIrPhwapRaHeZZ%2Fqh5ikkLuJmWcl78MvsDZzNFf%2BUfOUrZTc4aCHDR%2B%2BqgAh7U33%2B3JetDydlxCVBHjuTuOMdvGT7TaiXg611FKxW%2BcGj0EhiGoY5E2SloO7WFZQHLkySBOObQ5nOEkO3MpRYJ%2F6gLX0UHbZMszLPbHIjLEF6UWcUZQjfysEpJUySZhAPgD34mAb2pjxb5LTDbnrTI8avj99SkFijNO8GnbMe5g8Z6IBE4rqQmBiIUosDyK6LolVMN8Hf7RF7r%2Fdr9g4B5cZrEdcbThGI7Q4rPmEb%2B3CSl%2BfQ37khrU808yd3qdqKb7xvpTa3r3MkxU4PPG0Xvc1BZq6Y3iMrgKLqf7v%2F9EiD%2F0O43s57XIByRH2zLd%2FxrJS1tuhzwYQbEm3Hq05hL1zxLbq%2BmbJ7VWYgOdU6a8nu55Hk2GP%2BgAvHFUrc1zcHVmj9GYbHk5Pli8McwgyCBMbH%2BHIf%2FQCf4ROo853QHtOPtaAOI2dboagY6s5uBWmRjm2Z8ivteXACstRUfMD0sjrR87T6OJXP%2BgGgkUN1IS93ozwe6%2FvjD9twGvRnEEnBJuU4tXuMio7PXNJRGBCkhBTulhJ7DImpAzXMDmMKKO5sEGOqUB9KcPCC5sVF1nIimUnR2ZbxgB%2F0M%2B6vUdxSKqEu9MhMMSLC1AOx%2BOQScLZMvpsNk59CclgPq7gM3uYcJ75GZ1jZAmjK%2Bl3s40Khzy4q9QtjQmNWndPpcqMgOoJef%2FimtGYiPc1iTKTIVfbdOq2z%2BFB6JQYG9Rq9Xd8%2BKi%2F%2BGbgliwWoUyURMX3dUo6h5ITjOxS2slKO8zdIZKwfqCI%2Bk2hGA1bJJ0&X-Amz-Signature=943b4a8fa4785a19703d25e920fb4cb9210d2bb0ed2667a2b7125cbdf60753ac&X-Amz-SignedHeaders=host&x-id=GetObject)


         Notion+Vercel 其实也是 `V2EX` 一个比较流行的博客搭配方案。一开始我是被 Notion 劝退，因为之前莫名有 Notion 很复杂，网络不好的印象。但是我在少数派上搜到了一篇教程，开始起手尝试，发现，真香！🔗[少数派 Nobelium教程](https://sspai.com/post/66641#) 


[nobelium官网](https://nobelium.js.org/)


### 优点


        **专注于写作 |** ⭐⭐⭐⭐


        Notion天生拥有极其优雅的智能编辑器，适合写作和分享文字。相比于之前自开发的基于Nuxt.js 的博客，注意力极其被容易分散在博客的功能上，总想动手去修改某些地方，想去把博客变成一块试验田去试验新东西，其实感觉这个是大忌，博客的内容是尤为重要的。写作被浓缩在了 Notion 的服务里，可以在手机上写，可以在 Web 写，可以在客户端写！如果还有人没体验过这么方便的体验，真的是应该体验一下！


         **超级方便的自动化 |** ⭐⭐⭐⭐⭐


        Notion的自动化难以想象！在 Notion 里修改一个字，博客文章约 10s 内自动更新！媲美具有后端数据库的体验！虽然我现在还不是很懂 Nobelium 是怎么做到的，大致推测是通过 Notion 的页面Publish 到互联网的功能作为数据来源，可能有个 Notion API 钩子服务，当文章变更时候自动触发 Vercel 再一次部署抓取最新的数据来源实现更新。实际上我推测还是一个静态页面生成器，通过不断NotionAPI 主动触发达到类似 CMS 的功能。


### 缺点


        缺点我觉得还是相对的，依赖于 Notion 的服务，Notion 的策略决定了博客的继续走通与否。与传统的 Hexo , Hugo的静态博客相比，Github 不会存在文章的备份，可能不好迁移但是相对于大部分 CMS 的博客已经是最方便迁移的了。其实这些也不算缺点，我猜即使以后没有 Notion 以后也会诞生一个类似服务的平台，也会有新的解决方案。

