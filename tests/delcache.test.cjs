const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { cleanDocuments } = require("../delcache.js");

const pageId = "3aae9dc9-c245-8098-8ce0-d94ee75db164";
const article = `---\nurlname: ${pageId}\ntitle: 测试文章\n---\n正文`;

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "yisux-clean-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (file, body) => {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, body);
  };
  write("elog.cache.json", JSON.stringify({ docs: [{ properties: { urlname: pageId } }] }));
  return { root, write, exists: (file) => fs.existsSync(path.join(root, file)) };
}

test("清理根目录改名残留及新分类的文章，保留手写页面和资源", (t) => {
  const { root, write, exists } = fixture(t);
  const synced = ["docs/旧标题.md", "docs/新标题.md", "docs/2027/文章.md", "docs/新分类/文章.md"];
  const preserved = ["docs/index.md", "docs/page.md", "docs/新分类/手写文章.md", "docs/.vitepress/内部.md", "docs/public/资源.md"];
  for (const file of synced) write(file, article);
  for (const file of preserved) write(file, file.includes(".vitepress") || file.includes("public") ? article : "---\ntitle: 手写页\n---\n正文");
  assert.equal(cleanDocuments(root).length, synced.length);
  for (const file of synced) assert.equal(exists(file), false);
  for (const file of preserved) assert.equal(exists(file), true);
  assert.equal(exists("elog.cache.json"), false);
  assert.deepEqual(cleanDocuments(root), []);
});

test("dry-run 保留文章和缓存，缓存中的自定义 urlname 也能识别", (t) => {
  const { root, write, exists } = fixture(t);
  write("elog.cache.json", JSON.stringify({ docs: [{ properties: { urlname: "custom-slug" } }] }));
  write("docs/文章.md", "---\nurlname: custom-slug\n---\n正文");
  assert.equal(cleanDocuments(root, { dryRun: true }).length, 1);
  assert.equal(exists("docs/文章.md"), true);
  assert.equal(exists("elog.cache.json"), true);
  cleanDocuments(root);
  assert.equal(exists("docs/文章.md"), false);
});

test("缓存丢失时依然能清理 Notion 文章，且不跟随符号链接", (t) => {
  const { root, write, exists } = fixture(t);
  fs.unlinkSync(path.join(root, "elog.cache.json"));
  write("docs/文章.md", article);
  write("outside/文章.md", article);
  fs.symlinkSync(path.join(root, "outside"), path.join(root, "docs/外部目录"));
  assert.equal(cleanDocuments(root).length, 1);
  assert.equal(exists("outside/文章.md"), true);
});

test("Markdown 解析失败时保留全部文章及缓存", (t) => {
  const { root, write, exists } = fixture(t);
  write("docs/a.md", article);
  write("docs/z.md", "---\ntitle: [\n---\n正文");
  assert.throws(() => cleanDocuments(root));
  assert.equal(exists("docs/a.md"), true);
  assert.equal(exists("elog.cache.json"), true);
});
