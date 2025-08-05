<template>
  <div class="wrapper">
    <n-card v-for="(item, index) in websites" :key="index" :title="item.title">
      地址: <a :href="item.link">{{ item.link }}</a>

      <div v-show="!loadingStates[item.img]" class="loading">
        <img :src="item.img" @load="onImageLoad(item.img)" width="100%" />
      </div>
      <n-skeleton v-if="loadingStates[item.img]" text :repeat="6" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let websites = ref([
  {
    title: "GSAP 动画库",
    img: "https://cdn.prod.website-files.com/62af20a9e7e7cf4979583268/66802fcd877a76c39d1d0f88_6553277ada073bf147891afb_thumbnail-gsap-animation%20.jpg",
    link: "https://gsap.com/",
  },
  {
    title: "Web.dev(谷歌官方前端教程)",
    img: "https://ts2.tc.mm.bing.net/th/id/OIP-C.VfyI0MgvT8o5dnd_Itv6gAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    link: "https://web.developers.google.cn/?hl=zh-cn",
  },
  {
    title: "tenten.co(台湾AI国际新闻)",
    img: "https://assets-global.website-files.com/63f335e472c955696d095507/63f335e472c95573d6095961_tenten-about_4.jpg",
    link: "https://tenten.co/learning/",
  },
  {
    title: "今日热榜(闲的时候看)",
    img: "https://uploads.luhu.co/site/145/da4e0fee4a58fe2fe79cbeabfce82980.png",
    link: "https://tophub.today/",
  },
]);

// 图片加载状态
const loadingStates = ref<Record<string, boolean>>({});
const errorStates = ref<Record<string, boolean>>({});

// 初始化所有图片为 loading 状态
websites.value.forEach((item) => {
  loadingStates.value[item.img] = true;
  errorStates.value[item.img] = false;
});

// 图片加载成功
const onImageLoad = (src: string) => {
  loadingStates.value[src] = false;
  errorStates.value[src] = false;
};
</script>

<style scoped lang="scss">
.n-card {
  max-width: 300px;

  margin: 10px;
  &:hover {
    background: rgb(248, 245, 245);
    cursor: pointer;
  }
  img {
    width: 100%;

    max-height: 200px;
  }
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
