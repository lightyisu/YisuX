<p align="center"> 
  <picture>
    <img alt="LOGO" src="https://www.yisux.com/logo.png" width="352"  style="max-width: 100%;">
  </picture>
  <br/>
  <br/>
</p> 
<p align="center">
    <i>The official Blog Site for lightyisu NOW.</i>
</p>

![Static Badge](https://img.shields.io/badge/vitepress-elog-blue?style=flat)
![Static Badge](https://img.shields.io/badge/From-2024-blue?style=flat)
![Static Badge](https://img.shields.io/badge/VercelEnhanced-black?style=flat)


### 更新文章并部署

在 Notion 写好后，有两种方式触发更新：

**一、本地同步（推荐）**

```bash
npm run sync          # elog 从 Notion 拉取文章到 docs/
git add . && git commit -m "更新文档" && git push
```

推送到 main 后，GitHub Actions 会自动跑一遍，同时 Vercel 的 Git 集成会自动部署。

**二、远程触发 API**

不推代码，直接让 GitHub Actions 去拉文章并部署。需要先在
[GitHub Settings → Developer settings → Tokens](https://github.com/settings/tokens)
申请一个 token（classic 勾 `repo`，或 fine-grained 给 `Contents` 写权限）：

```bash
GITHUB_TOKEN=ghp_xxx npm run deploy
```

等价于手动调用 repository_dispatch API：

```bash
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <GITHUB_TOKEN>" \
  https://api.github.com/repos/lightyisu/YisuX/dispatches \
  -d '{"event_type":"deploy"}'
```

也可以直接在网页触发：仓库 → Actions → Deplo To Github Pages → Run workflow。

> Vercel 那边另有一个 [Deploy Hook](https://vercel.com/docs/deploy-hooks)（Settings → Git → Deploy Hooks），
> POST 它只会用**当前 main 的代码**重新构建，不会去 Notion 拉新文章，所以更新文章要用上面的方式。

---

# YisuX Blog from 2024

### 介绍 Intro
在2024年构建的基于 VitePress + [Elog](https://elog.1874.cool/) 的新一代个人博客



### 线上地址
目前存放在 Vercel上进行持续部署 

![](https://vercel.com/vc-ap-vercel-marketing/_next/static/media/vercel-logotype-light.700a8d26.svg)

![](https://vitepress.dev/vitepress-logo-mini.svg)  **VitePress**

### 更新日志
2024.12.27 修改主页banner图 增设Photo板块 升级VitePress到当前最新版本 v1.5.0 
目前问题 首页好玩周刊无法点击 没有找到index.md动态引入链接的方法 Photos页准备整理一些现实与游戏摄影

----

2025.3.15 更改新标识为YisuX 域名从yisupower.com变更为yisux.com

----


2025.5.3 预计6月底前重构博客模块和内容

----

2025.5.4 版面优化 去除好玩周刊板块 只保留博客和日常板块
