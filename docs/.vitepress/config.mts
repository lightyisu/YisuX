import { defineConfig } from "vitepress";
import { set_sidebar } from "./set_sidebar.mjs";
// import {set_nav} from './set_nav.mjs'
import AutoImport from 'unplugin-auto-import/vite'
import { fileURLToPath, URL } from "node:url";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "YisuX-lightyisu的个人博客",
  description: "blog",
  vite: {
   ssr: {
      // 将 naive-ui 添加到 noExternal 列表
      noExternal: ['naive-ui']
    },
    resolve: {
      alias: [
        {
          find: /^.*\/VPHome\.vue$/,
          replacement: fileURLToPath(
            new URL("./theme/components/MyHome.vue", import.meta.url)
          ),
        },
      ],
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "技术", link: "/jishu/" },
      { text: "日常", link: "/介绍页" },
      { text: "导航", link: "/nav2web" },
    ],

    siteTitle: "YisuX",
    sidebar: {
      "/jishu/": set_sidebar("docs/2023", 1),
      "/": set_sidebar("docs/2023", 0),
      
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/lightyisu/yisupower" },
    ],
    footer: {
      message: "YisuX.com ",
      copyright: "Copyright © 2020-2025 lightyisu ",
    },
  },
  markdown: {
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
  },
});
