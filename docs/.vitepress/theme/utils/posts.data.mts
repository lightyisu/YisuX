import { createContentLoader } from "vitepress";

export type PostCategory = "jishu" | "richang";

export interface Post {
  title: string;
  url: string;
  date: string;
  category: PostCategory;
  images: string[];
  excerpt: string;
}

declare const data: Post[];
export { data };

const EXCLUDED_URLS = ["/介绍页", "/nav2web"];

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

function extractImages(src: string | undefined, limit = 3): string[] {
  if (!src) return [];

  const images: string[] = [];
  const seen = new Set<string>();
  const patterns = [
    /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
    /<img[^>]+src=["']([^"']+)["']/gi,
  ];

  for (const pattern of patterns) {
    for (const match of src.matchAll(pattern)) {
      const url = match[1]?.trim();
      if (!url || seen.has(url)) continue;
      seen.add(url);
      images.push(url);
      if (images.length >= limit) return images;
    }
  }

  return images;
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

export default createContentLoader("**/*.md", {
  includeSrc: true,
  transform(raw): Post[] {
    return raw
      .filter(({ url }) => url !== "/")
      .filter(({ frontmatter }) => isPublished(frontmatter))
      .map(({ url, frontmatter, src }) => {
        const category = getCategory(frontmatter, url);
        if (!category) return null;

        const date =
          String(frontmatter.updated || frontmatter.date || "");

        return {
          title: String(frontmatter.title || "无题"),
          url,
          date,
          category,
          images: extractImages(src),
          excerpt: extractExcerpt(src, String(frontmatter.title || "")),
        };
      })
      .filter((post): post is Post => post !== null)
      .sort((a, b) => b.date.localeCompare(a.date));
  },
});
