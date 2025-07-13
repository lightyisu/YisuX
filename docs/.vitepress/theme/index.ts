// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Bgvideo from './components/Bgvideo.vue'
import Timeline from "./components/Timeline.vue";
export default {
  extends: DefaultTheme,
  Layout: Bgvideo,
  enhanceApp({ app, router, siteData }) {
    app.component("Timeline", Timeline);
    
    console.log(siteData)
  }
} satisfies Theme
