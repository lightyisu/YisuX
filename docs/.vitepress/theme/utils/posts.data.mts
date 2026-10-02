import { createContentLoader } from "vitepress";
import { readFileSync } from "node:fs";

export type PostCategory = "jishu" | "richang";

export interface Post {
  title: string;
  url: string;
  date: string;
  category: PostCategory;
  excerpt: string;
}

declare const data: Post[];
export { data };

const EXCLUDED_URLS = ["/介绍页", "/nav2web"];

function getCreatedTimes(): Map<string, string> {
  try {
    const cache = JSON.parse(readFileSync(
      new URL("../../../../elog.cache.json", import.meta.url), "utf8"
    ));
    return new Map((cache.catalog || []).map((page: {
      id: string;
      created_time: string;
      properties?: { urlname?: string };
    }) => [page.properties?.urlname || page.id, page.created_time]));
  } catch {
    return new Map();
  }
}

function getCategory(
  frontmatter: Record<string, unknown>,
  url: string
): PostCategory | null {
  if (EXCLUDED_URLS.some((path) => url.startsWith(path))) return null;

  const catalogRaw = frontmatter.catalog;
  const catalog = Array.isArray(catalogRaw)
    ? String(catalogRaw[0] ?? "")
    : String(catalogRaw ?? "");

  if (catalog === "jishu" || url.startsWith("/jishu/")) return "jishu";

  if (
    catalog === "timeline" ||
    /^\d{4}$/.test(catalog) ||
    /^\/20\d{2}\//.test(url) ||
    url.startsWith("/timeline/")
  ) {
    return "richang";
  }

  if (frontmatter.type === "Page") return "richang";

  if (frontmatter.title && frontmatter.type === "Post") return "richang";

  if (frontmatter.title && !catalog) return "richang";

  return null;
}

function isPublished(frontmatter: Record<string, unknown>): boolean {
  const status = frontmatter.status;
  if (!status) return true;
  return status === "已发布";
}

function extractExcerpt(
  src: string | undefined,
  title: string,
  limit = 140
): string {
  if (!src) return "";
  // 去掉 frontmatter
  const body = src.replace(/^---[\s\S]*?---\s*/, "");
  // 去掉图片、链接、代码块、标题标记等 markdown 语法
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[>*_`~|]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // 正文常以标题开头，剥离避免摘要重复标题
  let excerpt = text;
  if (title && excerpt.startsWith(title)) {
    excerpt = excerpt.slice(title.length).replace(/^[\s:：、,，.。-]+/, "");
  }
  if (!excerpt) return "";
  return excerpt.length > limit ? excerpt.slice(0, limit).trimEnd() + "…" : excerpt;
}

export default createContentLoader(["**/*.md", "../elog.cache.json"], {
  includeSrc: true,
  transform(raw): Post[] {
    const createdTimes = getCreatedTimes();
    return raw
      .filter(({ url }) => url !== "/")
      .filter(({ frontmatter }) => isPublished(frontmatter))
      .map(({ url, frontmatter, src }) => {
        const category = getCategory(frontmatter, url);
        if (!category) return null;

        const date =
          String(frontmatter.created || createdTimes.get(String(frontmatter.urlname || "")) || frontmatter.date || "");

        return {
          title: String(frontmatter.title || "无题"),
          url,
          date,
          category,
          excerpt: extractExcerpt(src, String(frontmatter.title || "")),
        };
      })
      .filter((post): post is Post => post !== null)
      .sort((a, b) =>
        (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0)
      );
  },
});
