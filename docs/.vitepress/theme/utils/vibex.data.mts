import { readFileSync } from "node:fs";
import { basename } from "node:path";

// VibeX：docs/public/vibex/ 下的每个 HTML 就是一件作品，放进去即自动上架；
// 封面从 docs/public/vibex-covers/ 图库里按文件名哈希挑一张，同一作品每次构建都是同一张
export interface VibeWork {
  title: string;
  href: string;
  file: string;
  cover: string;
}

declare const data: VibeWork[];
export { data };

const decode = (s: string) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

// FNV-1a：把文件名稳定地映射到图库下标
function hash(s: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 0x01000193);
  return h >>> 0;
}

export default {
  watch: ["../../../public/vibex/*.html", "../../../public/vibex-covers/*.{jpg,jpeg,png,webp}"],
  load(files: string[]): VibeWork[] {
    const covers = files
      .filter((f) => f.includes("/vibex-covers/"))
      .map((f) => `/vibex-covers/${basename(f)}`)
      .sort();

    return files
      .filter((f) => f.endsWith(".html"))
      .map((path) => {
        const file = basename(path);
        const title = readFileSync(path, "utf-8").match(/<title>([\s\S]*?)<\/title>/i)?.[1];
        return {
          title: decode(title ?? "") || file,
          href: `/vibex/${file}`,
          file,
          cover: covers.length ? covers[hash(file) % covers.length] : "",
        };
      })
      .sort((a, b) => a.file.localeCompare(b.file));
  },
};
