const { test } = require("node:test");
const assert = require("node:assert/strict");
const update = require("../api/update.js");

function setup(t, fetchImpl = async () => ({ status: 204 })) {
  const original = {
    BLOG_UPDATE_KEY: process.env.BLOG_UPDATE_KEY,
    BLOG_GITHUB_TOKEN: process.env.BLOG_GITHUB_TOKEN,
  };
  process.env.BLOG_UPDATE_KEY = "test-update-key";
  process.env.BLOG_GITHUB_TOKEN = "test-server-token";
  t.after(() => {
    for (const [name, value] of Object.entries(original)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  });
  const remote = t.mock.method(globalThis, "fetch", fetchImpl);
  const res = {
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    end(body) { this.body = body; },
  };
  return { remote, res };
}

const request = (url = "/api/update?key=test-update-key", method = "GET", headers = {}) => ({ url, method, headers });

test("打开带密钥的 URL，只触发固定仓库 deploy 事件，Token 来自服务端", async (t) => {
  const { remote, res } = setup(t);
  await update(request("/api/update?key=test-update-key&repo=other&event_type=other&token=url-token"), res);
  assert.equal(res.statusCode, 202);
  assert.match(res.body, /已提交博客更新请求/);
  assert.equal(res.headers["Cache-Control"], "no-store");
  assert.equal(res.headers["Referrer-Policy"], "no-referrer");
  assert.equal(remote.mock.callCount(), 1);
  const [url, options] = remote.mock.calls[0].arguments;
  assert.equal(url, "https://api.github.com/repos/lightyisu/YisuX/dispatches");
  assert.equal(options.method, "POST");
  assert.equal(options.headers.Authorization, "Bearer test-server-token");
  assert.deepEqual(JSON.parse(options.body), { event_type: "deploy" });
  assert.doesNotMatch(res.body, /test-server-token|test-update-key/);
});

test("缺失、错误、重复密钥均不发送请求", async (t) => {
  const { remote, res } = setup(t);
  for (const url of ["/api/update", "/api/update?key=wrong", "/api/update?key=test-update-key&key=wrong"]) {
    await update(request(url), res);
    assert.equal(res.statusCode, 401);
  }
  assert.equal(remote.mock.callCount(), 0);
});

test("服务端配置缺失时接口不触发 GitHub", async (t) => {
  const { remote, res } = setup(t);
  delete process.env.BLOG_UPDATE_KEY;
  await update(request(), res);
  assert.equal(res.statusCode, 503);
  process.env.BLOG_UPDATE_KEY = "test-update-key";
  delete process.env.BLOG_GITHUB_TOKEN;
  await update(request(), res);
  assert.equal(res.statusCode, 503);
  assert.equal(remote.mock.callCount(), 0);
});

test("HEAD 与标准预取不触发更新，POST 可以触发", async (t) => {
  const { remote, res } = setup(t);
  await update(request(undefined, "HEAD"), res);
  assert.equal(res.statusCode, 405);
  for (const headers of [{ "sec-purpose": "prefetch;prerender" }, { purpose: "prefetch" }]) {
    await update(request(undefined, "GET", headers), res);
    assert.equal(res.statusCode, 204);
  }
  assert.equal(remote.mock.callCount(), 0);
  await update(request(undefined, "POST"), res);
  assert.equal(res.statusCode, 202);
  assert.equal(remote.mock.callCount(), 1);
});

test("GitHub 拒绝请求时正确报告失败，且不输出服务端响应正文", async (t) => {
  const { res } = setup(t, async () => ({ status: 401, body: "sensitive upstream detail" }));
  await update(request(), res);
  assert.equal(res.statusCode, 502);
  assert.match(res.body, /HTTP 401/);
  assert.doesNotMatch(res.body, /sensitive|test-server-token/);
});

test("网络错误或超时时不报告成功", async (t) => {
  const { res } = setup(t, async () => { throw new Error("upstream details"); });
  await update(request(), res);
  assert.equal(res.statusCode, 502);
  assert.match(res.body, /请稍后重试/);
  assert.doesNotMatch(res.body, /upstream details/);
});
