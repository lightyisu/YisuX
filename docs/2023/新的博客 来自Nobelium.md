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


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/ed141b76-e4f4-4030-b3c9-9f8f9925cc4f/0ecc86b3-acdd-477f-ab59-852a7f533d4c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JBARWLF%2F20250801%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250801T061659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBkyTJFD1aAE37kcQMLJeh7VHnnUjUk39SkVFVedh4cVAiBZasF7QAQA8Okc5wOHTxxcnzb5SidjiEFj30dSZEZmQyqIBAjm%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMPmbQxtPqL5cYNJ0bKtwDCy1Da6bPZt8ZCzW9bVEQi5wRxNfIVVk4MrHInWRb6b%2BOwLvXY%2BEFXfycN4%2FrlMpD%2FPtE5QRYHljJZ0KsJVrLvcJ24TwqNTghPisr7%2B%2Fg3kuUfrShWZqdlwEzOl8CqOB15Pk%2B9S1eYlRn8gqGWOBkm8Vm6EmM8jc%2BiPMvShZPZVB%2BV%2FAaj16x2ybQB3TvKy92P7OjgF2CcbLUUsLwBf%2FR8X4iVoJQSRdvdx0ujcD77u7it%2FUbaPGfCZqktBwvSKYeX0mP4kcGsaor7cJvp%2BaH9TQgCVYoeF6pTvQkRNjt1%2Fh95maQYFAaXFFJxVgAYWACz38%2BGcQNmA1nmAzAcg%2BYis%2Bamv1yhxROaFJN2XEyW%2BSIavGMB62vkuNyrxuMSB0OYlp9wGfqomtfvx9UwDY%2BUccMs%2FN5Zqvq7TXNpbJ76sb5o2FbSfU6KDYm6Rn2vsrTgB8YliG18JB0W%2FApRB6BaoiO5D8MJrdcXA0dN2pJLtA4m0oUgOj%2BNT2tF5rdAmQZ5Mgnc4Mdr0xnXHT2Oe%2BSxg3nzz2%2F5GhumoMAm2rKYv3cL7QIuSjmYV90Wiy1lnal8MEErPHDVxQzGThtDcD4B%2Bn%2F4icio0m9V6ziyjmWSwqC2aChixrzqfsR7b0wnZyxxAY6pgEJtKuWZGBTJmgVbjasazz5dpYDa9Q7nhr2rAej8I1Zmbd%2FjoR7Vw6717SCPJ%2B7goqolUSf%2BL3nia8CLSrnXwN6Km4CDBbF5yByVNJ0unG84J97iCAk%2BVHPOh4WbcAeh8R5oi%2F65pIHwOk6s3Jfts6x0XoqxwNayFQoOjL7C2pSsOyNbs2hDWXlecUhTDeUDjmv3HNWlDreWP%2BxWKPyTwInqR83FN0m&X-Amz-Signature=9f9e1df385388d9b979ae7f19f1a930e5a8234b8597797789e4a746b560b58c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


         Notion+Vercel 其实也是 `V2EX` 一个比较流行的博客搭配方案。一开始我是被 Notion 劝退，因为之前莫名有 Notion 很复杂，网络不好的印象。但是我在少数派上搜到了一篇教程，开始起手尝试，发现，真香！🔗[少数派 Nobelium教程](https://sspai.com/post/66641#) 


[nobelium官网](https://nobelium.js.org/)


### 优点


        **专注于写作 |** ⭐⭐⭐⭐


        Notion天生拥有极其优雅的智能编辑器，适合写作和分享文字。相比于之前自开发的基于Nuxt.js 的博客，注意力极其被容易分散在博客的功能上，总想动手去修改某些地方，想去把博客变成一块试验田去试验新东西，其实感觉这个是大忌，博客的内容是尤为重要的。写作被浓缩在了 Notion 的服务里，可以在手机上写，可以在 Web 写，可以在客户端写！如果还有人没体验过这么方便的体验，真的是应该体验一下！


         **超级方便的自动化 |** ⭐⭐⭐⭐⭐


        Notion的自动化难以想象！在 Notion 里修改一个字，博客文章约 10s 内自动更新！媲美具有后端数据库的体验！虽然我现在还不是很懂 Nobelium 是怎么做到的，大致推测是通过 Notion 的页面Publish 到互联网的功能作为数据来源，可能有个 Notion API 钩子服务，当文章变更时候自动触发 Vercel 再一次部署抓取最新的数据来源实现更新。实际上我推测还是一个静态页面生成器，通过不断NotionAPI 主动触发达到类似 CMS 的功能。


### 缺点


        缺点我觉得还是相对的，依赖于 Notion 的服务，Notion 的策略决定了博客的继续走通与否。与传统的 Hexo , Hugo的静态博客相比，Github 不会存在文章的备份，可能不好迁移但是相对于大部分 CMS 的博客已经是最方便迁移的了。其实这些也不算缺点，我猜即使以后没有 Notion 以后也会诞生一个类似服务的平台，也会有新的解决方案。

