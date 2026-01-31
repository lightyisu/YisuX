<template>
  <HeaderView />

  <div v-if="frontmatter.layout === 'home'">
    <MyHome />
  </div>

  <!--文章页面-->
  <div v-else class="home-wrapper">
    <div class="left-pannel pannel">
      <div v-if="!shouldHide" class="sidebar">
        <div class="sidebar-item">
          <n-menu :options="menuOptions" />
        </div>
      </div>
    </div>
    <div class="article-content pannel">
      <div class="page-meta">
        <h1 class="big_title">{{ page_titile }}</h1>
        <div class="time">
          <div class="created-at">创建于: {{ page_created_beauty }}</div>
          <div class="updated-at">更新于: {{ page_updated_beauty }}</div>
        </div>
      </div>

      <div class="content-wrapper">
        <Content class="post-content" />

        <!-- 右侧悬浮目录 -->
        <div v-if="tocItems.length > 0" class="toc-floating">
          <div class="toc-header">On this page</div>
          <nav class="toc-nav">
            <a
              v-for="item in tocItems"
              :key="item.id"
              :href="`#${item.id}`"
              :class="[
                'toc-link',
                `toc-level-${item.level}`,
                { active: activeId === item.id },
              ]"
              @click.prevent="scrollToHeading(item.id)"
            >
              {{ item.text }}
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <FooterView />
</template>

<script setup lang="ts">
import { useSidebar } from "vitepress/theme";
import { NMenu, type MenuOption } from "naive-ui";
import { h, ref, onMounted, onUnmounted, computed } from "vue";
import { setMenuOptions } from "../composables/useSidebar";
import MyHome from "../components/MyHome.vue";
import HeaderView from "../components/HeaderView.vue";
import FooterView from "../components/FooterView.vue";
import { useData } from "vitepress";
import { useForJob } from "../composables/useForJob";
const { page, frontmatter } = useData();
import { onContentUpdated } from "vitepress";
const shouldHide = ref(false); //找工作隐藏日常 for:jobs.yisux.com
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
  return page_date.value.updated_at;
});
const { sidebar } = useSidebar();
const page_titile = ref("");
const menuOptions = ref<MenuOption[]>([]);
onContentUpdated(() => {
  /**when url changed */

  page_date.value.created_at = page.value.frontmatter.date || "";
  page_date.value.updated_at = page.value.frontmatter.updated || "";
  tocItems.value = [];
  page_titile.value = page.value.title;
  setMenuOptions(sidebar, menuOptions);
  extractToc();
  updateActiveId();
  useForJob(shouldHide);
});

onMounted(() => {
  page_date.value.created_at = page.value.frontmatter.date || "";
  page_date.value.updated_at = page.value.frontmatter.updated || "";
  page_titile.value = page.value.title;
  setMenuOptions(sidebar, menuOptions);

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
  h2::before,
  h3::before {
    content: "# "; /* 在前面添加的内容，# 后面加个空格更美观 */
    color: #d97757; /* 可以给 # 设一个主题色，比如蓝色 */
    margin-right: 8px; /* 设置 # 与文字之间的距离 */
    font-weight: bold; /* 让它看起来更有力 */
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

  /* 链接 - Claude风格的链接 */
  a {
    color: #2c2c2c;
    text-decoration: underline;
    text-decoration-color: #d4d4d4;
    text-underline-offset: 2px;
    transition: text-decoration-color 0.15s ease;
  }

  a:hover {
    text-decoration-color: #2c2c2c;
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
    font-family: "claude_font";
    display: block;
    background: black;
    position: absolute;
    border-radius: 2px;
    right: 0;
    padding: 0 10px;
    top: 10px;
    color: #fff;
    &::first-letter {
      text-transform: uppercase;
    }
  }
  div:has(.lang) {
    position: relative;
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
.home-wrapper {
  display: flex;
  width: 100%;

  margin: 0 auto;
  padding: 48px 32px;
  gap: 32px;
  background: #fafafa;

  .left-pannel {
    width: 280px;
    position: sticky;
    top: 80px;
    height: fit-content;
  }

  .pannel {
    background: #fff;
    border-radius: 12px;
    border: 1px solid #e5e5e5;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  .sidebar {
    padding: 16px;
    font-family: "claude_font";
  }

  .article-content {
    flex: 1;

    display: grid;
    grid-template-columns: 1fr;

    padding: 48px 64px;

    .content-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-around;
    }
    .toc-floating {
      font-family: "claude_font";
      overflow-y: auto;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 16px;
      padding: 24px;

      width: 220px;
      margin: 20px;
      box-shadow:
        0 4px 6px rgba(0, 0, 0, 0.02),
        0 12px 24px rgba(0, 0, 0, 0.06),
        0 0 0 1px rgba(0, 0, 0, 0.04);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: sticky;
      max-height: calc(100vh - 100px);
      scrollbar-width: none;
      top: 40px;
      .toc-header {
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: #6b7280;
        margin-bottom: 20px;
        padding-bottom: 16px;
        border-bottom: 2px solid #e5e7eb;
        position: relative;
      }

      .toc-floating:hover .toc-header::after {
        width: 80px;
      }

      .toc-nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .toc-link {
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        padding: 10px 16px;
        color: #374151;
        text-decoration: none;
        font-size: 14px;
        line-height: 1.6;
        border-radius: 8px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        border-left: 3px solid transparent;
      }

      .toc-link::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 0;
        background: linear-gradient(
          90deg,
          rgba(217, 119, 6, 0.08),
          rgba(245, 158, 11, 0.05)
        );
        transition: width 0.3s ease;
        z-index: -1;
      }

      .toc-link:hover {
        color: #d97706;
        background: rgba(217, 119, 6, 0.04);
        padding-left: 20px;
      }

      .toc-link:hover::before {
        width: 100%;
      }
    }
  }

  /* 移动端适配 */
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 24px 16px;
    gap: 24px;

    .left-pannel {
      width: 100%;
      position: relative;
      top: 0;
    }

    .article-content {
      padding: 32px 24px;

      .content-wrapper {
        max-width: 100%;
      }
    }
  }
}
</style>
