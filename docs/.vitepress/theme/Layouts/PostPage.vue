<template>
  <div class="app-container">
    <CollectionPage v-if="frontmatter.layout === 'collection'" />

    <div v-else-if="frontmatter.layout === 'home'">
      <MyHome />
    </div>

    <!-- 文章页面 -->
    <div v-else class="app-content">
      <SiteNav />

      <article class="article">
        <!-- Hero：分类 · 日期 + 居中标题，无摘要无封面 -->
        <header class="article-hero">
          <p class="article-meta">
            <span class="article-category">{{ categoryLabel }}</span>
            <span v-if="pageDate" class="meta-dot">·</span>
            <time v-if="pageDate">{{ formatDateCN(pageDate) }}</time>
          </p>
          <h1 class="article-title">{{ page_titile }}</h1>
        </header>

        <!-- 正文：单栏居中 -->
        <div class="article-body">
          <div class="article-main">
            <Content class="post-content" />
          </div>
        </div>

        <!-- 上一篇 -->
        <nav v-if="prevPost" class="post-nav" aria-label="上一篇导航">
          <a :href="normalizeUrl(prevPost.url)" class="post-nav-item">
            <span class="post-nav-label">上一篇</span>
            <span class="post-nav-title">{{ prevPost.title }}</span>
          </a>
        </nav>
      </article>

      <SiteFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import MyHome from "../components/MyHome.vue";
import CollectionPage from "../components/CollectionPage.vue";
import SiteNav from "../components/SiteNav.vue";
import SiteFooter from "../components/SiteFooter.vue";
import { useData } from "vitepress";
import { data as posts, type Post } from "../utils/posts.data.mts";

const { page, frontmatter } = useData();

function normalizeUrl(url: string): string {
  let result = url;
  try {
    result = decodeURIComponent(result);
  } catch {
    /* keep original */
  }
  return result.replace(/\.html$/, "");
}

const page_titile = computed(() => page.value.title);

const pageDate = computed(() => currentPost.value?.date || String(page.value.frontmatter.created || page.value.frontmatter.date || ""));

const categoryLabel = computed(() =>
  page.value.frontmatter.catalog?.[0] === "jishu" ||
  page.value.relativePath.startsWith("jishu/")
    ? "技术"
    : "日常",
);

// posts.data 按日期倒序（最新在前），当前文章的上下篇即它在列表里的前后条目
const currentPost = computed<Post | null>(() => {
  const rel = page.value.relativePath.replace(/\.md$/, "");
  const target = normalizeUrl(`/${rel}`);
  return posts.find((p) => normalizeUrl(p.url) === target) ?? null;
});

const prevPost = computed<Post | null>(() => {
  const index = posts.findIndex((p) => p.url === currentPost.value?.url);
  return index > 0 ? posts[index - 1] : null;
});

function formatDateCN(date: string) {
  if (!date) return "";
  const d = new Date(date.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return date.slice(0, 10);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
</script>

<style lang="scss">
/* ---------- 正文排版（极简：白底 / 近黑字 / 细线） ---------- */
.post-content {
  font-family: Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 17px;
  line-height: 1.75;
  font-weight: 400;
  color: #050505;

  > p:first-child {
    margin-top: 0;
  }

  p {
    margin: 1.35em 0;
    color: inherit;
    line-height: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #050505;
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: 30px;
    margin: 2em 0 0.75em;
  }

  h2 {
    font-size: 25px;
    margin: 2.4em 0 0.9em;
  }

  h3 {
    font-size: 20px;
    margin: 2em 0 0.75em;
  }

  h4 {
    font-size: 17px;
    margin: 1.75em 0 0.6em;
  }

  ul,
  ol {
    margin: 1.35em 0;
    padding-left: 1.5em;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin: 0.4em 0;
    line-height: 1.75;
  }

  li > ul,
  li > ol {
    margin: 0.4em 0;
  }

  a {
    color: #050505;
    text-decoration: underline;
    text-decoration-color: #bdbdbd;
    text-underline-offset: 3px;
    transition: text-decoration-color 150ms ease;

    &:hover {
      text-decoration-color: #050505;
    }
  }

  strong {
    font-weight: 600;
    color: inherit;
  }

  blockquote {
    margin: 1.8em 0;
    padding: 2px 0 2px 22px;
    border-left: 2px solid #050505;
    background: transparent;
    color: #434343;

    p {
      margin: 0.6em 0;
    }

    p:first-child {
      margin-top: 0;
    }

    p:last-child {
      margin-bottom: 0;
    }
  }

  :not(pre) > code {
    padding: 0.18em 0.4em;
    border-radius: 6px;
    background: #f1f1f1;
    color: #050505;
    font-family: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas,
      monospace;
    font-size: 0.86em;
  }

  pre {
    margin: 1.6em 0;
    padding: 18px 20px;
    border-radius: 12px;
    background: #f6f6f6;
    overflow-x: auto;
    line-height: 1.6;
  }

  pre code {
    background: transparent;
    padding: 0;
    font-family: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas,
      monospace;
    font-size: 14px;
  }

  [class*="language-"] > pre {
    margin-top: 0;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 2em 0;
  }

  hr {
    margin: 3em 0;
    border: none;
    border-top: 1px solid #e8e8e8;
  }

  table {
    width: 100%;
    margin: 1.8em 0;
    border-collapse: collapse;
    font-size: 15px;

    th,
    td {
      padding: 10px 14px;
      border: 1px solid #e8e8e8;
      text-align: left;
    }

    th {
      background: #f6f6f6;
      font-weight: 600;
    }
  }

  .lang {
    display: none !important;
  }

  * {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  @media (max-width: 768px) {
    font-size: 16px;

    h1 {
      font-size: 25px;
    }

    h2 {
      font-size: 22px;
    }

    h3 {
      font-size: 19px;
    }

    pre {
      padding: 14px 16px;
      border-radius: 10px;
    }
  }
}
</style>

<style scoped lang="scss">
.app-container,
.app-content {
  --ink: #050505;
  --paper: #fff;
  --muted: #777777;

  background: var(--paper);
  font-family: Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
  -webkit-font-smoothing: antialiased;
}

.app-container {
  min-height: 100vh;
  color: var(--ink);
}

/* ---------- Hero：标题居中 ---------- */
.article {
  width: min(1120px, calc(100% - 64px));
  margin: 0 auto;
  color: var(--ink);
}

.article-hero {
  padding: 82px 0 0;
  text-align: center;
}

.article-meta {
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.3;
}

.article-title {
  max-width: 820px;
  margin: 0 auto;
  font-size: clamp(30px, 4.4vw, 46px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.04em;
}

/* ---------- 正文：单栏居中 ---------- */
.article-body {
  padding: 56px 0 0;
}

.article-main {
  width: min(760px, 100%);
  margin: 0 auto;
  min-width: 0;
}

/* ---------- 上一篇 ---------- */
.post-nav {
  width: min(760px, 100%);
  margin: 72px auto 0;
  display: flex;
}

.post-nav-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  color: inherit;
  text-decoration: none;
}

.post-nav-label {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.3;
}

.post-nav-title {
  color: var(--ink);
  font-size: clamp(17px, 2vw, 20px);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.035em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-nav-item:hover .post-nav-title {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

@media (max-width: 720px) {
  .article {
    width: calc(100% - 36px);
  }

  .article-hero {
    padding-top: 52px;
  }

  .article-body {
    padding-top: 40px;
  }

  .post-nav {
    margin-top: 52px;
  }
}
</style>
