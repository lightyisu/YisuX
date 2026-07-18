<template>
  <div class="app-container">
    <div v-if="frontmatter.layout === 'home'" class="app-content app-content--home">
      <MyHome />
    </div>

    <!--文章页面-->
    <div v-else class="article-page app-content">
      <article class="article-body">
        <a href="/" class="back-home">← 首页</a>
        <header class="article-header">
          <h1 class="article-title">{{ page_titile }}</h1>
          <p class="article-meta">
            posted @ {{ page_created_beauty }}
            <span class="meta-sep">·</span>
            更新于 {{ page_updated_beauty }}
          </p>
        </header>

        <div v-if="tocItems.length > 0" class="article-toc">
          <div class="toc-title">目录</div>
          <nav class="toc-list">
            <a
              v-for="item in tocItems"
              :key="item.id"
              :href="`#${item.id}`"
              :class="[
                'toc-item',
                `toc-level-${item.level}`,
                { active: activeId === item.id },
              ]"
              @click.prevent="scrollToHeading(item.id)"
            >
              {{ item.text }}
            </a>
          </nav>
        </div>

        <div class="article-content">
          <Content class="post-content" />
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import MyHome from "../components/MyHome.vue";
import { useData } from "vitepress";
import { useForJob } from "../composables/useForJob";
const { page, frontmatter } = useData();
import { onContentUpdated } from "vitepress";
const shouldHide = ref(false);
const page_titile = ref("");
const page_date = ref<{
  created_at: string;
  updated_at: string;
}>({
  created_at: "",
  updated_at: "",
});
const page_created_beauty = computed(() => {
  if (page_date.value.created_at === "") {
    return "未记录";
  }
  return page_date.value.created_at.slice(0, 10);
});
const page_updated_beauty = computed(() => {
  if (page_date.value.updated_at === "") {
    return "未记录";
  }
  return page_date.value.updated_at.slice(0, 10);
});

onContentUpdated(() => {
  page_date.value.created_at = page.value.frontmatter.date || "";
  page_date.value.updated_at = page.value.frontmatter.updated || "";
  tocItems.value = [];
  page_titile.value = page.value.title;
  extractToc();
  updateActiveId();
  useForJob(shouldHide);
});

onMounted(() => {
  page_date.value.created_at = page.value.frontmatter.date || "";
  page_date.value.updated_at = page.value.frontmatter.updated || "";
  page_titile.value = page.value.title;
  extractToc();
  useForJob(shouldHide);
});

// 目录相关
interface TocItem {
  id: string;
  text: string;
  level: number;
}

const tocItems = ref<TocItem[]>([]);
const activeId = ref<string>("");

// 提取h2标题生成目录
const extractToc = () => {
  const selectors = [
    ".post-content h2",
    ".post-content h3",
    ".content-wrapper h2",
    ".content-wrapper h3",
  ];

  let headers: NodeListOf<Element> | null = null;

  for (const selector of selectors) {
    const found = document.querySelectorAll(selector);
    if (found.length > 0) {
      headers = found;
      console.log(`Found ${found.length} headers with selector: ${selector}`);
      break;
    }
  }

  if (!headers || headers.length === 0) {
    console.warn("No h2/h3 headers found in the document");
    return;
  }

  const items: TocItem[] = [];

  headers.forEach((header, index) => {
    // 生成ID（如果没有）
    if (!header.id) {
      const text = header.textContent || "";
      header.id = `heading-${text.replace(/\s+/g, "-").toLowerCase()}-${index}`;
    }

    items.push({
      id: header.id,
      text: header.textContent || "",
      level: header.tagName === "H2" ? 2 : 3,
    });
  });

  tocItems.value = items;
  console.log("Generated TOC items:", items);
};

// 监听滚动，高亮当前标题
const updateActiveId = () => {
  const headers = document.querySelectorAll(
    ".post-content h2, .post-content h3",
  );
  const scrollY = window.scrollY;

  for (let i = headers.length - 1; i >= 0; i--) {
    const header = headers[i] as HTMLElement;
    if (header.offsetTop - 100 <= scrollY) {
      activeId.value = header.id;
      return;
    }
  }

  if (headers.length > 0) {
    activeId.value = (headers[0] as HTMLElement).id;
  }
};

onMounted(() => {
  // 增加延迟，确保Content组件已渲染
  setTimeout(() => {
    extractToc();
    updateActiveId();
    console.log("TOC Items:", tocItems.value); // 调试信息
  }, 300);

  window.addEventListener("scroll", updateActiveId);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateActiveId);
});

// 平滑滚动到标题
const scrollToHeading = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const top = element.offsetTop - 80;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
};
</script>

