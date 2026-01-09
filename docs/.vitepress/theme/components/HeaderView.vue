<template>
  <Header>
    <div class="header-content">
      <div class="logo">
        <a href="/" class="logo-link">
          <img src="/logo.png" alt="logo" style="width: 95px" />
        </a>
        <span class="logo-text">YisuX -lightyisu的个人博客</span>
      </div>
      <div class="menu">
        <ul>
          <li><a href="/">首页</a></li>
          <li><a :href="latestPost?.url || '/jishu/'">技术</a></li>
          <li><a href="/介绍页.html">日常</a></li>
          <li><a href="/nav2web">导航</a></li>
        </ul>
      </div>
    </div>
  </Header>
</template>

<script setup lang="ts">
import { data as posts } from "../utils/posts.data.mts"; // 引入刚才写的 data 文件
import { computed } from "vue";
console.log(posts);
// 获取排序后的第一篇文章
const latestPost = computed(() => {
  // 先过滤出 url 以 '/jishu' 开头的文章
  const jishuPosts = posts.filter((post) => post.url.startsWith("/jishu"));

  // 如果有匹配的文章，返回第一篇（即最新的），否则返回 null
  return jishuPosts.length > 0 ? jishuPosts[0] : null;
});
</script>

<style scoped lang="scss">
.header-content {
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul,
  li {
    display: inline-block;
  }
  li {
    margin: 0 10px;
  }
  .menu {
    margin-right: 140px;
    font-size: 18px;
  }
}
.logo-text {
  text-indent: -999999px;
  position: absolute;
  min-width: 100px;
}
</style>
