// .vitepress/theme/posts.data.ts
import { createContentLoader } from "vitepress";

export interface Post {
  title: string;
  url: string;
  date: string;
}

declare const data: Post[];
export { data };

export default createContentLoader("**/*.md", {
  // 扫描所有md文件
  transform(raw): Post[] {
    return raw
      .filter(({ url }) => url !== "/") // 排除首页
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title || "无题",
        url,
        date: frontmatter.updated || "", // 建议在 md 的 frontmatter 里写 date: 2026-01-02
      }))
      .sort((a, b) => b.date.localeCompare(a.date)); // 按日期倒序排
  },
});