<style lang="scss">
.page-meta {
  margin: 20px 0;
  font-family: "claude_font", sans-serif;
  .big_title {
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: -0.028em;
    margin-bottom: 1em;
  }
  .time {
    display: inline-block;
    background: #faf9f5;
    padding: 4px;
    border: 1px solid rgb(230, 228, 228);
    border-radius: 4px;
    box-shadow: 0 4px 24px #0000000d;
  }
}

.post-content {
  /* Claude风格字体 - 使用更现代的字体栈 */
  font-family:
    "claude_font",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    "Noto Sans",
    "PingFang SC",
    "Hiragino Sans GB",
    "Microsoft YaHei",
    sans-serif;

  text-align: left; /* 两端对齐 */
  text-justify: inter-ideograph; /* 中文对齐优化 */
  /* 基础排版 - Claude风格更大的字号和行高 */
  font-size: 18px;
  line-height: 1.6;
  font-weight: 400;
  color: #2c2c2c;
  letter-spacing: 0.01em;
  min-width: 60%;
  max-width: 80%;
  /* 段落 - 去掉首行缩进，使用段落间距 */
  p {
    margin: 1.25em 0;
    text-indent: 0; /* Claude风格不使用首行缩进 */
    line-height: 1.6;
    color: #2c2c2c;
  }

  /* 首段无上边距 */
  > p:first-child {
    margin-top: 0;
  }

  /* 列表 - 更现代的间距 */
  ul,
  ol {
    margin: 1.25em 0;
    padding-left: 1.75em;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin: 0.375em 0;
    line-height: 2.2;
    color: #2c2c2c;
  }

  li p {
    margin: 0.5em 0;
  }

  /* 嵌套列表 */
  li > ul,
  li > ol {
    margin: 0.5em 0;
  }

  /* 标题 - Claude风格简洁明了 */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #191919;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.022em;
    margin-top: 2em;
    margin-bottom: 0.75em;
  }

  h1 {
    font-size: 2rem;
    margin-top: 0;
    margin-bottom: 1em;
    font-weight: 600;
    letter-spacing: -0.028em;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 2.5em;
    padding-top: 0.5em;
    border-top: 1px solid #e5e5e5;
  }

  h3 {
    font-size: 1.25rem;
    margin-top: 2em;
  }

  h4 {
    font-size: 1.125rem;
    margin-top: 1.75em;
  }

  h5 {
    font-size: 1rem;
    margin-top: 1.5em;
  }

  h6 {
    font-size: 0.95rem;
    color: #525252;
    margin-top: 1.5em;
  }
  /* 代码块 - Claude风格的代码展示 */
  code {
    font-family: "claude_font";
    font-size: 0.9em;
    font-weight: 400;
  }

  /* 行内代码 */
  :not(pre) > code {
    padding: 0.15em 0.4em;
    margin: 0;
    border-radius: 4px;
    background: #f4f4f4;
    color: #2c2c2c;
    border: 1px solid #e5e5e5;
  }

  /* 代码块 */
  pre {
    margin: 1.5em 0;
    padding: 1.25em;
    border-radius: 8px;
    background: #f8f8f8;
    border: 1px solid #e5e5e5;
    overflow-x: auto;
    line-height: 1.5;
  }

  pre code {
    background: transparent;
    color: #2c2c2c;
    padding: 0;
    margin: 0;
    border: none;
    font-size: 0.875em;
  }

  /* 引用 - Claude风格更简洁的引用 */
  blockquote {
    margin: 1.5em 0;
    padding: 0.75em 1.25em;
    border-left: 3px solid #d4d4d4;
    background: transparent;
    color: #525252;
    font-style: normal;
  }

  blockquote p {
    margin: 0.5em 0;
  }

  blockquote p:first-child {
    margin-top: 0;
  }

  blockquote p:last-child {
    margin-bottom: 0;
  }

  /* 链接 */
  a {
    color: #2e6da4;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* 表格 - 更现代的表格样式 */
  table {
    width: 100%;
    margin: 1.5em 0;
    border-collapse: collapse;
    font-size: 0.9375em;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    overflow: hidden;
  }

  th,
  td {
    padding: 0.75em 1em;
    border: 1px solid #e5e5e5;
    text-align: left;
  }

  th {
    background: #f8f8f8;
    font-weight: 600;
    color: #191919;
  }

  tr:hover {
    background: #fafafa;
  }

  /* 图片 */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.5em 0;
  }

  /* 分隔线 */
  hr {
    margin: 2.5em 0;
    border: none;
    border-top: 1px solid #e5e5e5;
  }

  /* 强调 */
  strong {
    font-weight: 600;
    color: #191919;
  }

  em {
    font-style: italic;
  }

  /* 删除线 */
  del {
    color: #737373;
    text-decoration: line-through;
  }

  /* 上标和下标 */
  sup,
  sub {
    font-size: 0.75em;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  /* 防止长单词撑破布局 */
  * {
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  .lang {
    display: none !important;
  }
  /* 移动端优化 */
  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.6;

    h1 {
      font-size: 1.75rem;
    }

    h2 {
      font-size: 1.375rem;
    }

    h3 {
      font-size: 1.125rem;
    }

    h4 {
      font-size: 1rem;
    }

    p {
      margin: 1em 0;
    }

    pre {
      padding: 1em;
      border-radius: 6px;
    }

    table {
      font-size: 0.875em;
    }
  }
}
</style>

