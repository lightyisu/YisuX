const fs = require("node:fs");
const path = require("node:path");
const matter = require("gray-matter");

// Elog 默认用 Notion 页面 ID 作为 urlname，文章改名后此 ID 保持不变。
const NOTION_ID = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;

function cleanDocuments(root = __dirname, { dryRun = false } = {}) {
  const docsDir = path.join(root, "docs");
  const cachePath = path.join(root, "elog.cache.json");
  const cache = fs.existsSync(cachePath)
    ? JSON.parse(fs.readFileSync(cachePath, "utf8"))
    : { docs: [] };
  const knownIds = new Set(
    cache.docs.map((doc) => doc.properties?.urlname).filter(Boolean)
  );
  const files = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      // 保留 VitePress 配置、构建缓存和静态资源，不跟随符号链接。
      if (entry.name.startsWith(".") || entry.name === "public") continue;
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(file);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const { data } = matter(fs.readFileSync(file, "utf8"));
        if (data.urlname && (NOTION_ID.test(data.urlname) || knownIds.has(data.urlname))) {
          files.push(file);
        }
      }
    }
  }

  // 先完成扫描，避免解析错误导致只清理了一部分文章。
  if (fs.existsSync(docsDir)) walk(docsDir);
  for (const file of files) {
    if (!dryRun) fs.unlinkSync(file);
    console.log(`${dryRun ? "待删除" : "已删除"} ${path.relative(root, file)}`);
  }
  // 清除缓存，让下一次同步重新拉取所有文章。
  if (!dryRun) fs.rmSync(cachePath, { force: true });
  console.log(`${dryRun ? "预计清理" : "清理完成"} ${files.length} 篇同步文章`);
  return files;
}

if (require.main === module) {
  cleanDocuments(__dirname, { dryRun: process.argv.includes("--dry-run") });
}

module.exports = { cleanDocuments };
