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


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/ed141b76-e4f4-4030-b3c9-9f8f9925cc4f/0ecc86b3-acdd-477f-ab59-852a7f533d4c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DBXBRUL%2F20250920%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250920T141553Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIH%2Ba9ObUl2gep0DO2b2tWvloZyvTJmMA4mE7JdzCHnQSAiEAuAUpzI3VmgdPuJsMGFqt7%2BpeXXb8VTc12CW8O9f%2Bc0IqiAQI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIJJASuRtkzOeO1qmCrcA5xHe8pKqZ9bRxQJ7SmuWwszt1lezQT0jRqXhC099sS51rmfgXPrqkNWA%2FTYON0mbk70FKTJcLEl%2BwFM306vCG%2FJWb%2BQiWvbDpy0y%2F7EKmY36i6v1EgALNgulBwFLyg65zlTlaDC4aWksC6lZ1oEqpmfnSH4Sr2OndpsW8IXwKTD6W1NNoTW4YmtooqZ%2FMBrA5a%2BNEsf7w8FXJ0Qij3skKqTGUe0B2kikpmgfJQmrCOqUbk6NozE2oEaMTaQ9Z8awdx7INTSHaVZs2mQfV4E9C3voqDio4CxKer2Fk%2BtxJNR5aGzXByyWHe%2FVQm9%2BOOZwy0R9CeK4c%2FSbke9P5kRbgOKZExYcA53H0Cb1RRxJ%2FqbNKMgMaZXNsrjeoLhFCj4tJXRt6ikZE1SnQFETUkxsGky0sEJc2lpADX3QoWy0%2FlM1Jg31xs7xe9TMbSLJD0u9wjIwhcfL3NJxtK0WiLeDyrxCRRq8nwdqykm49FI5NGdiyfzsn3truCCiOG%2BATz%2BQ5d4GiDtpinzsGb9nHBGhEkME9EAZCNu25JaZXJJAZJrgVyskkeyTZYSJrXPhO1%2BYTvKndxmezEi6OQV3MSI%2Bocv2q%2BdAG%2BcOXVK7%2FK%2B%2FcbrbrEfu72n%2BVySpYVkMOHeusYGOqUB%2FERvBqICSX2fG%2BkJ4%2B18WrKd12BUYhlsl5JDLnNNVlW1cknKv4bDj6Ou6Beq6BwNOSQj4AFLOSsKsxesQ%2B%2B78QeaIiFTC5PLvf2zmQx%2B2FbXR%2B7Bh%2FgyQYN8V8f4swuQhBLKqIJr%2BeXEhk0i4eNnqSAT9PMXTMIs1r9wqph1EdbJAzN4Qv63mQ4EphSzu4noJDNvjFNEmkJXUZm0rMkZL2Hj8ikO&X-Amz-Signature=0d070742caa9c0162b4cc56c1e5a47b5bd94ba116291f4982fdc0cfc0a2458b4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


         Notion+Vercel 其实也是 `V2EX` 一个比较流行的博客搭配方案。一开始我是被 Notion 劝退，因为之前莫名有 Notion 很复杂，网络不好的印象。但是我在少数派上搜到了一篇教程，开始起手尝试，发现，真香！🔗[少数派 Nobelium教程](https://sspai.com/post/66641#) 


[nobelium官网](https://nobelium.js.org/)


### 优点


        **专注于写作 |** ⭐⭐⭐⭐


        Notion天生拥有极其优雅的智能编辑器，适合写作和分享文字。相比于之前自开发的基于Nuxt.js 的博客，注意力极其被容易分散在博客的功能上，总想动手去修改某些地方，想去把博客变成一块试验田去试验新东西，其实感觉这个是大忌，博客的内容是尤为重要的。写作被浓缩在了 Notion 的服务里，可以在手机上写，可以在 Web 写，可以在客户端写！如果还有人没体验过这么方便的体验，真的是应该体验一下！


         **超级方便的自动化 |** ⭐⭐⭐⭐⭐


        Notion的自动化难以想象！在 Notion 里修改一个字，博客文章约 10s 内自动更新！媲美具有后端数据库的体验！虽然我现在还不是很懂 Nobelium 是怎么做到的，大致推测是通过 Notion 的页面Publish 到互联网的功能作为数据来源，可能有个 Notion API 钩子服务，当文章变更时候自动触发 Vercel 再一次部署抓取最新的数据来源实现更新。实际上我推测还是一个静态页面生成器，通过不断NotionAPI 主动触发达到类似 CMS 的功能。


### 缺点


        缺点我觉得还是相对的，依赖于 Notion 的服务，Notion 的策略决定了博客的继续走通与否。与传统的 Hexo , Hugo的静态博客相比，Github 不会存在文章的备份，可能不好迁移但是相对于大部分 CMS 的博客已经是最方便迁移的了。其实这些也不算缺点，我猜即使以后没有 Notion 以后也会诞生一个类似服务的平台，也会有新的解决方案。

