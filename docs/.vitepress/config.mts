import { defineConfig } from "vitepress";
import AutoImport from "unplugin-auto-import/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "YisuX-lightyisu的个人博客",
  description: "blog",

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
  },
});
