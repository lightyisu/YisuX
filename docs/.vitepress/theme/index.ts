// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Timeline from "./components/Timeline.vue";
import MyLayout from './components/MyHome.vue';
import Nav2web from './components/Nav2web.vue';
export default {
  extends: DefaultTheme,

  enhanceApp({ app, router, siteData }) {
    app.component("Timeline", Timeline);
    app.component('Nav2web',Nav2web)
    
    console.log(siteData)
  }
} satisfies Theme
