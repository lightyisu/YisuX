// 触发 GitHub Actions 重新拉取 Notion 文章并部署。
// 用法：GITHUB_TOKEN=ghp_xxx npm run deploy
//
// 原理：调用 GitHub 的 repository_dispatch API，event_type 为 deploy，
// 与 .github/workflows/main.yaml 里配置的触发类型一一对应。
// 工作流会依次执行：elog sync 拉文章 → 提交 → 推送 → 构建，
// 推送到 main 后 Vercel 的 Git 集成会自动跟着部署。

const REPO = "lightyisu/YisuX";

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error(
    [
      "缺少 GITHUB_TOKEN。",
      "",
      "请 classic token（勾选 repo 权限）或 fine-grained token（Contents 写权限），然后：",
      "  GITHUB_TOKEN=ghp_xxx npm run deploy",
      "",
      "也可以直接在 GitHub 网页触发：",
      "  仓库 → Actions → Deplo To Github Pages → Run workflow",
    ].join("\n"),
  );
  process.exit(1);
}

const res = await fetch(
  `https://api.github.com/repos/${REPO}/dispatches`,
  {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event_type: "deploy" }),
  },
);

if (res.status === 204) {
  console.log("已触发部署，工作流开始拉取 Notion 文章。");
  console.log(`查看进度：https://github.com/${REPO}/actions`);
} else {
  const body = await res.text();
  console.error(`触发失败：HTTP ${res.status}\n${body}`);
  process.exit(1);
}
