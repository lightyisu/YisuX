<template>
  <div class="home">
    <SiteNav active="home" />

    <main class="home-main">
      <h1 class="page-title">博客</h1>

      <div class="filters" role="tablist" aria-label="文章分类">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          role="tab"
          class="filter"
          :class="{ active: activeCategory === tab.key }"
          :aria-selected="activeCategory === tab.key"
          @click="setCategory(tab.key)"
        >
          {{ tab.label }}
        </button>
        <span class="filters-count">{{ filteredCount }} 篇</span>
      </div>

      <Transition name="feed-switch" mode="out-in">
        <div v-if="filteredList.length" :key="activeCategory" class="idx-list">
          <a
            v-for="item in filteredList"
            :key="item.url"
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener noreferrer' : undefined"
            class="idx-row"
          >
            <div class="idx-meta">
              <span class="idx-cat">{{ item.category }}</span>
              <time class="idx-date">{{ item.date }}</time>
            </div>
            <div class="idx-body">
              <h2 class="idx-title">{{ item.title }}</h2>
              <p v-if="item.excerpt" class="idx-excerpt">{{ item.excerpt }}</p>
            </div>
          </a>
        </div>
        <p v-else :key="'empty'" class="idx-empty">该分类下暂无文章</p>
      </Transition>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import SiteNav from "./SiteNav.vue";
import SiteFooter from "./SiteFooter.vue";
import { data as posts, type PostCategory } from "../utils/posts.data.mts";

type HomeCategory = PostCategory | "nav" | "all";

interface IndexItem {
  url: string;
  href: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  external?: boolean;
}

const CATEGORY_KEY = "yisux-home-category";
const VALID_CATEGORIES: HomeCategory[] = ["all", "jishu", "richang", "nav"];

function readStoredCategory(): HomeCategory {
  if (typeof sessionStorage === "undefined") return "all";
  const stored = sessionStorage.getItem(CATEGORY_KEY);
  if (stored && VALID_CATEGORIES.includes(stored as HomeCategory)) {
    return stored as HomeCategory;
  }
  return "all";
}

const activeCategory = ref<HomeCategory>(readStoredCategory());

function setCategory(category: HomeCategory) {
  activeCategory.value = category;
  sessionStorage.setItem(CATEGORY_KEY, category);
}

const tabs: { key: HomeCategory; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "jishu", label: "技术" },
  { key: "richang", label: "日常" },
  { key: "nav", label: "导航" },
];

function categoryLabel(category: PostCategory) {
  return category === "jishu" ? "技术" : "日常";
}

// content loader 的 url 带 .html 后缀且中文被 percent-encode，输出干净语义化链接
function decodeUrl(url: string) {
  let result = url;
  try {
    result = decodeURIComponent(result);
  } catch {
    /* keep original */
  }
  return result.replace(/\.html$/, "");
}

function formatDateCN(date: string) {
  if (!date) return "";
  const d = new Date(date.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return date.slice(0, 10);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function toIndexItem(post: (typeof posts)[number]): IndexItem {
  return {
    url: post.url,
    href: decodeUrl(post.url),
    title: post.title,
    category: categoryLabel(post.category),
    date: formatDateCN(post.date),
    excerpt: post.excerpt.replace(/…$/, ""),
  };
}

const postItems = computed<IndexItem[]>(() => posts.map(toIndexItem));

const navSites: IndexItem[] = [
  {
    url: "https://code.claude.com/docs/zh-CN/overview",
    href: "https://code.claude.com/docs/zh-CN/overview",
    title: "Claude Code Docs",
    category: "收藏",
    date: "code.claude.com",
    excerpt: "Claude Code 指南与工具链",
    external: true,
  },
  {
    url: "https://dribbble.com/",
    href: "https://dribbble.com/",
    title: "Dribbble",
    category: "收藏",
    date: "dribbble.com",
    excerpt: "全球设计师作品与灵感社区",
    external: true,
  },
  {
    url: "https://open-design.ai/zh/",
    href: "https://open-design.ai/zh/",
    title: "Open Design",
    category: "收藏",
    date: "open-design.ai",
    excerpt: "AI 设计工作台",
    external: true,
  },
  {
    url: "https://zeabur.com/zh-CN/",
    href: "https://zeabur.com/zh-CN/",
    title: "Zeabur",
    category: "收藏",
    date: "zeabur.com",
    excerpt: "部署与运维平台",
    external: true,
  },
  {
    url: "https://www.meshy.ai/zh/?noRedirect=true",
    href: "https://www.meshy.ai/zh/?noRedirect=true",
    title: "Meshy",
    category: "收藏",
    date: "meshy.ai",
    excerpt: "AI 3D 模型与纹理生成平台",
    external: true,
  },
];

const filteredList = computed<IndexItem[]>(() => {
  if (activeCategory.value === "nav") return navSites;
  if (activeCategory.value === "all") return postItems.value;
  return postItems.value.filter(
    (item) => item.category === categoryLabel(activeCategory.value as PostCategory),
  );
});

const filteredCount = computed(() => filteredList.value.length);
</script>

<style scoped lang="scss">
.home {
  --ink: #050505;
  --paper: #fff;
  --line: #dedede;
  --muted: #777777;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: var(--ink);
  background: var(--paper);
  font-family: Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
  -webkit-font-smoothing: antialiased;
}

.home-main {
  flex: 1;
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;
  padding: 82px 0 120px;
}

.page-title {
  margin: 0 0 52px;
  font-size: clamp(26px, 2.5vw, 34px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.04em;
}

/* ---------- 分类筛选 ---------- */
.filters {
  display: flex;
  align-items: center;
  gap: 26px;
  margin-bottom: 34px;
}

.filter {
  padding: 0;
  border: 0;
  background: none;
  color: var(--muted);
  font-family: inherit;
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
  transition: color 150ms ease;

  &:hover {
    color: var(--ink);
  }

  &.active {
    color: var(--ink);
    font-weight: 600;
  }
}

.filters-count {
  margin-left: auto;
  color: var(--muted);
  font-size: 13px;
}

/* ---------- 切换动效 ---------- */
.feed-switch-enter-active,
.feed-switch-leave-active {
  transition: opacity 160ms ease;
}

.feed-switch-enter-from,
.feed-switch-leave-to {
  opacity: 0;
}

@media (max-width: 720px) {
  .home-main {
    width: calc(100% - 36px);
    padding: 58px 0 80px;
  }

  .page-title {
    margin-bottom: 34px;
    font-size: 28px;
  }

  .filters {
    gap: 20px;
    overflow-x: auto;
    margin-bottom: 26px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .filter,
  .feed-switch-enter-active,
  .feed-switch-leave-active {
    transition: none;
  }
}
</style>
