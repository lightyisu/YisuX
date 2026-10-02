const { createHash, timingSafeEqual } = require("node:crypto");

const REPO = "lightyisu/YisuX";

module.exports = async function update(req, res) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Content-Type-Options", "nosniff");

  const reply = (status, message) => {
    res.statusCode = status;
    res.end(message);
  };

  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return reply(405, "请打开更新链接，或使用 POST 请求。");
  }

  const key = process.env.BLOG_UPDATE_KEY;
  const token = process.env.BLOG_GITHUB_TOKEN;
  if (!key || !token) {
    return reply(503, "更新接口尚未配置完成。");
  }

  const keys = new URL(req.url, "https://yisux.com").searchParams.getAll("key");
  const digest = (value) => createHash("sha256").update(value).digest();
  if (keys.length !== 1 || !timingSafeEqual(digest(keys[0]), digest(key))) {
    return reply(401, "更新密钥不正确。");
  }

  // 标准预取请求不应触发更新。
  if (/prefetch/i.test(`${req.headers["sec-purpose"] || ""} ${req.headers.purpose || ""}`)) {
    return reply(204, "");
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}/dispatches`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2026-03-10",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event_type: "deploy" }),
      signal: AbortSignal.timeout(10_000),
    });

    if (response.status !== 204) {
      return reply(502, `GitHub 未接受更新请求（HTTP ${response.status}），请检查服务端 Token 的权限和有效期。`);
    }
    return reply(202, `已提交博客更新请求。\n查看进度：https://github.com/${REPO}/actions`);
  } catch {
    return reply(502, "暂时无法连接 GitHub，请稍后重试。");
  }
};
