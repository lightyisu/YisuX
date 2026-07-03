<template>
  <div class="home-container">
    <div class="home-header">
      <div class="title-row">
        <svg
          class="wheel-icon"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="3" />
          <circle cx="24" cy="24" r="14" stroke="currentColor" stroke-width="2" opacity="0.5" />
          <circle cx="24" cy="24" r="4" fill="currentColor" />
          <path
            d="M24 10v28M10 24h28M14.1 14.1l19.8 19.8M33.9 14.1 14.1 33.9"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            opacity="0.45"
          />
        </svg>
        <h1>Blog on MCL39</h1>
      </div>
      <p class="tagline">Every Story Needs a BLog !</p>
    </div>

    <div class="category-tabs">
      <div class="category-track">
        <div class="category-slider" :class="activeCategory" />
        <button
          type="button"
          class="category-btn"
          :class="{ active: activeCategory === 'jishu' }"
          @click="activeCategory = 'jishu'"
        >
          技术
        </button>
        <button
          type="button"
          class="category-btn"
          :class="{ active: activeCategory === 'richang' }"
          @click="activeCategory = 'richang'"
        >
          日常
        </button>
        <button
          type="button"
          class="category-btn"
          :class="{ active: activeCategory === 'nav' }"
          @click="activeCategory = 'nav'"
        >
          导航
        </button>
      </div>
    </div>

    <Transition name="post-switch" mode="out-in">
      <ul v-if="activeCategory === 'nav'" key="nav" class="post-list">
        <li v-for="site in navSites" :key="site.url" class="post-item">
          <a
            :href="site.url"
            class="post-card nav-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img :src="site.logo" :alt="site.title" class="nav-logo" />
            <div class="nav-info">
              <p class="nav-title">{{ site.title }}</p>
              <p class="nav-desc">{{ site.desc }}</p>
              <p class="nav-url">{{ site.host }}</p>
            </div>
          </a>
        </li>
      </ul>
      <ul v-else :key="activeCategory" class="post-list">
        <li v-for="post in filteredPosts" :key="post.url" class="post-item">
          <a :href="post.url" class="post-card">
            <span class="post-watermark" aria-hidden="true">{{
              titleWatermark(post.title)
            }}</span>
            <p class="post-title">{{ post.title }}</p>
            <div v-if="post.images.length" class="post-thumbs">
              <img
                v-for="(img, index) in post.images.slice(0, 3)"
                :key="index"
                :src="img"
                :alt="post.title"
                class="thumb-image"
                loading="lazy"
              />
            </div>
            <time class="post-date">{{ formatDate(post.date) }}</time>
          </a>
        </li>
        <li v-if="filteredPosts.length === 0" class="post-empty">暂无文章</li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  data as posts,
  type PostCategory,
} from "../utils/posts.data.mts";

type HomeCategory = PostCategory | "nav";

const activeCategory = ref<HomeCategory>("jishu");

const navSites = [
  {
    title: "Dribbble",
    url: "https://dribbble.com/",
    host: "dribbble.com",
    logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/dribbble.svg",
    desc: "全球设计师作品与灵感社区",
  },
  {
    title: "Open Design",
    url: "https://open-design.ai/zh/",
    host: "open-design.ai",
    logo: "https://open-design.ai/apple-touch-icon.png",
    desc: "AI 设计工作台，Claude Design 开源替代",
  },
  {
    title: "Zeabur",
    url: "https://zeabur.com/zh-CN/",
    host: "zeabur.com",
    logo: "https://zeabur.com/logo.svg",
    desc: "AI DevOps 工程师，一键部署与运维",
  },
  {
    title: "Meshy",
    url: "https://www.meshy.ai/zh/?noRedirect=true",
    host: "meshy.ai",
    logo: "https://www.meshy.ai/favicon.ico",
    desc: "AI 3D 模型与纹理生成平台",
  },
];

const filteredPosts = computed(() =>
  posts.filter((post) => post.category === activeCategory.value)
);