<style scoped lang="scss">
// App 容器布局
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
}

// Header 固定高度
.app-header {
  flex-shrink: 0;
  background: #fff;
}

.app-content {
  flex: 1;
  overflow: auto;
  background: #fff;
}

.app-content--home {
  background: #fff;
}

.article-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 28px 20px 64px;
  min-height: 100vh;
  background: #fff;
}

.article-body {
  max-width: 780px;
  width: 100%;
}

.back-home {
  display: inline-block;
  margin-bottom: 18px;
  font-size: 13px;
  color: #999;
  text-decoration: none;

  &:hover {
    color: #2e6da4;
    text-decoration: underline;
  }
}

.article-header {
  padding-bottom: 16px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;

  .article-title {
    font-size: 26px;
    font-weight: 700;
    color: #2b2b2b;
    margin: 0 0 10px;
    line-height: 1.4;
  }

  .article-meta {
    margin: 0;
    font-size: 12px;
    color: #999;
    line-height: 1.6;
  }

  .meta-sep {
    margin: 0 6px;
    color: #ccc;
  }
}

.article-toc {
  margin-bottom: 28px;
  padding: 12px 16px;
  border: 1px dashed #ddd;
  background: #fafafa;

  .toc-title {
    font-size: 13px;
    font-weight: 700;
    color: #666;
    margin-bottom: 8px;
  }

  .toc-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .toc-item {
    font-size: 13px;
    line-height: 1.6;
    color: #555;
    text-decoration: none;
    padding: 2px 0 2px 8px;
    border-left: 2px solid transparent;
    display: block;

    &.toc-level-2 {
      font-weight: 500;
    }

    &.toc-level-3 {
      padding-left: 20px;
      font-size: 12px;
      color: #777;
    }

    &:hover {
      color: #2e6da4;
      text-decoration: underline;
    }

    &.active {
      color: #2e6da4;
      border-left-color: #2e6da4;
      font-weight: 600;
    }
  }
}

.article-content {
  :deep(.post-content) {
    font-size: 15px;
    line-height: 1.9;
    color: #333;
    max-width: 100%;

    p {
      margin: 1.1em 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 1.8em;
      margin-bottom: 0.7em;
      color: #2b2b2b;
      font-weight: 700;
    }

    h2 {
      font-size: 1.35em;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.35em;
    }

    h3 {
      font-size: 1.15em;
    }

    ul,
    ol {
      padding-left: 1.6em;
      margin: 1.1em 0;
    }

    li {
      margin: 0.35em 0;
      line-height: 1.8;
    }

    blockquote {
      margin: 1.4em 0;
      padding: 0.6em 1em;
      border-left: 3px solid #2e6da4;
      background: #f7f9fc;
      color: #555;
    }

    code {
      font-size: 0.9em;
      font-family: "SF Mono", "Fira Code", Consolas, monospace;
    }

    :not(pre) > code {
      padding: 0.12em 0.35em;
      background: #f4f4f4;
      border: 1px solid #e8e8e8;
      color: #c7254e;
    }

    pre {
      margin: 1.4em 0;
      padding: 1em 1.1em;
      background: #f6f8fa;
      overflow-x: auto;
      border: 1px solid #e8e8e8;

      code {
        background: transparent;
        border: none;
        padding: 0;
        color: #333;
        font-size: 0.88em;
      }
    }

    img {
      max-width: 100%;
      height: auto;
      margin: 1.2em 0;
    }

    a {
      color: #2e6da4;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    strong {
      font-weight: 700;
      color: #2b2b2b;
    }

    hr {
      margin: 2em 0;
      border: none;
      border-top: 1px dashed #ddd;
    }

    table {
      width: 100%;
      margin: 1.4em 0;
      border-collapse: collapse;
      border: 1px solid #e8e8e8;

      th,
      td {
        padding: 0.6em 0.8em;
        border: 1px solid #e8e8e8;
        text-align: left;
      }

      th {
        background: #f6f8fa;
        font-weight: 600;
      }
    }
  }
}

@media (max-width: 768px) {
  .article-page {
    padding: 20px 16px 48px;
  }

  .article-header .article-title {
    font-size: 22px;
  }

  .article-content :deep(.post-content) {
    font-size: 14px;
  }
}
</style>
