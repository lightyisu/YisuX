---
catalog:
  - jishu
date: '2026-01-21 08:00:00'
type: Post
slug: afwaf
title: Astro | 群岛架构
status: 已发布
urlname: 2e7e9dc9-c245-80a8-a4fa-d8b3f087a57c
updated: '2026-01-26 17:09:00'
---

最近想做模仿官网的练习，既能够练习布局也能够对动画做一点学习(方便找工作:=，于是找到Astro这个内容驱动的框架感觉比较适合。


## 群岛架构


首先就是Astro的特色：群岛架构


[https://docs.astro.build/zh-cn/concepts/islands/](https://docs.astro.build/zh-cn/concepts/islands/)


原因就是Astro觉得拖累现代网页速度的核心是包含了太多的JS


原理：以有无 JavaScript 分割组件，JavaScript 只有在需要的时候才会加载到各个组件中


其中有客户端群岛和服务器群岛：**客户端群岛**就是指定默认组件不携带JS直接编译成HTML/CSS，如果需要有JS交互需要明确给`client:*` 使其载入JS。**服务器群岛(new+新特性)**就是只在某些组件上启用 SSR、访问数据库、读会话，而不需要让整个网站变成 SSR。


知名网站 我以为没啥人用的其实还行：


cf文档站：[https://developers.cloudflare.com/directory/](https://developers.cloudflare.com/directory/)


保时捷官网：[www.porsche.com](http://www.porsche.com/)


Visa设计规范：[https://design.visa.com/](https://design.visa.com/)


All from Built With: [https://trends.builtwith.com/websitelist/Astro](https://trends.builtwith.com/websitelist/Astro)


Wegame:[https://www.wegame.com.cn/](https://www.wegame.com.cn/)


## 开始


首先准备模仿的是鸣潮和终末地的两个官网，相对来说比较结构简单容易实现。首先先看看大致的实现思路：


鸣潮：


[https://mc.kurogames.com/](https://mc.kurogames.com/)(随时会更新）


**主结构**，看起来用的是Swiper幻灯片这种滑窗结构。应该叫Full-page Slider？vue+一点Preact 渲染


**动画**是 GSAP


**难点**


看起来难点有Canvas的LIVE2D动画：


```html
<div class="role-spine-container show">
<div class="spine-player" style="position:relative;height:100%">
<canvas class="spine-player-canvas" style="display:block;width:100%;height:100%" width="2560" height="1229"></canvas>
</div>
</div>
```


从来没写过 ，GPT说是Web 端的 Spine Player，其他应该还算可以比较容易


终末地:


终末地用React写的，我在考虑是否遵循他的React风格。


**主结构**看起来也是直接用Swiper


**动画是**motion.dev


这让我想起还有个animejs的动画库以后可以试试之间的区别：


[https://animejs.com/](https://animejs.com/)


**难点**：


感觉终末地的细节和过渡动画更多一点


**想法：**


不过我发现这个几个游戏网站都是重CSR渲染的，也许文字内容不重要？只需要meta上的做SEO就可以。而腾讯的游戏网站会把完整的HTML作为渲染响应(这个应该我猜测腾讯游戏有些较旧官网还是用的后端渲染的工作流类似JSP/ISP这种，没有什么必要重新构建。但是奇怪的是最应该做SEO的wegame基本上一点没做，而是完全CSR的。在百度和bing还好，在Google就完全wegame+游戏名找查无此人（可能本来就不国际化）。Gemini说腾讯会针对爬虫条件性给响应的可能吧，现在用CSR可能就够了。


待更新