function formatDate(date: string) {
  if (!date) return "";
  return date.slice(0, 10);
}

function titleWatermark(title: string) {
  return [...title].slice(0, 5).join("");
}
</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  min-height: 100%;
  padding: 28px 24px 48px;
}

.home-header {
  margin-bottom: 24px;
  padding: 0 8px;

  .title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }

  .wheel-icon {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    color: #111;
  }

  h1 {
    font-size: 40px;
    font-weight: 800;
    line-height: 1.15;
    margin: 0;
    color: #111;
    letter-spacing: -0.03em;
  }

  .tagline {
    margin: 6px 0 0;
    font-size: 16px;
    color: #888;
  }
}

.category-tabs {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
  padding: 0 8px;
}

.category-track {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid #e5e5e5;
  background: #fff;
}

.category-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% / 3);
  height: 100%;
  background: #111;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.richang {
    transform: translateX(100%);
  }

  &.nav {
    transform: translateX(200%);
  }
}

.category-btn {
  position: relative;
  z-index: 1;
  min-width: 80px;
  padding: 8px 24px;
  border: none;
  border-radius: 0;
  background: transparent;
  font-size: 14px;
  font-weight: 600;
  color: #888;
  cursor: pointer;
  transition: color 0.25s ease;
  font-family: inherit;

  &:hover {
    color: #333;
  }

  &.active {
    color: #fff;
  }
}

.post-switch-enter-active,
.post-switch-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.post-switch-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.post-switch-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.post-list {
  list-style: none;
  margin: 0;
  padding: 0;
  background: #fff;
}

.post-item {
  border-bottom: 1px solid #ededed;

  &:last-child {
    border-bottom: none;
  }
}

.post-card {
  position: relative;
  display: block;
  padding: 20px 24px;
  text-decoration: none;
  color: inherit;
  background: #fff;
  overflow: hidden;
  transition: background 0.15s ease;

  &:hover {
    background: #fafafa;

    .post-watermark {
      opacity: 0.12;
      transform: translate(4px, 4px) rotate(-6deg) scale(1.04);
    }
  }

  &:active {
    background: #f3f3f3;
  }
}

.post-watermark {
  position: absolute;
  right: -6px;
  bottom: -20px;
  font-size: 88px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--naver-green);
  opacity: 0.08;
  transform: rotate(-8deg);
  pointer-events: none;
  user-select: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  white-space: nowrap;
  z-index: 0;
}

.post-title {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.7;
  color: #191919;
  word-break: break-word;
}

.post-thumbs {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.thumb-image {
  width: 96px;
  height: 96px;
  flex-shrink: 0;
  object-fit: cover;
  display: block;
  background: #f2f2f2;
}

.post-date {
  position: relative;
  z-index: 1;
  display: block;
  margin-top: 14px;
  font-size: 13px;
  color: #b2b2b2;
}

.post-empty {
  padding: 40px 16px;
  text-align: center;
  color: #b2b2b2;
  font-size: 14px;
}

.nav-card {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-logo {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  object-fit: contain;
  background: #f2f2f2;
  padding: 8px;
}

.nav-info {
  position: relative;
  z-index: 1;
  min-width: 0;
}

.nav-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.4;
  color: #191919;
}

.nav-desc {
  margin: 6px 0 0;
  font-size: 14px;
  line-height: 1.5;
  color: #666;
}

.nav-url {
  margin: 6px 0 0;
  font-size: 13px;
  color: #b2b2b2;
}

@media (max-width: 640px) {
  .home-header {
    .wheel-icon {
      width: 30px;
      height: 30px;
    }

    h1 {
      font-size: 28px;
    }
  }

  .thumb-image {
    width: 80px;
    height: 80px;
  }

  .post-card {
    padding: 18px 20px;
  }

  .post-title {
    font-size: 16px;
  }

  .post-watermark {
    font-size: 64px;
    bottom: -14px;
  }
}
</style>
