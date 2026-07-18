<template>
  <div class="home-container">
    <div class="home-header">
      <h1>Blog on MCL39</h1>
      <p class="tagline">Every Story Needs a BLog !</p>
    </div>

    <div class="category-tabs">
      <button
        type="button"
        class="category-link"
        :class="{ active: activeCategory === 'jishu' }"
        @click="setCategory('jishu')"
      >
        技术
      </button>
      <span class="tab-sep">|</span>
      <button
        type="button"
        class="category-link"
        :class="{ active: activeCategory === 'richang' }"
        @click="setCategory('richang')"
      >
        日常
      </button>
      <span class="tab-sep">|</span>
      <button
        type="button"
        class="category-link"
        :class="{ active: activeCategory === 'nav' }"
        @click="setCategory('nav')"
      >
        导航
      </button>
    </div>

    <Transition name="post-switch" mode="out-in">
      <div v-if="activeCategory === 'nav'" key="nav" class="post-list">
        <div v-for="site in navSites" :key="site.url" class="post-entry nav-entry">
          <a
            :href="site.url"
            class="nav-row"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img :src="site.logo" :alt="site.title" class="nav-logo" />
            <span class="nav-body">
              <span class="post-title-link">{{ site.title }}</span>
              <span class="post-excerpt">{{ site.desc }}</span>
              <span class="post-meta">{{ site.host }}</span>
            </span>
          </a>
        </div>
      </div>
      <div v-else :key="activeCategory" class="post-list">
        <div v-for="post in filteredPosts" :key="post.url" class="post-entry">
          <a :href="post.url" class="post-title-link">{{ post.title }}</a>
          <p class="post-meta">
            posted @ {{ formatDate(post.date) }}
            <span class="meta-cat">{{
              activeCategory === "jishu" ? "技术" : "日常"
            }}</span>
          </p>
        </div>
        <p v-if="filteredPosts.length === 0" class="post-empty">暂无文章</p>
      </div>
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

const CATEGORY_KEY = "yisux-home-category";
const VALID_CATEGORIES: HomeCategory[] = ["jishu", "richang", "nav"];

function readStoredCategory(): HomeCategory {
  if (typeof sessionStorage === "undefined") return "jishu";
  const stored = sessionStorage.getItem(CATEGORY_KEY);
  if (stored && VALID_CATEGORIES.includes(stored as HomeCategory)) {
    return stored as HomeCategory;
  }
  return "jishu";
}

const activeCategory = ref<HomeCategory>(readStoredCategory());

function setCategory(category: HomeCategory) {
  activeCategory.value = category;
  sessionStorage.setItem(CATEGORY_KEY, category);
}

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
    logo: "https://zeabur.com/favicon.ico",
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
  if (!date) return "未记录";
  return date.slice(0, 10);
}
</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  min-height: 100%;
  padding: 36px 28px 64px;
  background: #fff;
}

.home-header {
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid #e8e8e8;

  h1 {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.3;
    margin: 0;
    color: #2b2b2b;
  }

  .tagline {
    margin: 8px 0 0;
    font-size: 13px;
    color: #999;
  }
}

.category-tabs {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  padding: 4px 0 12px;
  border-bottom: 1px dashed #ddd;
}

.category-link {
  border: none;
  background: transparent;
  padding: 0;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  font-family: inherit;
  line-height: 1.4;

  &:hover {
    color: #2e6da4;
    text-decoration: underline;
  }

  &.active {
    color: #2e6da4;
    font-weight: 700;
  }
}

.tab-sep {
  color: #ccc;
  font-size: 12px;
  user-select: none;
}

.post-switch-enter-active,
.post-switch-leave-active {
  transition: opacity 0.2s ease;
}

.post-switch-enter-from,
.post-switch-leave-to {
  opacity: 0;
}

.post-list {
  margin: 0;
  padding: 0;
}

.post-entry {
  padding: 18px 0 14px;
  border-bottom: 1px dashed #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
}

.post-title-link {
  display: inline;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
  color: #2e6da4;
  text-decoration: none;
  word-break: break-word;

  &:hover {
    color: #1a5278;
    text-decoration: underline;
  }

  &:visited {
    color: #5a7ea0;
  }
}

.post-excerpt {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.7;
  color: #666;
}

.post-meta {
  margin: 8px 0 0;
  font-size: 12px;
  color: #999;
  line-height: 1.5;
}

.meta-cat {
  margin-left: 10px;
  color: #bbb;
}

.meta-link {
  color: #999;
  text-decoration: none;

  &:hover {
    color: #2e6da4;
    text-decoration: underline;
  }
}

.post-empty {
  padding: 48px 0;
  text-align: center;
  color: #bbb;
  font-size: 14px;
}

.nav-entry {
  padding: 14px 0;
}

.nav-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-decoration: none;
  color: inherit;

  &:hover .post-title-link {
    color: #1a5278;
    text-decoration: underline;
  }
}

.nav-logo {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  margin-top: 2px;
  object-fit: contain;
  background: #f5f5f5;
}

.nav-body {
  display: flex;
  flex-direction: column;
  min-width: 0;

  .post-title-link {
    display: inline;
  }

  .post-excerpt,
  .post-meta {
    display: block;
  }
}

@media (max-width: 640px) {
  .home-container {
    padding: 24px 18px 48px;
  }

  .home-header h1 {
    font-size: 22px;
  }

  .post-title-link {
    font-size: 16px;
  }
}
</style>
