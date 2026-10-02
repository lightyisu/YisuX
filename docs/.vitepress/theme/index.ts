// https://vitepress.dev/guide/custom-theme

import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import "./styles/link-card.css";

import Nav2web from "./components/Nav2web.vue";
import PostPage from "./Layouts/PostPage.vue";
import { NCard, NSkeleton } from "naive-ui";

export default {
  extends: DefaultTheme,
  Layout: PostPage,
  enhanceApp({ app }) {
    app.component("Nav2web", Nav2web);

    app.component("NCard", NCard);
    app.component("NSkeleton", NSkeleton);
  },
} satisfies Theme;
