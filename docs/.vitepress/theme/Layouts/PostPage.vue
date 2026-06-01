<template>
  <div class="app-container">
    <HeaderView class="app-header" />

    <div v-if="frontmatter.layout === 'home'" class="app-content">
      <MyHome />
    </div>

    <!--文章页面-->
    <div v-else class="article-page app-content">
      <!-- 左侧导航卡片 -->
      <aside v-if="menuOptions.length > 0" class="side-nav-card">
        <n-menu :options="menuOptions" />
      </aside>

      <!-- 主内容卡片 -->
      <article class="receipt-container">
        <!-- 头部信息 -->
        <header class="receipt-header">
          <h1 class="receipt-title">{{ page_titile }}</h1>
          <div class="receipt-meta">
            <div class="receipt-date">
              <span class="label">创建于:</span>
              <span class="value">{{ page_created_beauty }}</span>
            </div>
            <div class="receipt-date">
              <span class="label">更新于:</span>
              <span class="value">{{ page_updated_beauty }}</span>
            </div>
          </div>
          <div class="receipt-divider"></div>
        </header>

        <!-- 文章目录 -->
        <div v-if="tocItems.length > 0" class="receipt-toc">
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

        <!-- 文章内容 -->
        <div class="receipt-content">
          <Content class="post-content" />
        </div>

     
      </article>
    </div>
    <FooterView class="app-footer" />
  </div>
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

// 内容区域自适应 - 灰色背景
.app-content {
  flex: 1;
  overflow: auto;
  background: var(--gray-background);
}

// Footer 固定高度 200px
.app-footer {
  flex-shrink: 0;
  height: 200px;
  background: #fff;
}

// 文章页面 - 居中小票样式
.article-page {
  display: flex;
  justify-content: center;
  align-items: flex-start; // 顶部对齐
  gap: 24px;
  padding: 80px 20px;
  min-height: calc(100vh - 200px - 64px);
  background: 
    linear-gradient(180deg, #f5f5f5 0%, var(--gray-background) 50%, #f5f5f5 100%);
}

// 左侧导航卡片 - 简约设计
.side-nav-card {
  position: sticky;
  top: 80px;
  width: 220px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  flex-shrink: 0;
  margin-top: 0;
  
  :deep(.n-menu) {
    font-family: "claude_font", sans-serif;
    
    .n-menu-item {
      margin: 0;
    }
    
    .n-menu-item-content {
      border-radius: 0;
      transition: all 0.15s ease;
      padding: 10px 16px;
      border-left: 2px solid transparent;
      
      &:hover {
        background: transparent;
        border-left-color: #dee2e6;
      }
      
      &::before {
        border-radius: 0;
      }
    }
    
    .n-menu-item-content--selected {
      background: transparent;
      border-left-color: #495057;
      
      .n-menu-item-content__link {
        color: #191919;
        font-weight: 500;
      }
    }
    
    .n-menu-item-content__link {
      color: #6c757d;
      font-size: 14px;
      line-height: 1.5;
    }
  }
}

// 小票容器 - 精致卡片设计
.receipt-container {
  max-width: 720px;
  width: 100%;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.04),
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.03);
  position: relative;
}

// 头部信息 - 优雅排版
.receipt-header {
  padding: 48px 56px 32px;
  position: relative;
  
  .receipt-title {
    font-family: "claude_font", sans-serif;
    font-size: 28px;
    font-weight: 600;
    color: #0a0a0a;
    margin: 0 0 24px 0;
    line-height: 1.35;
    letter-spacing: -0.025em;
    background: linear-gradient(135deg, #191919 0%, #2c2c2c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .receipt-meta {
    font-family: "claude_font", sans-serif;
    font-size: 13px;
    color: #666;
    line-height: 1.8;
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    
    .receipt-date {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      background: #f8f9fa;
      border-radius: 20px;
      border: 1px solid #e9ecef;
      
      .label {
        color: #868e96;
        font-weight: 500;
        font-size: 12px;
      }
      
      .value {
        color: #495057;
        font-weight: 500;
        font-size: 12px;
      }
    }
  }
  
  .receipt-divider {
    margin-top: 28px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #dee2e6 20%,
      #adb5bd 50%,
      #dee2e6 80%,
      transparent 100%
    );
    border: none;
    position: relative;
    
  }
}

// 文章目录 - 简约设计
.receipt-toc {
  padding: 24px 56px 32px;
  border-bottom: 1px solid #f1f3f5;
  
  .toc-title {
    font-family: "claude_font", sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #868e96;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 12px;
  }
  
  .toc-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .toc-item {
    font-family: "claude_font", sans-serif;
    font-size: 14px;
    line-height: 1.6;
    color: #6c757d;
    text-decoration: none;
    padding: 6px 12px;
    border-left: 2px solid transparent;
    transition: all 0.15s ease;
    display: block;
    
    &.toc-level-2 {
      font-weight: 500;
      color: #495057;
    }
    
    &.toc-level-3 {
      padding-left: 24px;
      font-size: 13px;
      color: #6c757d;
    }
    
    &:hover {
      color: #212529;
      border-left-color: #dee2e6;
    }
    
    &.active {
      color: #191919;
      border-left-color: #495057;
      font-weight: 500;
    }
  }
}

