import { setup } from '@css-render/vue3-ssr'
import { NConfigProvider } from 'naive-ui'
import { useRoute } from 'vitepress'

import { defineComponent, h, inject } from 'vue'


// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Timeline from "./components/Timeline.vue";
import MyLayout from './components/MyHome.vue';
import Nav2web from './components/Nav2web.vue';
import { NCard, NSkeleton } from 'naive-ui'


export default {
  extends: DefaultTheme,

  enhanceApp({ app, router, siteData }) {
    app.component("Timeline", Timeline);
    app.component('Nav2web',Nav2web);
      app.component('NCard', NCard);
    app.component('NSkeleton', NSkeleton);
    console.log(siteData)
  }
} satisfies Theme
