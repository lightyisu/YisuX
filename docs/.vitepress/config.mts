import { defineConfig } from "vitepress";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { linkCard } from "./markdown/link-card";
import { keywordIcon, readKeywordIcons } from "./markdown/keyword-icon";

function linkMeta() {
  try {
    const file = fileURLToPath(new URL("./data/link-meta.json", import.meta.url));
    return JSON.parse(readFileSync(file, "utf-8"));
  } catch {
    return {};
  }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "YisuX-lightyisu的个人博客",
  description: "blog",

  // Icons 页只供开发时查看图标库，生产构建不生成
  srcExclude: process.env.NODE_ENV === "production" ? ["icons.md"] : [],

  vite: {
    ssr: {
      noExternal: ["naive-ui"],
    },
    resolve: {
      alias: [],
    },
  },

  themeConfig: {
    nav: [],
    sidebar: {},
    siteTitle: false,
    socialLinks: [
      { icon: "github", link: "https://github.com/lightyisu/yisupower" },
    ],
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
    codeTransformers: [],
    config(md) {
      linkCard(md, linkMeta());
      keywordIcon(md, readKeywordIcons());
    },
  },
});
