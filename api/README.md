# 一键更新博客

此目录中的 `update.js` 是 Vercel Function。保持 Vercel 项目的 Root Directory 为仓库根目录，博客构建输出仍为 `docs/.vitepress/dist`。

在现有 Vercel 项目 **Settings → Environment Variables** 添加以下变量（Production 环境），然后重新部署：

| 变量 | 值 |
| --- | --- |
| `BLOG_GITHUB_TOKEN` | GitHub fine-grained token：仅授权 `lightyisu/YisuX`，Contents 为 Read and write |
| `BLOG_UPDATE_KEY` | 自己生成的一段随机更新密钥，如运行 `openssl rand -hex 24` |

GitHub Token 仅留在服务端，不写入仓库或更新链接。更新链接中的密钥用于允许触发这个仓库的 `deploy` 事件：

```text
https://www.yisux.com/api/update?key=你的更新密钥
```

这是部署、配置变量后的地址格式，不代表接口已经上线。可收藏为书签或填写到原先使用的浏览器插件。打开链接后返回「已提交博客更新请求」表示 GitHub 已接受请求，实际同步结果到 Actions 查看。

仅接受 GET/POST。标准预取请求和 HEAD 请求不会触发更新，响应禁止缓存。GitHub 工作流会串行运行，避免同时提交文章；尚未接入 Notion 自动监听或全局冷却计时。

本地测试（不会调用真实 GitHub）：

```bash
node --test tests/*.test.cjs
```
