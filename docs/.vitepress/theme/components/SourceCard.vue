<template>
  <div class="source-card-container">
    <n-card
      title="Inspiration and Utils"
      style="height: 90%; border-radius: 10px"
      header-style="font-size: 30px;"
    >
      <div class="tools-box">
        <div class="tool-item" v-for="item in utils" :key="item.name">
          <img
            :src="item.icon"
            style="width: 40px; height: 40px; object-fit: contain"
          />
          <n-button size="small">
            <a :href="item.link" target="_blank">
              {{ item.name }}
            </a>
          </n-button>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NCard, NButton } from "naive-ui";
import { ref } from "vue";
const utils = ref([
  {
    name: "naive-ui",
    link: "https://www.naiveui.com/en-US/os-theme",
    icon: "https://www.naiveui.com/assets/naivelogo-BdDVTUmz.svg",
  },
  {
    name: "Vercel",
    link: "https://vercel.com/",
    icon: "https://vercel.com/favicon.ico",
  },
  {
    name: "TRAE AI Editor",
    link: "https://www.trae.cn/",
    icon: "https://lf-cdn.trae.com.cn/obj/trae-com-cn/trae_website_prod_cn/static/image/footer.6162c690.png",
  },
  {
    name: "Naver Design",
    link: "https://www.navercorp.com/company/brandGuide",
    icon: "https://ts1.tc.mm.bing.net/th/id/R-C.c0d68dc7f3c8a56ef69149abb993bcbf?rik=rZHP%2fwwIizBr0g&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fnaver-logo-png-naver-300.png&ehk=GAsZ%2bEmwsAfWq9%2bMXcVCXFkcZ%2bjOQWtG6BGpNINIIXs%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    name: "AM music API",
    link: "https://developer.apple.com/documentation/applemusicapi",
    icon: "/icons8-apple-music-48.png",
  },
  {
    name: "figma Design",
    link: "https://www.figma.com/",
    icon: "/figma-logo.svg",
  },
  {
    name: "Typography",
    link: "https://claude.com/product/overview",
    icon: "/claude-logo.svg",
  },
]);
</script>

<style scoped lang="scss">
.source-card-container {
  width: 100%;
  height: 100%;
  .tools-box {
    display: flex;

    align-items: center;
    gap: 40px;
  }
  .tool-item {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
  }
}
</style>
