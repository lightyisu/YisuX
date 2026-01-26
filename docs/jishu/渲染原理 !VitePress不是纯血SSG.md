---
catalog:
  - jishu
date: '2026-01-26 08:00:00'
type: Post
slug: addwad
title: 渲染原理 |VitePress不是纯血SSG?
status: 已发布
urlname: 2f4e9dc9-c245-802e-ad07-f8b582477c58
updated: '2026-01-26 23:26:00'
---

因为最近在复习前端，而且接触到Astro发现有一个好的渲染理念和原理还是挺巧妙的。而且我一直没发现VitePress其实不是纯血的SSG，天真的以为Vitepress和Hexo/Hugo无差不过是用Vue写的不同实现方式而已。


### 渲染概念


这些大部分都是在讲怎么渲染，渲染的形式如何。直接先列出目前我找到的所有的渲染概念吧：


1️⃣ CSR（Client Side Rendering，客户端渲染）


2️⃣ SSR（Server Side Rendering，服务端渲染）


3️⃣ SSG（Static Site Generation，静态生成)


4️⃣ SPA（Single Page Application，单页应用）


5️⃣ MPA（Multi Page Application，多页应用）


6️⃣ ISR（Incremental Static Regeneration,增量静态生成）


## 1️⃣ CSR（Client Side Rendering，客户端渲染）


ref:[https://prismic.io/blog/client-side-rendering](https://prismic.io/blog/client-side-rendering)


介绍：客户端渲染（简称 CSR）是一种使用 **JavaScript** 在浏览器中**渲染**网站或应用的方法。


特点是：网页主要内容**由JS主导DOM进行渲染**。


流程：请求网页⇒返回最小HTML（大部分只有必要的头+css+js文件信息）⇒解析HTML⇒**下载CSS/JS文件(重要:实际上页面完全由JS文件渲染接管)⇒JS执行并渲染交互**⇒展示网页


好处：服务器负载低只需要发文件和HTML即可，不像服务端渲染需要执行脚本渲染HTML后发送


劣势：加载时间长等本地执行完，SEO差


和SPA的关系：由于JS接管页面天然适合SPA


## 2️⃣ SSR（Server Side Rendering，服务端渲染）


特点：服务器把 HTML 拼好再返回给浏览器 含有需要的真正网页主要内容


古早SSR&现代SSR:  JSP、ASP、PHP、本质上都是 SSR，但是现在当我们谈论SSR已经是前端主导的SSR。


流程：请求网页⇒服务器拼接网页内容（+获取数据）⇒发送网页⇒展示网页⇒激活Javascript


优点：不被JS的加载速度拖累，SEO好，可以隐藏一些交互细节比如数据获取的路径


劣势：服务器得用自己的算力去渲染拼接HTML，而不是一个分发文件的机器


### Hydration（激活 / 水合）


一直不明白水合的作用是什么，也没听人说过古早SSR,JSP这些要做水合，**直接返回一个带JS的HTML**不就可以了嘛。很少有文章感觉能讲明白为什么需要水合。


**为什么 JSP 不需要水合？**


因为 JSP 的模式通常是：

- 服务器模板渲染 HTML（JSP）
- 浏览器里加一些 **零散的原生 JS/jQuery** 做交互
    - 点按钮 -> `onclick` 发请求
    - 成功 -> 手动改一点 DOM 或刷新页面

这里没有“框架要接管整棵组件树”的需求。


所以不存在“让 React/Vue 认识这段 DOM”的问题——**自然也就不需要水合。**


**GPT说：页面要交给框架长期管理，所以框架得先“认领”这份 HTML。认领动作=水合。**


### 水合原理


在复用 SSR 生成的 DOM 的前提下，重新执行组件逻辑，并为现有 DOM 绑定事件、状态和响应式能力的过程


1️⃣ 服务端渲染阶段（SSR）


产物：

- HTML（DOM 骨架）
- state snapshot（客户端用）

2️⃣ 浏览器展示 HTML


3️⃣ 客户端启动 hydration


4️⃣ DOM 对齐与认领（核心）

- 再执行一遍组件逻辑，生成 **虚拟结构**
- **逐节点遍历已有 DOM**
- 校验：
    - 节点类型
    - 顺序
    - 文本 / 属性

5️⃣ 补齐运行时能力


在 DOM 结构一致的前提下：

- 绑定事件监听
- 建立组件实例
- 恢复状态 / 响应式
- 建立 vnode → DOM 的映射

## 3️⃣ SSG（Static Site Generation，静态生成)


SSG 是在构建阶段就执行组件渲染，生成完整 HTML 文件


但是VitePress和一些框架级别的SSG生成框架又不是那种纯血的SSG，纯血的SSG类似Hexo,Hugo这种。比如以下问题就很容易让人感到困惑：


ref:[https://deepwiki.com/vuejs/vitepress/3.1-client-side-router](https://deepwiki.com/vuejs/vitepress/3.1-client-side-router) 从这里深入了解


**VitePress,HTML 生成方式是 SSG，为什么运行时行为却像 CSR / SPA？**


VitePress 是「SSG + 客户端 SPA 路由」架构


VitePress 内部：

- 启动一个 **Vue SPA 应用**
- 对当前页面进行 **hydration**
- 接管 DOM

**为啥运行时候不是切换html类似MPA而是用分块js?**


```html
dist/
├─ index.html
├─ guide/index.html
├─ config/index.html
├─ assets/
│  ├─ app.[hash].js        ← SPA 壳
│  ├─ theme.[hash].js      ← 主题逻辑
│  ├─ guide.[hash].js      ← 页面 chunk
│  ├─ config.[hash].js     ← 页面 chunk
│  └─ style.[hash].css
```


Vitepress的示例产出

- **每个路由一个 HTML**
- **一个长期常驻的 SPA 壳 JS**
- **每个页面一个 JS chunk**

特点**：内部跳转导航到目的地就不会读取目的地html，是壳子+目的地的块js。只有真的输入链接才回去请求那个目的地html。表现方式体现为可以在vitepress的页面导航到其他页面发现只会请求hash.js而不是请求HTML。**


好处：不用重复下载壳子(类似一个网页的layout代码）


**为啥Vitepress不选择传统的纯血SSG?**


[https://vitepress.dev/zh/guide/what-is-vitepress](https://vitepress.dev/zh/guide/what-is-vitepress)


这里有介绍。

