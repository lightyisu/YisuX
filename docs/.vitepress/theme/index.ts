// https://vitepress.dev/guide/custom-theme

import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import { h } from "vue";

import Nav2web from "./components/Nav2web.vue";
import PostPage from "./Layouts/PostPage.vue";
import { NCard, NSkeleton, NMenu } from "naive-ui";

export default {
  extends: DefaultTheme,
  Layout: PostPage,
  async enhanceApp({ app, router, siteData }) {
    app.component("Nav2web", Nav2web);

    app.component("NCard", NCard);
  },
} satisfies Theme;
