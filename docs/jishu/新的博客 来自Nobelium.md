---
catalog:
  - jishu
date: '2023-08-06 00:00:00'
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


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/ed141b76-e4f4-4030-b3c9-9f8f9925cc4f/0ecc86b3-acdd-477f-ab59-852a7f533d4c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V3KW5JHK%2F20250805%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250805T112857Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECIaCXVzLXdlc3QtMiJHMEUCIQCDX%2BFFXdOCVMgDFTgsL%2BPdF0hrmgI46QVDFVDXHm5ccAIgQWjNnwoUUaD9LvlXaNxi%2Fc1jokpSR4dDxzklZZzYpYMq%2FwMIWxAAGgw2Mzc0MjMxODM4MDUiDFUTedr6Out9t6wTSCrcA%2FGHmEJq2QCc2e%2BpVfHmTXOBENdc4SWGpMtmtggKYyLTM38e0P60Co8Ey%2Bl5xTQ6u%2BVVxafJm0tpVVt6WAQfrxJHUL9yWJmdDjtKHVCPDKHgAkPieWI4pxnoTTA%2Feth10Yyc2giLr9uedCu9y5pA83HgPk8M2oT1RLiX5J6P0tfSqgPOm0tj35YL1EcNNBVmkJVKvCGGBXr1O4nTjQYQ1VM45%2FyajctrqvyDd3%2FH0ICPHkRyJ6m6gJ%2FPS%2FaxGUHXf4WLEbtCLxCz37BKgmWj0NC2Kd7M3mUM2A9fCOshDYnJo4E%2FHF7XnQ61slX%2BWn5ZB0NBaVUGlutddoakgFgyi6sTGQtrmL7DSRo%2Bi7Os%2FaC9kG7KRSGYpp68nzbnMH%2FRAqOcTUaMg6HzjXYKUeMg1mTwnd1aLWJnJReGKj%2FtwxN3BdCVbKJ2Z9yvcbmpUpIwb%2FDtMZCwZ0zEbBHifa5Z%2FsfPOg8Nx7frytjqrDv1CvWU7T7qPKxASbSk4k7RflfYjOjHaBDrV9NmgvatiXOiz8ChcmqL6vt%2BRcFFNHgmHuGangDP40n84MXOv6SgFxbIYj2yysb3xzBeG4Ewm%2FrxKYru0%2FHSuK18zt4bJP1daxjRnFgHK%2BB5xFBVr2fBMJetx8QGOqUB4as7y%2FBHM%2FJ3P387BhRj%2BjpWFLzMAVWxJCl9sPJpy3mv32fCpQzyU6%2Fgnn0KFGXdjCugq0utHYo8KOM4g9VMlEVu6aAn6IyHXkGLSoLAoaOrSme8VPI0EfmoXNxF547MJGHF4rXdU%2FngBKTffH9DtusocGeOn%2BibefGCmuzerz1bK5Hl5laYVGnjJFx8DhX25lU0aL8oc%2FxbVkpueKdAvjhmB64G&X-Amz-Signature=aefbd81cb0b9b8bf079b18ab00d05b850f7e2244ba9323d68882ce4a85986aee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


         Notion+Vercel 其实也是 `V2EX` 一个比较流行的博客搭配方案。一开始我是被 Notion 劝退，因为之前莫名有 Notion 很复杂，网络不好的印象。但是我在少数派上搜到了一篇教程，开始起手尝试，发现，真香！🔗[少数派 Nobelium教程](https://sspai.com/post/66641#) 


[nobelium官网](https://nobelium.js.org/)


### 优点


        **专注于写作 |** ⭐⭐⭐⭐


        Notion天生拥有极其优雅的智能编辑器，适合写作和分享文字。相比于之前自开发的基于Nuxt.js 的博客，注意力极其被容易分散在博客的功能上，总想动手去修改某些地方，想去把博客变成一块试验田去试验新东西，其实感觉这个是大忌，博客的内容是尤为重要的。写作被浓缩在了 Notion 的服务里，可以在手机上写，可以在 Web 写，可以在客户端写！如果还有人没体验过这么方便的体验，真的是应该体验一下！


         **超级方便的自动化 |** ⭐⭐⭐⭐⭐


        Notion的自动化难以想象！在 Notion 里修改一个字，博客文章约 10s 内自动更新！媲美具有后端数据库的体验！虽然我现在还不是很懂 Nobelium 是怎么做到的，大致推测是通过 Notion 的页面Publish 到互联网的功能作为数据来源，可能有个 Notion API 钩子服务，当文章变更时候自动触发 Vercel 再一次部署抓取最新的数据来源实现更新。实际上我推测还是一个静态页面生成器，通过不断NotionAPI 主动触发达到类似 CMS 的功能。


### 缺点


        缺点我觉得还是相对的，依赖于 Notion 的服务，Notion 的策略决定了博客的继续走通与否。与传统的 Hexo , Hugo的静态博客相比，Github 不会存在文章的备份，可能不好迁移但是相对于大部分 CMS 的博客已经是最方便迁移的了。其实这些也不算缺点，我猜即使以后没有 Notion 以后也会诞生一个类似服务的平台，也会有新的解决方案。