// 内容区域 - 精致排版
.receipt-content {
  padding: 32px 56px 48px;
  position: relative;
  display: flex;
  justify-content: center;
  
  :deep(.post-content) {
    font-family: "claude_font", sans-serif;
    font-size: 15px;
    line-height: 1.8;
    color: #2c2c2c;
    letter-spacing: 0.01em;
    text-align: left; // 左对齐
    max-width: 100%;
    
    p {
      margin: 1.3em 0;
    }
    
    h1, h2, h3, h4, h5, h6 {
      margin-top: 2.2em;
      margin-bottom: 0.9em;
      color: #191919;
      font-weight: 600;
    }
    
    h2 {
      font-size: 1.4em;
      letter-spacing: -0.02em;
    }
    
    h3 {
      font-size: 1.2em;
      color: #343a40;
    }
    
    h4, h5, h6 {
      font-size: 1.05em;
      color: #495057;
    }
    
    ul, ol {
      padding-left: 1.6em;
      margin: 1.3em 0;
    }
    
    li {
      margin: 0.5em 0;
      line-height: 1.8;
      
      &::marker {
        color: #868e96;
      }
    }
    
    blockquote {
      margin: 1.8em 0;
      padding: 1em 1.4em;
      border-left: 3px solid #adb5bd;
      background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
      border-radius: 4px;
      color: #495057;
      font-style: normal;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      
      p {
        margin: 0.6em 0;
      }
    }
    
    code {
      font-size: 0.92em;
      font-family: "SF Mono", "Fira Code", monospace;
    }
    
    :not(pre) > code {
      padding: 0.25em 0.5em;
      background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
      border: 1px solid #e9ecef;
      border-radius: 4px;
      color: #495057;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    }
    
    pre {
      margin: 1.8em 0;
      padding: 1.2em 1.4em;
      background: #f8f9fa;
      border-radius: 6px;
      overflow-x: auto;
      border: 1px solid #e9ecef;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      
      code {
        background: transparent;
        border: none;
        padding: 0;
        color: #2c2c2c;
        font-size: 0.9em;
      }
    }
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      margin: 1.8em 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: 1px solid #e9ecef;
    }
    
    a {
      color: #495057;
      text-decoration: underline;
      text-decoration-color: #adb5bd;
      text-underline-offset: 3px;
      text-decoration-thickness: 1.5px;
      transition: all 0.2s ease;
      
      &:hover {
        color: #212529;
        text-decoration-color: #495057;
      }
    }
    
    strong {
      font-weight: 600;
      color: #191919;
    }
    
    em {
      color: #495057;
    }
    
    hr {
      margin: 2.5em 0;
      border: none;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        #dee2e6 50%,
        transparent 100%
      );
    }
    
    table {
      width: 100%;
      margin: 1.8em 0;
      border-collapse: collapse;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      
      th, td {
        padding: 0.8em 1em;
        border: 1px solid #e9ecef;
        text-align: left;
      }
      
      th {
        background: #f8f9fa;
        font-weight: 600;
        color: #343a40;
      }
      
      tr:hover {
        background: #f8f9fa;
      }
    }
  }
}

// 底部 - 优雅收尾
.receipt-footer {
  padding: 32px 56px 48px;
  text-align: center;
  position: relative;
  
  .receipt-divider {
    margin-bottom: 28px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #dee2e6 20%,
      #adb5bd 50%,
      #dee2e6 80%,
      transparent 100%
    );
    border: none;
    position: relative;
    
    &::before {
      content: '❦';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #adb5bd;
      font-size: 18px;
    }
  }
  
  .footer-text {
    font-family: "claude_font", sans-serif;
    font-size: 11px;
    color: #adb5bd;
    letter-spacing: 0.15em;
    margin: 0;
    text-transform: uppercase;
    font-weight: 500;
  }
}

// 移动端适配
@media (max-width: 1024px) {
  .side-nav-card {
    display: none;
  }
  
  .article-page {
    padding: 60px 16px;
  }
}

@media (max-width: 768px) {
  .article-page {
    padding: 40px 12px;
  }
  
  .receipt-container {
    border-radius: 6px;
    
    .receipt-header,
    .receipt-content,
    .receipt-footer {
      padding-left: 28px;
      padding-right: 28px;
    }
    
    .receipt-title {
      font-size: 22px;
    }
    
    .receipt-meta {
      flex-direction: column;
      gap: 8px;
      
      .receipt-date {
        width: fit-content;
      }
    }
    
    .receipt-nav {
      padding-left: 28px;
      padding-right: 28px;
    }
    
    .receipt-toc {
      padding-left: 28px;
      padding-right: 28px;
      
      .toc-item {
        font-size: 13px;
        
        &.toc-level-3 {
          padding-left: 24px;
        }
      }
    }
    
    .receipt-content {
      :deep(.post-content) {
        font-size: 14px;
      }
    }
  }
}
</style>
