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


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/ed141b76-e4f4-4030-b3c9-9f8f9925cc4f/0ecc86b3-acdd-477f-ab59-852a7f533d4c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3IFKVIM%2F20250420%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250420T091540Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBcaCXVzLXdlc3QtMiJHMEUCIASCs1Q%2BQlesiuHzC9WMO4x%2Fqkn43NZODBXI6iQaO%2BJ4AiEAjZ%2F6rUvdHnkLX%2B5dSmS9%2F%2FZgh%2BoKzYneK9NXN7FqjrMqiAQIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNAljZJRHtoFlfX%2BhyrcAxHHMhNNlLVtKfh7D9VKfJSPvvQhgrBJSEEiPBi1K%2FWyHiyZrhccQz3XjUZZuTAM5z7aTZi06k4oGwX46Jejlt9lD72IjRY4tWjfv2HC0lUYNT8bKUQKomaO9ZmZdyP4%2Ffsrk7l7vNP%2BVHVsoRT7P%2Bei4enK5LuqeCy8t6Ua0CNB0DjQLBXzKuLpYUvm51coXecyebouTqKb2pmFzdo4VuzY82rT%2Fo0FwBZYW8nSnHU5%2BY59TvY1HAYtRo1O%2FQ%2Bm29mAMEPsHsibobjQq89zQSwLX1zY3nITQcyEr9d73CIBkqIpjHGokmGtyLEkW1uVGBL3f8xYZQuqlx61y5FSKm%2FoAEx5k0Q%2FC9IicGUX52Wc3emNUZnLfhgRqfgzlMv9f0Y1CTAyjNv6MOuaHiclZtCEOAnySupJeYPESD7ojlrYo254MBc%2FWFhcRdcWHoQRahatZXi1pUXNlW78Dz3NX5GHUp0yA8X0AltEkYYNshiCbe8g5T%2BSS2wStz9QH6CJAxz1qPFXpDiyRSknokvHQJL1WJGi6ObMbAhT2WIoNYob9BK8f5bL3yK0bQtdpK0KYlUqWnZk%2FiwaR7tYuMHsD%2BwazQT%2FQtmzHpxHoNG%2BlRvTVXDodLtSJIItPLH%2BMP6jksAGOqUBTGIdRFVsuR7pYe4HyShIzHrgOxrkgOYaTtDMwCvI%2FJ0TqhuBulTHvcrauOogOd3MbO25c%2FHxAZ3eehPz3Yd1JpZggezvcL%2B1svHmsFRX3mb6JY5Kz7EF5%2FfdqEOLrEO0X8pqv0e912Mm531OCmxquJWQi56MZTMXHO%2FyKOvQ%2B%2FbsFoho5hj0nrvaPknWkAmKx4ielLbO76XdWmx0tT%2Byv7r3uXCw&X-Amz-Signature=91399329e0ab02bfe141268fdbd49bc0cd5b3eab38affc1e4c7f09ad9f0d2173&X-Amz-SignedHeaders=host&x-id=GetObject)


         Notion+Vercel 其实也是 `V2EX` 一个比较流行的博客搭配方案。一开始我是被 Notion 劝退，因为之前莫名有 Notion 很复杂，网络不好的印象。但是我在少数派上搜到了一篇教程，开始起手尝试，发现，真香！🔗[少数派 Nobelium教程](https://sspai.com/post/66641#) 


[nobelium官网](https://nobelium.js.org/)


### 优点


        **专注于写作 |** ⭐⭐⭐⭐


        Notion天生拥有极其优雅的智能编辑器，适合写作和分享文字。相比于之前自开发的基于Nuxt.js 的博客，注意力极其被容易分散在博客的功能上，总想动手去修改某些地方，想去把博客变成一块试验田去试验新东西，其实感觉这个是大忌，博客的内容是尤为重要的。写作被浓缩在了 Notion 的服务里，可以在手机上写，可以在 Web 写，可以在客户端写！如果还有人没体验过这么方便的体验，真的是应该体验一下！


         **超级方便的自动化 |** ⭐⭐⭐⭐⭐


        Notion的自动化难以想象！在 Notion 里修改一个字，博客文章约 10s 内自动更新！媲美具有后端数据库的体验！虽然我现在还不是很懂 Nobelium 是怎么做到的，大致推测是通过 Notion 的页面Publish 到互联网的功能作为数据来源，可能有个 Notion API 钩子服务，当文章变更时候自动触发 Vercel 再一次部署抓取最新的数据来源实现更新。实际上我推测还是一个静态页面生成器，通过不断NotionAPI 主动触发达到类似 CMS 的功能。


### 缺点


        缺点我觉得还是相对的，依赖于 Notion 的服务，Notion 的策略决定了博客的继续走通与否。与传统的 Hexo , Hugo的静态博客相比，Github 不会存在文章的备份，可能不好迁移但是相对于大部分 CMS 的博客已经是最方便迁移的了。其实这些也不算缺点，我猜即使以后没有 Notion 以后也会诞生一个类似服务的平台，也会有新的解决方案。

